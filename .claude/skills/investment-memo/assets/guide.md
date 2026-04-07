# Slide Guide

The reference for the investment-memo skill — what to present, how to present it, how to arrange it. Read this, then the memo. Pick a slide for each memo section, consult the Content Catalog for what to extract, arrange per the Narrative Arc, write the slide spec.

---

## Global Config

### Slide Dimensions

```yaml
width: 13.3in # 12192000 EMU
height: 7.5in # 6858000 EMU (widescreen 16:9)
```

### Colors

Theme colors (from `theme1.xml`) — referenced via `schemeClr` in shapes, do not hardcode hex:

```yaml
accent1: "#0D2426" # darkest — divider/title accents
accent2: "#1B3F34" # title text on content slides
accent3: "#006663" # teal — divider panel, title slide panel
accent4: "#318E9F" # lighter teal — secondary highlights
background: "#FFFFFF"
```

### Typography

```yaml
title_slide: { size: 24pt }
divider: { size: 32pt, color: white, align: right }
content_title: { size: 22pt, color: accent2 } # layout-defined, do not override
content_body: { size: 14pt }
subheader: { size: 16pt, bold: true }
table_header: { size: 12pt, bold: true }
table_cell: { size: 12pt }
```

### Spacing

```yaml
content_title: { L: 0.67in, T: 0.18in, W: 9.80in, H: 0.96in } # layout-defined
content_body: { top: 1.20in, bottom: 0.80in }
slide: { 13.3in × 7.5in, 16:9 }
```

---

## Design Principles

### Content Discipline

The memo is the source of facts — never invent numbers, names, or claims. But the agent isn't limited to the memo's _structure_: if a slide would strengthen the deck and its content lives in another file or with a human (returns table, deal terms, a comparison the memo skipped), propose it anyway. Fill what the memo supports, leave a labelled template (table skeleton, chart frame, empty shape) for the rest, and mark the handoff. A half-filled slide flagged as a handoff beats no slide — or an invented one. State gaps in neutral language, same font as normal content — never blank, never "N/A", never grayed.

### Design Discipline

Visual composition of S4 slides is owned by the renderer (`document-skills:pptx`) — investment-memo provides the story and content, then steps back. The renderer has full autonomy to redesign any slide to fit the content — rearrange components, change layouts, generate new visuals (charts, icons, diagrams) whenever that serves the message better than the reference. Every shape in the reference slides is a reusable component; prefer assembling from existing components first so the visual vocabulary stays consistent, but don't force content into a pattern that doesn't fit. The text inside reference shapes is a guide to the pattern's intent, not literal content; replace it with the memo's. Anything new — rearranged, generated, or freshly composed — must match the deck's colors, typography, and style so it looks like it belongs.

### One Message Per Slide

Every slide answers one question and the title states the answer. The title IS the message, not a label — a sentence stating the takeaway beats a topic word. One takeaway per slide; if there are two, make two slides. Every claim has its evidence on the same slide.

### Visual Density (Space)

Three tiers of hierarchy: title (the takeaway), primary content (the evidence), supporting content (labels and notes — present but quiet). Bold key numbers and names. Whitespace matters — when in doubt, split rather than cram. Content must fit without overlapping or running off-screen; if a topic needs more room, split across slides or push detail to the appendix. Never shrink fonts below the typography minimums; never drop memo content to fit.

### Content Density (Distillation)

Distill, don't transcribe. Reframe flat lists into structured comparisons when a comparison reveals more than the list. Synthesize scattered facts into coherent shapes. Select the points that support the thesis; leave the rest for the advisory or appendix. Density is a judgment call: enough to make the case, few enough to read. Never invent — every fact on a slide must trace back to the memo.

---

## Slides

### Slide Types

**Fixed** (S1, S2, S3, S5, S6) — layout and shapes don't change. The agent fills content into existing shapes, used as-is.

**Adaptive** (S4 content slides) — the agent adjusts layout to fit the content. The reference slides show the _typical_ layout, not a rigid mold. Adapt intelligently: more or fewer bullets, adjust column balance, combine thin or split dense content, switch patterns if the content's shape changes.

**Component** — small reusable visual units that aren't full slides on their own but can be cloned and embedded into any slide. Slides 5 and 6 are dedicated component reference slides, but components can also be lifted from any other slide — pill headers from slide 7, chevrons from slide 10, the founder photo block from slide 12.

### Reference Slide Index

The renderer clones slides from reference.pptx by index.

| Ref # | Pattern name             | Type      | Description                                          |
| ----- | ------------------------ | --------- | ---------------------------------------------------- |
| 1     | `S1` title               | fixed     | Deck title + date                                    |
| 2     | `S2` exec-summary        | fixed     | One-pager investment summary                         |
| 3     | `S3` divider             | fixed     | Section transition with teal panel                   |
| 4     | `standard-content`       | adaptive  | Title + free body area (baseline fallback)           |
| 5     | `chart-caption`          | component | Chart/picture + caption label                        |
| 6     | `icon-text`              | component | Icon + text block                                    |
| 7     | `two-column`             | adaptive  | Two pill headers + two parallel blocks               |
| 8     | `matrix`                 | adaptive  | 2x2 grid with labeled axes                           |
| 9     | `comparison-table`       | adaptive  | Row-based comparison (label rows + entity columns)   |
| 10    | `pipeline`               | adaptive  | Chevron process flow + summary bar                   |
| 11    | `timeline`               | adaptive  | Horizontal timeline with year markers + event groups |
| 12    | `team`                   | adaptive  | Founding team + BoD/advisors with photos             |
| 13    | `financials`             | adaptive  | Chart (with trend arrow) + supporting table          |
| 14    | `cap-table`              | adaptive  | Full-width data table                                |
| 15    | `key-terms`              | adaptive  | 2-column term/detail table                           |
| 16    | `S5` investment-criteria | fixed     | 8-row criteria assessment table                      |
| 17    | `S6` appendix            | fixed     | Appendix divider                                     |

---

### S1: Title Slide

`slide: S1`. Title-card with a teal vertical panel; centered "Investment Memo: {nickname}" and "{Month Year}" below. No body. Fill: nickname from user input (else ask), date from memo or current.

### S2: Executive Summary

`slide: S2`. A single dense prose block organized as ~7 paragraphs covering company background, team, traction, and the investment opportunity. The "Investment Opportunity" line acts as a visual section break inside the prose. The "if you only read one slide, read this" page — used exactly once, immediately after S1.

Synthesize from the memo's opening and deal-terms sections:

1. **Company background** — what they do, founded when, key technology, target market
2. **Founder/team** — headline credentials, prior exits, key titles
3. **Key traction** — strongest proof point with metrics
4. **Investment Opportunity** (always present) — prior round, current round, proposed investment

Bold key terms (company name, founder names, dollar figures, customer names). If the memo lacks explicit deal terms, synthesize from fragments. If truly absent, state the gap professionally.

### S3: Divider

`slide: S3` with an extra `section: "{name}"` field in the metadata. Full-bleed dark teal panel with the section name as large white right-aligned text. No body. Section names are taken **verbatim** from the Narrative Arc — "Market", "Product", "Team", "Deal". Do not paraphrase. New section names may be added if the memo's structure needs one the arc doesn't cover. Skip if a section has only 1-2 content slides — fold those into an adjacent section instead.

### S4: Content Slides

S4 is the body of the deck — where most memo content lands. `slide: S4`. The renderer picks a pattern from the index below at render time based on the content's shape. The Content Catalog (further down) tells the renderer *what* to extract for each topic; the patterns below tell it *how* the slide can be shaped.

#### Patterns

**`standard-content`** (slide 4) — Title + free body. No fixed body shapes; the agent lays out text and optionally clones components. **Use as** the baseline for a claim with a handful of evidence points without an obvious comparison/sequence/table structure. The fallback when no other pattern fits.

**`chart-caption`** (slide 5, component) — Caption above a chart/picture block, sized to fit ~half a slide. **Use for** content with one visual anchor. Standalone when the visual is the message, or embedded inside another pattern.

**`icon-text`** (slide 6, component) — Icon + multi-line text block. Sized as one block within a larger slide; typically 3-4 instances in a row or grid. **Use as** a building block inside other patterns, rarely standalone.

**`two-column`** (slide 7) — Two pill headers above two composable parallel blocks. The pill headers are the only fixed elements; each column body can hold any component (chart, icon-text, bullets, mix). **Use for** parallel halves where side-by-side reveals the dynamic — problem/solution, supply/demand, before/after, two named variants. Avoid when one side is much heavier.

**`matrix`** (slide 8) — 2x2 grid with HIGH/LOW labels on two axes; one entry typically highlighted. **Use for** items positioned on two dimensions where the arrangement is the insight. Avoid when positioning needs more than two dimensions.

**`comparison-table`** (slide 9) — Row-based table; rows are attributes, columns are entities. Cells hold prose, not single numbers. Header cells can carry icons. **Use for** qualitative comparison across a handful of named entities and attributes, where each cell needs a sentence rather than a number.

**`pipeline`** (slide 10) — Horizontal flow of 3-5 chevrons with labels and a summary/value-prop row below. Each step can carry an image above it. **Use for** sequential content where each stage feeds the next and the order is meaningful.

**`timeline`** (slide 11) — Horizontal timeline with year markers; supports parallel tracks (e.g. historical above, forward below). The rightmost marker often represents "current and forward". **Use for** chronological content with several dated events, especially when scattered across the memo.

**`team`** (slide 12) — Two-section layout: larger founder block on the left, narrower BoD/advisor block on the right. Pill-style section headers. **Use for** people-centric content split into two tiers, where each person has a photo, name/title, and short descriptor.

**`financials`** (slide 13) — Chart at the top (typically with trend arrow + percent callout) + supporting data table below. **Use for** multi-period numeric content where the trend shape is the headline and underlying numbers are the proof.

**`cap-table`** (slide 14) — Full-width data table optimized for many rows × columns; one row typically highlighted. **Use for** dense tabular numeric content needing both many line items and many columns.

**`key-terms`** (slide 15) — Compact 2-column table; label/term left, longer explanation right (right column wider). Typically 6-10 rows. **Use for** named items with longer descriptions — term sheets, definitions, assumption tables.

### S5: Investment Criteria

`slide: S5`. Full-width 8-row × 2-column table; left column lists the firm's standard assessment criteria as fixed labels, right column holds 2-4 sentences synthesizing what the memo says about that criterion (draw from all relevant sections; do not add judgments beyond what the memo states). The fixed-label structure makes every memo deck directly comparable — its power is *consistency*. Used exactly once per deck, near the end. Do not modify the row labels even if a memo is thin on a criterion — leave the row in place and state the gap professionally.

| Row | Key factors for Assessment (keep) | Comments (replace)                                         |
| --- | --------------------------------- | ---------------------------------------------------------- |
| 0   | Strategic Fit                     | How investment fits fund thesis/pillars                    |
| 1   | Attractiveness of Investment      | (section header — leave empty)                             |
| 2   | 1. Market size and scalability    | Market size, growth drivers, scalability                   |
| 3   | 2. Competitive edge               | Moat, IP, technical differentiation                        |
| 4   | 3. Team experience                | Founder credentials, track record, composition             |
| 5   | 4. Revenue / profit potential     | Traction proof, revenue model, growth trajectory           |
| 6   | 5. Valuation / Exit & Return      | Valuation reasonableness, expected IRR/COC, exit prospects |
| 7   | 6. Risk Mitigants                 | Top risks + corresponding mitigants                        |

A custom criteria framework can replace the default if the user provides one.

### S6: Appendix

`slide: S6`. Minimalist divider with "Appendix" centered. Used exactly once per deck — only if at least one appendix content slide follows. Skip entirely if the deck has no appendix material. Appendix slides that follow use S4 patterns (typically `comparison-table` or `cap-table`).

---

## Content Catalog

Extension of S4 — organizes memo content by type. For each S4 slide, find the matching content type and follow its guidance. Each entry: **Pull** (what to extract from the memo) and **Convey** (how to render it). Pattern selection is the renderer's call.

### Market

The size, shape, and dynamics of the market the company plays in.

**Pull:**
- Sizing — TAM/SAM/SOM with horizon, CAGR with timeframe
- Problem framing — pain points, inefficiencies, unmet needs
- Drivers — single-sided tailwinds or two-sided supply/demand dynamics
- Gap framing — what current solutions miss, white space being addressed
- Segmentation — vertical, geographic, or customer-tier breakdowns

**Convey:**
- Lead with the headline number ("US$ XB market growing at Y% CAGR")
- Reframe a flat driver list as a structured comparison when a dynamic exists
- Anchor on a single visual (size over time, or a quadrant of unmet needs)
- Pair the size figure with one supporting cause for "why now"

### Product / Technology

What the company builds, how it works, what makes it defensible.

**Pull:**
- Product overview — what it is, who uses it, headline capabilities
- Technical depth — architecture, key algorithms, engineering moats
- Capability specs — yield, speed, accuracy, capacity (with units)
- Differentiation — vs. named real alternatives
- Roadmap — current state, near-term releases, long-term vision with dates

**Convey:**
- Distinguish current vs. future product clearly — don't conflate
- Quantify capability claims — concrete specs over vague adjectives
- Bold headline metrics on first mention
- Show architecture or pipeline as a diagram when structure is the point
- Compare side-by-side against alternatives using exact specs

### Traction / Validation

Evidence that customers want or are buying the product.

**Pull:**
- Customer logos — named accounts, tier-1 validation
- Quantitative metrics — revenue, units, pilots, retention, yield, with units and timeframes
- Case studies — specific customer stories with measurable outcomes
- Pipeline — LOIs, signed contracts, qualified opportunities, by stage
- Testimonials — quotes with name + title + company

**Convey:**
- Lead with the strongest proof point (biggest named customer or largest number)
- Preserve customer names exactly as in the memo
- For pilots, include paid vs. unpaid, duration, and scope inline
- Use a logo strip when many recognizable customers exist
- Quantify everything — avoid vague phrases like "strong interest"

### Team

The founders, key hires, board, and advisors.

**Pull:**
- Founding team — names, titles, one-line credentials
- Extended team — key engineers, operators, GTM leads
- Board and advisors — investors, independent directors, domain experts
- Founder-market fit — concrete reasons why these specific people for this market

**Convey:**
- Bold every person name on first mention
- Lead with credentials that matter for *this* business (prior exits, named operator roles, deep domain experience)
- Separate founders from advisors visually
- For founder-market fit, be specific ("co-founded prior company in same vertical"), never generic
- Photos help when available; otherwise use clean text blocks

### Financials / Projections

Revenue, burn, unit economics, forward projections.

**Pull:**
- Historical financials — revenue, growth, burn, runway by period
- Forward projections — revenue forecast, breakeven year, cash need
- Unit economics — CAC, LTV, margin, payback (with definitions)
- Cost structure — COGS breakdown, R&D intensity, sales efficiency
- Scenarios — base / bull / bear projections

**Convey:**
- Label periods inline ("2024A", "2025E", "2026F")
- Pair any dramatic growth claim with the assumption that drives it
- Lead with the headline trend (chart) and back it with the precise table
- State breakeven year and cash-out milestone explicitly
- Bold the headline metric (CAGR, breakeven year, runway months)

### Valuation / Returns

Deal economics: pricing, expected returns, exit scenarios.

**Pull:**
- Valuation comparables — public and private comps with multiples
- Expected returns — IRR, cash-on-cash, exit multiple
- Scenario returns — bear/base/bull exit scenarios
- Ownership and dilution — current and post-money stake

**Convey:**
- Be explicit about base case vs. bull case in the labels
- Bold the returns metric that drives the recommendation (IRR, CoC)
- Show the assumption stack alongside the returns — never present a return without its inputs
- For comparables, use real named companies with concrete numbers

### Cap Table

Ownership structure before and after the proposed round.

**Pull:**
- Pre-money cap table — current shareholders and stakes
- Post-money cap table — pro-forma after proposed round
- Fully diluted view — option pool, convertibles, warrants
- Investment amount, option pool treatment, stapled terms

**Convey:**
- Bold the proposing firm's resulting stake row
- Show pre and post side-by-side when space allows
- Label the view clearly ("fully diluted" vs. "as-issued")
- Preserve exact share counts and percentages — do not round

### Deal Terms

Legal and economic terms of the proposed investment.

**Pull:**
- Security type (preferred series, SAFE, convertible)
- Liquidation preference, anti-dilution mechanism
- Board composition, protective provisions
- Use of proceeds
- Any non-standard preferences, governance, or protective provisions

**Convey:**
- Use the memo's exact legal language — don't paraphrase
- Make any non-standard term visually prominent (bold, separate row, callout)
- Separate economic terms from governance terms
- Use a `key-terms` table when long, a bulleted callout when short

### Risks & Mitigants

What could go wrong and how the company addresses it.

**Pull:**
- Market risks — TAM wrong, timing wrong, substitute products
- Technical risks — doesn't work at scale, regulatory blocks
- Execution risks — key person, hiring, GTM
- Competitive risks — incumbent response, new entrants
- Financial risks — burn, dilution, customer concentration
- Each risk with severity (deal-breaker vs. watch item) and its specific mitigant

**Convey:**
- Pair every risk with its mitigant on the same line or in parallel columns
- State risks without mitigants honestly — don't hide them
- Avoid generic startup risks — focus on company-specific
- A two-column Risks/Mitigants layout reads cleanly when both sides exist

### Timeline / Milestones

Company history and forward milestones.

**Pull:**
- Founding history — incorporation, pivots, key hires
- Product milestones — first prototype, first customer, GA launch
- Funding history — rounds, investors, valuations
- Forward roadmap — planned releases, hiring, geographic expansion

**Convey:**
- Use a horizontal timeline with year markers
- Keep each event to 1-2 sentences
- Use softer phrasing for forward items ("plans to", "targeting")
- Visually separate historical from forward when both are present
- Gather dates from across the memo — timeline content is rarely in one place

### Competitive Landscape

How the company positions against alternatives.

**Pull:**
- Direct competitors — companies doing the same thing
- Indirect competitors / substitutes — alternative ways to solve the problem
- Positioning framework — relevant dimensions for comparison
- Value chain position — where they sit in the stack
- Funding / traction of key competitors for context

**Convey:**
- Pick the two dimensions that reveal the company's advantage
- Highlight the subject company in the winning position
- Use a `matrix` when positioning is the insight, a `comparison-table` when specs are
- Use real named companies only — never invent
- Use exact numbers from each competitor when comparing specs

---

## Narrative Arc

How slides compose into a deck:

```
Title → Executive Summary
  Divider: Market         → market slides
  Divider: Product        → product, traction, competitive, timeline slides
  Divider: Team           → team
  Divider: Deal           → financials, valuation, cap table, terms slides
Investment Criteria
Appendix (optional)       → comps, overflow
```

Each section gets a divider only if it has at least one content slide. Risk content goes wherever it best fits. The arc is a guide, not a constraint — reorder to match the memo's emphasis (lead with team if the team is the story, lead with the deal if the deal is the story).

---

## Handling Unexpected Content

Follow the principles. Dumping the points into `standard-content` is the last safe resort.

---

## Checklist

**Content**

- [ ] Every memo section mapped to a slide, or explicitly excluded
- [ ] No content invented beyond what the memo states
- [ ] Numbers match the memo exactly
- [ ] Structural slides present where required; gaps stated, never blank

**Design**

- [ ] Titles are sentence-form takeaways, not labels
- [ ] Key numbers and names bolded
- [ ] One message per slide, evidence on the same slide
- [ ] Pattern selections match the content shape
- [ ] Generated visuals coherent with the deck's color and style

**Process**

- [ ] Guide read before starting; memo read fully before mapping
- [ ] Section ordering follows narrative arc (or has clear rationale for deviation)
- [ ] Advisory produced alongside slide spec

---

## Notes

- reference.pptx is derived from the **eBots** and **Corintis** decks, simplified manually. Source decks live in `assets/examples/`.
- 17 slides total. Layouts: Custom (S1), Divider (S3), Content (S4 + S5), Blank (S2 + S6).
- Content layout defines the title placeholder (position + 22pt accent2). Per-slide titles inherit; do not override geometry or font size.
- Divider layout's text placeholder bakes no-bullet / right-align / white / 32pt into `<a:lstStyle>` so new divider slides inherit the style.
