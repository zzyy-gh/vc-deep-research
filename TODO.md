# TODO

## Pipeline Features

- [ ] **Custom aspect research for a company** — Allow targeted deep dive on a specific dimension (e.g., "research AuraSell's data licensing strategy"). Generate a focused artifact stored alongside the main research, not a full pipeline re-run. Needs a new skill or flag on /research that accepts a focus dimension.

- [ ] **Custom market/comparison research** — Ad-hoc market research or company-vs-company comparison outside the main pipeline (e.g., "compare AuraSell vs Rox AI vs Attio on product depth", "research the AI-native CRM market landscape"). Output to research/markets/ or research/syntheses/. May overlap with /synthesize but should also support standalone market research without requiring existing company research first.

- [ ] **Auto-generate competitor folders** — When researching a primary target, competitors that surface prominently (e.g., Rox AI, Attio during AuraSell research) should optionally get their own research/companies/{slug}/ folder with at least a screen-level artifact. Balance effort — don't run full pipeline on every mention, but create lightweight stubs expandable later.

- [x] **Report storage and naming** — All artifacts now live in `output/` with `{source}-{description}-v{round}.md` naming. Self-archiving: versions coexist, no history/ folder. Unified frontmatter with `source:`, `description:`, `inputs:` fields. See CLAUDE.md Output Convention.

## Export

- [ ] **HTML export** — Convert report.md (and optionally individual artifacts) into a styled HTML document for sharing. Preserve traffic light colors, tables, formatting. Use a markdown-to-HTML library (marked, markdown-it) with a CSS template. Future formats: PDF, Google Docs, Notion — start with HTML.
