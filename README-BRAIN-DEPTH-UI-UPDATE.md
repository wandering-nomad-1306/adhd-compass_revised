# ADHD Compass — focused brain/depth/UI update

This build intentionally leaves the homepage and homepage compass unchanged.

Focused changes:
- Brain map now uses the exact user-supplied lateral anatomy image plus a second simplified medial/internal view.
- Region and connection explanations were reorganized around visible vs deep anatomy.
- Neurochemistry was rewritten as text-first, evidence-based explanations of dopamine and norepinephrine instead of large decorative diagrams.
- Executive Functions subpage now explains the concept, core components, heterogeneity, and real-life vs structured-test differences in more depth.
- PageDock was redesigned as a translucent top-left Contents drawer with active-section tracking and better topic labels.
- Medication's duplicate “Jump to what you need” navigation was removed; the Contents drawer is now the page-level navigator.
- What Helps retains its existing “Why this can happen” explanations; only topic metadata was added for the Contents drawer.

Validation performed:
- TS/TSX syntax transpilation across client/src
- local import resolution
- homepage and InteractiveCompass SHA-256 verified unchanged
- ZIP integrity check

A full Vite build could not be run because the sandbox cannot reach the npm registry to install the project dependencies.
