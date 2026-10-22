# ADHD Compass V4 Candidate — Technical Engineering & Release Report

**Release**: ADHD Compass V4 Candidate  
**Date**: October 21, 2026  
**Status**: Ready for Production Deployment  
**Build Target**: `dist/` (Node.js ESM + Static Assets)  

---

## 1. Technical Engineering Summary

Across the V4 engineering cycle, dedicated technical audits were performed across Security, Performance, Reliability, and Maintainability. All critical and high-priority vulnerabilities and performance bottlenecks have been resolved.

### Engineering Improvements Matrix

| Area | Problem Discovered | Fix Implemented | Files Changed | Verification Method |
| :--- | :--- | :--- | :--- | :--- |
| **Security** | Dependency vulnerabilities (`lodash` prototype pollution via unneeded `recharts` package). | Pruned `recharts` and orphaned dependencies; added overrides for `nanoid` (5.1.16), `body-parser`, `qs`, `proxy-addr`, `path-to-regexp` via `pnpm-workspace.yaml`. | `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml` | `pnpm audit` reports 0 actionable vulnerabilities in production code paths. |
| **Security** | Missing defense-in-depth HTTP headers in production server. | Added `Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Resource-Policy: same-origin`, strict `Content-Security-Policy` (`base-uri 'self'`, `frame-ancestors 'none'`), and explicit `Permissions-Policy`. | `server/index.ts` | Server header inspection; curl tests against static routes. |
| **Performance** | Monolithic client bundle (~873 kB JS) delaying Largest Contentful Paint (LCP) on mobile connections. | Implemented route-level dynamic code splitting (`React.lazy` + `Suspense`) across all 10 chapter pages and standalone views. | `client/src/App.tsx` | Build output verifies entry chunk size reduced from 873 kB to **35.36 kB**; individual chapters load on demand. |
| **Performance** | Unoptimized asset chunking and missing vendor boundaries. | Configured manual Rollup chunking in Vite (`vendor-core`, `vendor-motion`, `vendor-icons`, `vendor-libs`) for optimal browser caching. | `vite.config.ts` | Production bundle chunk inspection (`dist/public/assets/`). |
| **Performance** | Uncompressed static assets served from Express in production. | Integrated `compression` middleware (gzip/deflate) with standard 1KB threshold. | `server/index.ts`, `package.json` | Compressed response size verified (`gzip: 80.34 kB` on core vendor bundle). |
| **Performance** | Font layout shift (CLS) risk from delayed Google Fonts negotiation. | Added explicit `<link rel="preconnect">` and `<link rel="dns-prefetch">` hints for Google Fonts (`fonts.googleapis.com` & `fonts.gstatic.com`). | `client/index.html` | Network waterfall inspection in Chromium dev tools. |
| **Reliability** | Deep-link hash anchors (`#experience-starting`, `#common-difficulties`) failing when landing on lazy-loaded routes due to premature single RAF scroll attempt. | Upgraded `RouteScrollRestoration` to use a 15-attempt polling retry loop (up to 900ms window) that tracks DOM element mounting before executing smooth scroll. | `client/src/App.tsx` | Direct navigation to `/chapter/why-feels#experience-starting` and `/chapter/what-helps#difficulty-starting` scrolls accurately to target. |
| **Reliability** | Potential state bleed when toggling age groups (Adult vs Under 18) in the self-assessment. | Added strict age-switch state sanitizer in `handleSelectAgeGroup` that preserves core questions (1–18) while completely resetting context questions (19–26). | `client/src/pages/chapters/ADHDTestPage.tsx` | Switching age groups mid-test or on completion completely purges mutually incompatible question answers. |
| **Usability & UX** | Non-applicable options (`-1`, `none`, `unsure`, `dont_remember`) sharing numerical styling with the 1–4 severity grading scale, leading to user confusion. | Added visual separator (*"or select if not applicable"*), dedicated `—` badge, muted resting styles, and dedicated keyboard shortcuts (`5`, `0`, `N`). | `client/src/pages/chapters/ADHDTestPage.tsx` | Visual verification across questions 19–26; keyboard navigation testing. |
| **Usability & UX** | "What Actually Helps" sidebar navigation labels truncating on mobile/tablet viewports; difficult in-section navigation. | Expanded sidebar container to `19rem`, added sticky positioning, enabled full text wrapping (`whitespace-normal break-words`), and added 5 intra-section jump pills per topic. | `client/src/pages/chapters/WhatHelps.tsx` | Viewport testing at 375px, 768px, 1024px, 1440px. |
| **Maintainability** | Legacy dead code (`client/src/components/ui/chart.tsx`) remaining after recharts removal. | Deleted unused `chart.tsx` component; configured clean workspace roots. | `client/src/components/ui/chart.tsx` | `pnpm run check` compiles cleanly with zero missing imports. |

---

## 2. Production Build Verification

- **TypeScript Type Check**: `pnpm run check` (`tsc --noEmit`) → **0 errors**
- **Production Build**: `pnpm run build` (`vite build && esbuild server/index.ts`) → **Succeeded in 7.88s**
- **Bundle Breakdown**:
  - `dist/public/index.html`: 4.08 kB (gzip: 1.26 kB)
  - `dist/public/assets/index-BqcRCkRD.css`: 172.04 kB (gzip: 25.98 kB)
  - `dist/public/assets/index-CD0p_a8Y.js` (main entry): 35.36 kB (gzip: 12.06 kB)
  - `dist/public/assets/vendor-core-CZJjmPg8.js`: 256.65 kB (gzip: 80.34 kB)
  - `dist/public/assets/vendor-motion-CZY2n3x1.js`: 83.89 kB (gzip: 27.48 kB)
  - `dist/public/assets/vendor-libs-BLmY9IOz.js`: 86.11 kB (gzip: 30.53 kB)
  - `dist/public/assets/vendor-icons-B3aYN95z.js`: 29.21 kB (gzip: 5.83 kB)
  - On-Demand Chapter Chunks:
    * `Welcome`: 4.54 kB (gzip: 1.84 kB)
    * `About`: 9.83 kB (gzip: 3.55 kB)
    * `WhyItFeelsLikeThis`: 13.41 kB (gzip: 4.75 kB)
    * `GettingDiagnosed`: 16.52 kB (gzip: 3.22 kB)
    * `ExecutiveFunctions`: 19.97 kB (gzip: 6.79 kB)
    * `WhatIsADHD`: 30.11 kB (gzip: 8.99 kB)
    * `MeetYourBrain`: 48.18 kB (gzip: 14.05 kB)
    * `WhatHelps`: 52.55 kB (gzip: 18.21 kB)
    * `ADHDTestPage`: 64.89 kB (gzip: 15.82 kB)
    * `Medication`: 113.58 kB (gzip: 30.31 kB)
  - Server executable: `dist/index.js`: 2.2 kB

---

## 3. Compass Integrity Audit

- **`client/src/components/InteractiveCompass.tsx`**: 0 lines changed (Frozen)
- **`client/src/components/ChapterNavigator.tsx`**: 0 lines changed (Frozen)

Verified via:
```bash
git diff -- client/src/components/InteractiveCompass.tsx client/src/components/ChapterNavigator.tsx
# Return: Empty (Zero changes)
```

---

## 4. Improvements Deferred to Future Releases

While V4 delivers comprehensive performance, security, and usability enhancements, the following architectural and feature optimizations have been categorized and deferred to preserve stability and avoid unnecessary rewrites:

1. **Service Worker / Offline PWA Support**:
   - *Rationale*: ADHD Compass is an educational SPA. Implementing a Workbox service worker for offline reading of chapters would benefit mobile readers in transit, but requires cache invalidation strategies that should be tested in an isolated staging cycle.
2. **Dynamic OG Image Generation**:
   - *Rationale*: Open Graph cards currently utilize high-resolution static branded assets (`hero-background.jpg`). A serverless Edge function generating dynamic per-chapter social cards (with chapter title and icon) is slated for V5.
3. **Automated End-to-End Test Suite (Playwright)**:
   - *Rationale*: The current project relies on TypeScript strict checks, Vite unit builds, and manual verification. An automated Playwright test suite covering self-assessment state flows, keyboard shortcuts, and print layout regression will be introduced in the next development cycle.
4. **Server-Side Rendering (SSR) / Static Site Generation (SSG)**:
   - *Rationale*: The site is currently client-rendered with comprehensive Schema.org JSON-LD and pre-rendered metadata in `index.html`. A full migration to Vite SSR or Astro/Next.js would improve cold SEO crawl times for deeply nested anchors, but would require major architectural rework.
