---
name: ai-tech-website legacy site
description: Identity and quirks of the /legacy/ multi-page React site vs the cctech-australia sibling
---

The repo has two sibling marketing sites with shared CC Tech branding:
- `artifacts/ai-tech-website` — the LEGACY multi-page React + Vite + wouter + shadcn/ui app, served at `/legacy/` (live https://cc-tech-website.replit.app/legacy/). Home page is `src/pages/Home.tsx`.
- `artifacts/cctech-australia` — separate sibling site. Do NOT edit it when work is scoped to the legacy site; confirm target with the user when ambiguous.

**Lenis smooth scroll quirk:** the legacy Home uses Lenis (transform-based scrolling) plus framer-motion `whileInView` reveals (content starts opacity 0 until scrolled into view). Tall full-page `app_preview` screenshots do NOT capture below-fold sections, and `/#anchor` hash screenshots render at the top instead of the target. Verify below-fold content via grep/code inspection, not tall screenshots.

**Layout/nav:** `Layout.tsx` provides `pt-20` to clear the fixed `Navbar`, so a full-width banner can be the first child of Home without overlap. In-page scroll uses `document.getElementById(id).scrollIntoView`.
