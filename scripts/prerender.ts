import fs from "node:fs";
import path from "node:path";
import {
  NOT_FOUND_SEO,
  SEO_BY_PATH,
  SITE_URL,
  type SeoConfig,
} from "../shared/seo";

const rootDir = process.cwd();
const outDir = path.join(rootDir, "dist", "public");
const templatePath = path.join(outDir, "index.html");

if (!fs.existsSync(templatePath)) {
  throw new Error(
    `Could not find ${templatePath}. Run Vite before prerendering.`,
  );
}

const template = fs.readFileSync(templatePath, "utf8");

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function normalizePathname(pathname: string) {
  if (pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

function renderHtml(
  indexHtml: string,
  rawPathname: string,
  seo: SeoConfig,
) {
  const pathname = normalizePathname(rawPathname);

  const canonical =
    `${SITE_URL}${pathname === "/" ? "/" : pathname}`;

  let html = indexHtml.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(seo.title)}</title>`,
  );

  html = html
    .replace(/\s*<meta\s+name=["']description["'][^>]*>/gi, "")
    .replace(/\s*<meta\s+name=["']robots["'][^>]*>/gi, "")
    .replace(/\s*<link\s+rel=["']canonical["'][^>]*>/gi, "")
    .replace(/\s*<meta\s+property=["']og:site_name["'][^>]*>/gi, "")
    .replace(/\s*<meta\s+property=["']og:type["'][^>]*>/gi, "")
    .replace(/\s*<meta\s+property=["']og:title["'][^>]*>/gi, "")
    .replace(/\s*<meta\s+property=["']og:description["'][^>]*>/gi, "")
    .replace(/\s*<meta\s+property=["']og:url["'][^>]*>/gi, "")
    .replace(/\s*<meta\s+name=["']twitter:card["'][^>]*>/gi, "")
    .replace(/\s*<meta\s+name=["']twitter:title["'][^>]*>/gi, "")
    .replace(/\s*<meta\s+name=["']twitter:description["'][^>]*>/gi, "")
    .replace(
      /\s*<script[^>]+id=["']adhd-compass-website-schema["'][\s\S]*?<\/script>/gi,
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

function outputFileForRoute(route: string) {
  if (route === "/") {
    return path.join(outDir, "index.html");
  }

  const relative =
    route.replace(/^\/+/, "").replace(/\/+$/, "");

  return path.join(outDir, `${relative}.html`);
}

for (const [route, seo] of Object.entries(SEO_BY_PATH)) {
  if (route === "/404") {
    continue;
  }

  const outputFile = outputFileForRoute(route);

  fs.mkdirSync(path.dirname(outputFile), {
    recursive: true,
  });

  fs.writeFileSync(
    outputFile,
    renderHtml(template, route, seo),
    "utf8",
  );

  console.log(
    `Generated ${route} -> ${path.relative(rootDir, outputFile)}`,
  );
}

const notFoundHtml = renderHtml(
  template,
  "/404",
  NOT_FOUND_SEO,
);

fs.writeFileSync(
  path.join(outDir, "404.html"),
  notFoundHtml,
  "utf8",
);

console.log("Generated /404 -> dist/public/404.html");
