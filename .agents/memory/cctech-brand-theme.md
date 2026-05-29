---
name: CC Tech brand theme
description: The real cctechaustralia.com visual identity — light/feminine, not dark.
---

The real cctechaustralia.com brand is **light, warm, and feminine** — white background, crimson/coral-red primary (~#D62B47), deep burgundy headings (~#5A1226), muted rosy body text (~#8A5E66), soft pastel decorative orbs (peach/pink/cream), and a gold underline accent.

**Why:** An earlier build of this site used a dark theme (navy bg, blue/orange accents). The user explicitly rejected it and asked to remove the dark theme and keep the brand's pink/feminine/light colours, confirmed against a screenshot of the live site.

**How to apply:** When restyling this artifact (`artifacts/cctech-australia`), keep the light token system. The palette lives in `styles.css` `:root` (crimson `--blue`, pink `--orange`, rose `--teal`, burgundy `--txt`). Green/red stay semantic for compliance/risk. Cards are white with soft shadows (`--shadow-card`/`--shadow-soft`), not borders-on-dark. Never reintroduce a dark background.
