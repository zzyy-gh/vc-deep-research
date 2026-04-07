# Slide Guide

The reference for the investment-memo skill. Covers **what to present**, **how to present it**, and **how to arrange it** — organized around two axes: **content** (what the memo says) and **slides** (how to render it).

**Sections:** Global Config (visual settings), Design Principles (rules), Slides (per reference.pptx slide), Content Catalog (an extension of S4 — content types and how to extract them), Narrative Arc (how slides compose), Handling Unexpected Content, Checklist.

**How to use:** Read the guide, then the memo. Pick the slide for each memo section from the Slides section; for S4 content slides, consult the Content Catalog for what to extract. Arrange per the narrative arc. Write the slide spec.

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

The agent has full autonomy to redesign any slide to fit the content — rearrange components, change layouts, generate new visuals (charts, icons, diagrams) whenever that serves the message better than the reference. Every shape in the reference slides is a reusable component; prefer assembling from existing components first so the visual vocabulary stays consistent, but don't force content into a pattern that doesn't fit. The text inside reference shapes is a guide to the pattern's intent, not literal content; replace it with the memo's. Anything new — rearranged, generated, or freshly composed — must match the deck's colors, typography, and style so it looks like it belongs.

### One Message Per Slide

Every slide answers one question and the title states the answer. The title IS the message, not a label — a sentence stating the takeaway beats a topic word. One takeaway per slide; if there are two, make two slides. Every claim has its evidence on the same slide.

### Hierarchy & Density

Three tiers: title (the takeaway), primary content (the evidence), supporting content (labels and notes — present but quiet). Bold key numbers and names. Whitespace matters — when in doubt, split rather than cram. Density is a judgment call: enough to make the case, few enough to read.

### Distillation

Distill, don't transcribe. Reframe flat lists into structured comparisons when a comparison reveals more than the list. Synthesize scattered facts into coherent shapes. Select the points that support the thesis; leave the rest for the advisory or appendix. Never invent — every fact on a slide must trace back to the memo.

### Overflow

Content must fit without overlapping or running off-screen. If a topic needs more room, split across slides or push detail to the appendix. Never shrink fonts below the typography minimums; never drop memo content to fit.

---

## Slides

One entry per reference.pptx slide. For each slide: **Pattern** (what it is), **Good for** (when to use), **Content structure** (what to put in). Visual design is not specified here — the agent reads `reference.pptx` directly and follows the design principles above.

### Slide Types

There are three types of slides in reference.pptx:

**Fixed** (S1, S2, S3, S5, S6) — layout and shapes don't change. The agent fills content into existing shapes. Used as-is.

**Adaptive** (S4 content slides) — the agent adjusts layout to fit the content. The reference slides show the _typical_ layout, not a rigid mold. Adapt intelligently: use more or fewer bullets, adjust column balance, combine thin content or split dense content, switch patterns if the content's shape changes.

**Component** — small reusable visual units that are not full slides on their own but can be cloned and embedded into any fixed or adaptive slide. Slides 5 and 6 are dedicated component reference slides, but **components can also be lifted from fixed or adaptive slides** — e.g. the pill header pair from slide 7 (two-column), the chevron group from slide 10 (pipeline), or the founder photo block from slide 12 (team) can all be cloned onto another content slide as components.

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

Components can also be lifted from any fixed or adaptive slide — pill headers from slide 7, chevrons from slide 10, the founder photo block from slide 12. The agent can compose any content slide from a mix of full-pattern bodies and lifted components.

---

### S1: Title Slide

**Type:** fixed

**Slide spec metadata:** `slide: S1`

**Pattern:** A title-card layout with a teal vertical panel along the left edge and two centered text elements: "Investment Memo: {nickname}" and "{Month Year}" below. No body content.

**Good for:** The opening slide of every deck. Used once per deck, always first. The only variables are the nickname and date.

**Content structure:** Entity name / codename from user input, else ask for it. Date from memo or current date. Format: "Investment Memo: {agenda nickname}" and "{Month Year}".

---

### S2: Executive Summary

**Type:** fixed

**Slide spec metadata:** `slide: S2`

**Pattern:** A single dense prose block organized as ~7 paragraphs covering company background, team, traction, and the investment opportunity. The "Investment Opportunity" line acts as a visual section break inside the prose.

**Good for:** The mandatory second slide of every deck — the "if you only read one slide, read this" page. Use exactly once, immediately after S1. Not a substitute for body slides; a distillation that lets the IC navigate.

**Content structure:** Synthesize from the memo's opening and deal terms sections:

1. **Company background** — what they do, founded when, key technology, target market
2. **Founder/team** — headline credentials, prior exits, key titles
3. **Key traction** — strongest proof point with metrics
4. **Investment Opportunity** (always present) — prior round, current round, proposed investment

Bold key terms (company name, founder names, dollar figures, customer names). If the memo lacks explicit deal terms, synthesize from fragments. If truly absent, state the gap professionally.

---

### S3: Divider

**Type:** fixed

**Slide spec metadata:**

```
<!-- slide
slide: S3
section: "{section name}"
-->
```

**Pattern:** A full-bleed dark teal panel with the section name as large white right-aligned text. No body content. Creates a visual break that signals "we are leaving the previous topic and starting a new one".

**Good for:** Section transitions inside the deck. Use one before each major section (Market, Product, Team, etc.). Typically 3-5 times per deck. Skip if a section has only 1-2 content slides — fold those into an adjacent section instead.

**Content structure:** Section names come from the narrative arc groupings (e.g., "Market", "Product, Traction & Revenue Model", "Team, Financials & Valuation").

---

### S4: Content Slide

**Type:** adaptive

S4 is the body of the deck — where most memo content lands. It provides a title bar and a free body area; the agent picks one of the patterns below as the starting shape.

**Slide spec metadata:** Always `slide: S4` plus a `pattern:` field naming the reference slide to clone.

The Content Catalog below is an extension of S4 — it organizes memo content by type and tells you what to extract for each. Pattern selection is the agent's call based on the content's shape.

---

#### standard-content (slide 4)

**Type:** adaptive

**Pattern:** The baseline content slide — title at the top, free body area below. No fixed body shapes; the agent lays out text and optionally clones components into the body region.

**Good for:** A claim supported by a handful of evidence points without an obvious comparison, sequence, or tabular structure. Also the right fallback when content is too sparse for a more elaborate pattern. The default when no other pattern fits.

---

#### chart-caption (slide 5)

**Type:** component

**Pattern:** A caption line above a chart or picture block. Sized to fit roughly half a slide so it can stand alone or be combined with other components. The chart is a picture placeholder.

**Good for:** Content with one visual anchor — a single chart, diagram, or image that carries the message. Can be standalone when the visual is the message, or embedded inside another pattern alongside text.

---

#### icon-text (slide 6)

**Type:** component

**Pattern:** A small icon paired with a multi-line text block to its right. Sized to fit as one block within a larger slide; typically 3-4 instances arranged in a row or grid.

**Good for:** A categorical list where each item benefits from a visual anchor. Used as a building block inside other patterns, not usually as a standalone slide.

---

#### two-column (slide 7)

**Type:** adaptive

**Pattern:** Two equal-width columns, each introduced by a pill header followed by content. The pill headers are the only fixed elements; the body of each column is composable from any component (chart, icon-text, bullets, or any mix).

**Good for:** Content that naturally divides into two parallel halves where placing them side by side reveals the dynamic — opposing forces, before vs. after, problem vs. solution, two named variants. Avoid when one side is much heavier than the other.

---

#### matrix (slide 8)

**Type:** adaptive

**Pattern:** A 2x2 grid with HIGH/LOW labels on two axes and named entries positioned within the quadrants. One entry is typically highlighted.

**Good for:** Items positioned on two dimensions where the relative arrangement is the insight. Avoid when the positioning needs more than two dimensions.

---

#### comparison-table (slide 9)

**Type:** adaptive

**Pattern:** A row-based table where each row is an attribute and each column is an entity being compared. Cells hold prose, not single numbers. Header cells can carry icons or small images.

**Good for:** Qualitative comparison across a handful of named entities and a handful of attributes, where each cell needs a sentence rather than a number.

---

#### pipeline (slide 10)

**Type:** adaptive

**Pattern:** A horizontal flow of 3-5 chevron/arrow shapes representing sequential steps, with labels under each step and a summary or value-proposition row below. Each step can carry an associated image above it.

**Good for:** Sequential content where each stage feeds the next and the order itself is meaningful.

---

#### timeline (slide 11)

**Type:** adaptive

**Pattern:** A horizontal timeline with year markers and event groups. Events can sit above or below the main axis, supporting two parallel tracks (e.g. historical above, forward below). The rightmost marker often represents "current and forward".

**Good for:** Chronological content with several dated events. Especially useful when the events are scattered across the source material and need to be synthesized into a single arc.

---

#### team (slide 12)

**Type:** adaptive

**Pattern:** A two-section layout — a larger area on the left with bigger photo + text blocks, and a narrower area on the right with smaller photo + text blocks. Section headers are pill-style rounded rectangles.

**Good for:** People-centric content split into two tiers (e.g. primary group + secondary group), where each person has a photo, a name/title, and a short descriptor.

---

#### financials (slide 13)

**Type:** adaptive

**Pattern:** A chart at the top — typically with a trend arrow and a percentage callout — paired with a supporting data table below.

**Good for:** Multi-period numeric content where the trend shape is the headline and the underlying numbers are the proof.

---

#### cap-table (slide 14)

**Type:** adaptive

**Pattern:** A full-width data table optimized for many rows × many columns, with a bold header row.

**Good for:** Dense tabular numeric content that needs both many line items and many columns. One row is typically highlighted.

---

#### key-terms (slide 15)

**Type:** adaptive

**Pattern:** A compact 2-column table — a label/term on the left, a longer explanation on the right. Typically 6-10 rows; the right column is wider.

**Good for:** A list of named items where each item has a longer description — term sheets, definitions, assumption tables.

---

### S5: Investment Criteria

**Type:** fixed

**Slide spec metadata:** `slide: S5`

**Pattern:** A full-width 8-row × 2-column table. Left column lists the firm's standard assessment criteria as fixed labels; right column holds 2-4 sentences of synthesized commentary per row. The fixed-label structure makes every memo deck directly comparable against the same framework.

**Good for:** The standardized IC assessment that every deck closes with before the appendix. Used exactly once per deck, near the end. Its power is _consistency_: every IC member knows the row order and criterion definitions. Do not modify the row labels even if a memo is thin on a criterion — leave the row in place and state the gap professionally.

**Content structure:** For each criterion row, write 2-4 sentences synthesizing what the memo says about that topic. Draw from all relevant sections. Do not add judgments beyond what the memo states.

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

---

### S6: Appendix

**Type:** fixed

**Slide spec metadata:** `slide: S6`

**Pattern:** A minimalist divider slide with the single word "Appendix" centered on a clean background. Functions as a section break announcing that everything after is supplementary.

**Good for:** The boundary between main deck content and appendix. Use exactly once per deck — only if there is at least one appendix content slide following it. Skip entirely if the deck has no appendix material. After this slide, the agent typically places overflow content and detailed tables.

**Content structure:** Keep as-is. Appendix content slides that follow use S4 patterns (typically `comparison-table` or `cap-table`).

---

## Content Catalog

The Content Catalog is an **extension of S4**. While the Slides section above tells you which patterns exist, this section organizes memo content by type. When filling an S4 content slide, find the matching content type below and follow its guidance. Pattern selection is the agent's call based on the content's shape — guided by the Slides section.

Each entry has two parts: **Content** (what to pull from the memo) and **How to convey** (suggestions for rendering — pick, ignore, or invent freely). The only hard rules are the Design Principles above.

---

### Market

The size, shape, and dynamics of the market the company plays in.

**Content** (variations and what to pull from each):

- Sizing — TAM/SAM/SOM figures, forecast horizon, CAGR with timeframe
- Problem framing — pain points, inefficiencies, unmet needs
- Drivers — single-sided tailwinds and catalysts, or two-sided supply/demand dynamics
- Gap framing — what current solutions miss, white space being addressed
- Segmentation — vertical, geographic, or customer-tier breakdowns

**How to convey:**

- Lead with the headline number ("US$ XB market growing at Y% CAGR")
- Reframe a flat driver list as a structured comparison when a dynamic exists
- Anchor the slide on a single visual (chart of size over time, or a quadrant of unmet needs)
- Pair the size figure with one supporting cause for "why now"

---

### Product / Technology

What the company builds, how it works, and what makes it defensible.

**Content:**

- Product overview — what it is, who uses it, headline capabilities in one sentence
- Technical depth — architecture, key algorithms, engineering moats
- Capability specs — yield, speed, accuracy, capacity (with units)
- Differentiation — how it compares against alternatives (named, real entities only)
- Roadmap — current state, near-term releases, long-term vision with dates

**How to convey:**

- Distinguish current vs. future product clearly — don't conflate
- Quantify capability claims (concrete specs over vague adjectives)
- Bold headline metrics on first mention
- Show the architecture or pipeline as a diagram when the structure is the point
- Compare side-by-side against alternatives using exact specs

---

### Traction / Validation

Evidence that customers want or are buying the product.

**Content:**

- Customer logos — named accounts, tier-1 validation
- Quantitative metrics — revenue, units, pilots, retention, yield, with units and timeframes
- Case studies — specific customer stories with measurable outcomes
- Pipeline — LOIs, signed contracts, qualified opportunities, by stage
- Testimonials — quotes with name + title + company

**How to convey:**

- Lead with the strongest single proof point (biggest named customer or largest number)
- Preserve customer names exactly as in the memo
- For pilots, include paid vs. unpaid, duration, and scope inline
- Use a logo strip when many recognizable customers exist
- Quantify everything — avoid vague phrases like "strong interest"

---

### Team

The founders, key hires, board, and advisors.

**Content:**

- Founding team — names, titles, one-line credentials
- Extended team — key engineers, operators, GTM leads
- Board and advisors — investors, independent directors, domain experts
- Founder-market fit — concrete reasons why these specific people for this specific market

**How to convey:**

- Bold every person name on first mention
- Lead with credentials that matter for this specific business (prior exits, named operator roles, deep domain experience)
- Separate founders from advisors visually
- For founder-market fit, be specific ("co-founded prior company in same vertical"), never generic
- Photos help when available; otherwise use clean text blocks

---

### Financials / Projections

Revenue, burn, unit economics, forward projections.

**Content:**

- Historical financials — revenue, growth, burn, runway by period
- Forward projections — revenue forecast, breakeven year, cash need
- Unit economics — CAC, LTV, margin, payback (with definitions)
- Cost structure — COGS breakdown, R&D intensity, sales efficiency
- Scenarios — base / bull / bear projections

**How to convey:**

- Label periods inline using the standard convention ("2024A", "2025E", "2026F")
- Pair any dramatic growth claim with the assumption that drives it
- Lead with the headline trend (chart) and back it with the precise table
- State breakeven year and cash-out milestone explicitly when forecasting
- Bold the headline metric (CAGR, breakeven year, runway months)

---

### Valuation / Returns

Deal economics: pricing, expected returns, exit scenarios.

**Content:**

- Valuation comparables — public and private comps with multiples
- Expected returns — IRR, cash-on-cash, exit multiple
- Scenario returns — bear/base/bull exit scenarios
- Ownership and dilution — current and post-money stake

**How to convey:**

- Be explicit about base case vs. bull case in the labels
- Bold the returns metric that drives the recommendation (IRR, CoC)
- Show the assumption stack alongside the returns — never present a return without its inputs
- For comparables, use real named companies with concrete numbers

---

### Cap Table

Ownership structure before and after the proposed round.

**Content:**

- Pre-money cap table — current shareholders and stakes
- Post-money cap table — pro-forma after proposed round
- Fully diluted view — option pool, convertibles, warrants
- Investment amount, option pool treatment, stapled terms

**How to convey:**

- Bold the proposing firm's resulting stake row
- Show pre and post side by side when space allows
- Label the view clearly ("fully diluted" vs. "as-issued")
- Preserve exact share counts and percentages — do not round

---

### Deal Terms

Legal and economic terms of the proposed investment.

**Content:**

- Security type (preferred series, SAFE, convertible)
- Liquidation preference, anti-dilution mechanism
- Board composition, protective provisions
- Use of proceeds
- Any non-standard preferences, governance, or protective provisions

**How to convey:**

- Use the memo's exact legal language — don't paraphrase
- Make any non-standard term visually prominent (bold, separate row, callout)
- Separate economic terms from governance terms
- Use a key-terms table when the list is long, a bulleted callout when short

---

### Risks & Mitigants

What could go wrong and how the company addresses it.

**Content:**

- Market risks — TAM wrong, timing wrong, substitute products
- Technical risks — doesn't work at scale, regulatory blocks
- Execution risks — key person, hiring, GTM
- Competitive risks — incumbent response, new entrants
- Financial risks — burn, dilution, customer concentration
- Each risk with severity (deal-breaker vs. watch item) and its specific mitigant

**How to convey:**

- Pair every risk with its mitigant on the same line or in parallel columns
- State risks without mitigants honestly — don't hide them
- Avoid generic startup risks — focus on company-specific
- A two-column layout (Risks / Mitigants) reads cleanly when both sides exist

---

### Timeline / Milestones

Company history and forward milestones.

**Content:**

- Founding history — incorporation, pivots, key hires
- Product milestones — first prototype, first customer, GA launch
- Funding history — rounds, investors, valuations
- Forward roadmap — planned releases, hiring, geographic expansion

**How to convey:**

- Use a horizontal timeline with year markers
- Keep each event to 1-2 sentences
- Use softer phrasing for forward items ("plans to", "targeting")
- Visually separate historical from forward when both are present
- Gather dates from across the memo — timeline content is rarely in one place

---

### Competitive Landscape

How the company positions against alternatives.

**Content:**

- Direct competitors — companies doing the same thing
- Indirect competitors / substitutes — alternative ways to solve the problem
- Positioning framework — relevant dimensions for comparison
- Value chain position — where they sit in the stack
- Funding / traction of key competitors for context

**How to convey:**

- Pick the two dimensions that reveal the company's advantage
- Highlight the subject company visually in the winning position
- Use a 2x2 matrix when positioning is the insight, a comparison table when specs are
- Use real named companies only — never invent
- Use exact numbers from each competitor when comparing specs

---

## Narrative Arc

How slides compose into a deck:

```
Title → Executive Summary
  Divider: Market         → market slides
  Divider: Product        → product, traction, competitive, timeline slides
  Divider: Team & Deal    → team, financials, valuation, cap table, terms slides
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
