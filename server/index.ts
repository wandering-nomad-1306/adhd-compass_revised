import express from "express";
import { createServer } from "http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  NOT_FOUND_SEO,
  SEO_BY_PATH,
  SITE_URL,
  type SeoConfig,
} from "../shared/seo";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function normalizePathname(pathname: string) {
  if (pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderHtml(
  indexHtml: string,
  pathname: string,
  seo: SeoConfig,
) {
  const canonical =
    `${SITE_URL}${pathname === "/" ? "/" : pathname}`;

  let html = indexHtml.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(seo.title)}</title>`,
  );

  html = html
    .replace(
      /\s*<meta\s+name=["']description["'][^>]*>/i,
      "",
    )
    .replace(
      /\s*<meta\s+name=["']robots["'][^>]*>/i,
      "",
    )
    .replace(
      /\s*<link\s+rel=["']canonical["'][^>]*>/i,
      "",
    );

  const tags = [
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="robots" content="${
      seo.index === false ? "noindex,follow" : "index,follow"
    }" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:site_name" content="ADHD Compass" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
  ];

  if (pathname === "/") {
    tags.push(
      `<script id="adhd-compass-website-schema" type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "ADHD Compass",
        url: `${SITE_URL}/`,
      })}</script>`,
    );
  }

  return html.replace(
    "</head>",
    `  ${tags.join("\n    ")}\n  </head>`,
  );
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  const indexHtml = fs.readFileSync(
    path.join(staticPath, "index.html"),
    "utf-8",
  );

  // Serve JS, CSS, images, robots.txt, sitemap.xml, etc.
  // Page routes fall through to the handler below.
  app.use(express.static(staticPath, { index: false }));

  app.get("*", (req, res) => {
    const pathname = normalizePathname(req.path);
    const seo = SEO_BY_PATH[pathname];

    const isKnownRoute = Boolean(seo);
    const isExplicitNotFound = pathname === "/404";
    const resolvedSeo = seo ?? NOT_FOUND_SEO;

    if (
      !isKnownRoute ||
      isExplicitNotFound ||
      resolvedSeo.index === false
    ) {
      res.setHeader("X-Robots-Tag", "noindex, follow");
    }

    const status =
      !isKnownRoute || isExplicitNotFound ? 404 : 200;

    res
      .status(status)
      .type("html")
      .send(renderHtml(indexHtml, pathname, resolvedSeo));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);

