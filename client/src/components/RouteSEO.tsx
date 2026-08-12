import { useEffect } from "react";
import { useLocation } from "wouter";
import { NOT_FOUND_SEO, SEO_BY_PATH, SITE_URL } from "@shared/seo";

function upsertMeta(
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

function upsertCanonical(href: string) {
  let link =
    document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }

  link.href = href;
}

export default function RouteSEO() {
  const [location] = useLocation();

  useEffect(() => {
    const rawPath = location.split("?")[0].split("#")[0] || "/";
    const pathname =
      rawPath === "/" ? "/" : rawPath.replace(/\/+$/, "") || "/";

    const seo = SEO_BY_PATH[pathname] ?? NOT_FOUND_SEO;
    const canonical =
      `${SITE_URL}${pathname === "/" ? "/" : pathname}`;

    document.title = seo.title;

    upsertMeta("name", "description", seo.description);
    upsertMeta(
      "name",
      "robots",
      seo.index === false ? "noindex,follow" : "index,follow",
    );

    upsertMeta("property", "og:site_name", "ADHD Compass");
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:url", canonical);

    upsertMeta("name", "twitter:card", "summary");
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);

    upsertCanonical(canonical);

    const schemaId = "adhd-compass-website-schema";
    document.getElementById(schemaId)?.remove();

    if (pathname === "/") {
      const script = document.createElement("script");
      script.id = schemaId;
      script.type = "application/ld+json";

      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "ADHD Compass",
        url: `${SITE_URL}/`,
      });

      document.head.appendChild(script);
    }
  }, [location]);

  return null;
}
