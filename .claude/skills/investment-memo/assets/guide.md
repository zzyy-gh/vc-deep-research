# Slide Guide

The reference for the investment-memo skill. Covers **what to present**, **how to present it**, and **how to arrange it** — organized around two axes: **content** (what the memo says) and **slides** (how to render it).

**Sections:** Global Config (visual settings), Design Principles (rules), Content Catalog (per content type: variations, what to extract, recommended slides), Slides (per reference.pptx slide), Narrative Arc (how slides compose), Handling Unexpected Content, Checklist.

**How to use:** Read the guide, then the memo. For each memo section, find the matching Content Catalog entry → extract per its guidance → pick a recommended slide. Arrange per the narrative arc. Write the slide spec.

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

### Aim Rich, Accuracy First

A rich and complete slide is the goal — push the work as far as the information allows. But accuracy comes first: if you don't have what's needed to fill something correctly, don't invent. Do as much as you can correctly; for the rest, leave a clear placeholder (a labelled empty shape or an inline note pointing to what's missing) so the next agent or human knows exactly where to pick up. State unavoidable gaps in neutral language, in the same font as normal content — never blank, never "N/A", never italicized or grayed.

### Compose, Reuse, Generate

Every shape, group, and text block in any reference slide is a reusable component. Prefer assembling from existing components over drawing new shapes — keeps the visual vocabulary consistent. The text inside those components is a placeholder and a guide, not literal content — read it to learn the pattern's intent, then replace it with the memo's real content. When the available components don't quite fit or a more suitable visualization is possible, the agent has autonomy to arrange them in new ways or generate new visuals (charts, icons, diagrams) to support the slide. Two constraints: don't invent the underlying data, and match the deck's color palette, typography, and overall style so anything new looks like it belongs.

### One Message Per Slide

Every slide answers one question and the title states the answer. The title IS the message, not a label — a sentence stating the takeaway beats a topic word. One takeaway per slide; if there are two, make two slides. Every claim has its evidence on the same slide.

### Hierarchy & Density

Three tiers: title (the takeaway), primary content (the evidence), supporting content (labels and notes — present but quiet). Bold key numbers and names. Whitespace matters — when in doubt, split rather than cram. Density is a judgment call: enough to make the case, few enough to read.

### Distillation

Distill, don't transcribe. Reframe flat lists into structured comparisons when a comparison reveals more than the list. Synthesize scattered facts into coherent shapes. Select the points that support the thesis; leave the rest for the advisory or appendix. Never invent — every fact on a slide must trace back to the memo.

### Overflow

Content must fit without overlapping or running off-screen. If a topic needs more room, split across slides or push detail to the appendix. Never shrink fonts below the typography minimums; never drop memo content to fit.

---

## Content Catalog

This catalog organizes memo content by type. For each type it lists the **variations** you may encounter, **what to extract**, **how to convey**, and **recommended slides** (by pattern name, which map to entries in the Slides section below).

Use this as the primary lookup when reading a memo: find the matching entry, extract per its guidance, then render using one of the recommended slides.

---

### Market

The size, shape, and dynamics of the market the company plays in.

**Variations:**

- **Sizing only** — TAM/SAM/SOM numbers, growth rates, forecasts
- **Problem framing** — pain points, inefficiencies, unmet needs
- **Drivers (single-sided)** — tailwinds, catalysts, adoption curves
- **Drivers (two-sided)** — supply-side vs. demand-side dynamics, opposing forces
- **Gap framing** — what current solutions miss, white space being addressed
- **Segmentation** — vertical breakdown, geographic split, customer tiers

**What to extract:**

- Total addressable market figure and forecast horizon
- Growth rate (CAGR) with timeframe
- 3-6 specific drivers or constraints, each with quantitative support where possible
- Any segmentation the memo uses to scope the company's target

**How to convey:**

- Lead with the one number the IC needs: "The X market is US$ YB today growing at Z% CAGR"
- Reframe flat driver lists into structured comparisons when possible (supply/demand, current/future)

**Recommended slides:**

- Single sizing figure with supporting chart → `chart-caption` (slide 5)
- Problem framing with 3-6 drivers → `standard-content` (slide 4) with icon-text components from slide 6
- Two-sided dynamic → `two-column` (slide 7)
- Gap framing → `matrix` (slide 8) or `comparison-table` (slide 9)

---

### Product / Technology

What the company builds, how it works, what makes it defensible.

**Variations:**

- **Product overview** — what it is, who uses it, headline capabilities
- **Technical deep-dive** — architecture, key algorithms, engineering moats
- **Differentiation** — how it compares to current solutions, what's unique
- **Roadmap** — current state, near-term releases, long-term vision

**What to extract:**

- Core product description in one sentence
- 3-6 headline capabilities with specs (yield rate, speed, accuracy, capacity)
- Technical differentiators with evidence (patents, benchmarks, specs)
- Named competitors for comparison (only real ones, never invented)
- Dates for roadmap items

**How to convey:**

- Distinguish current vs. future product — don't conflate them
- Quantify every capability claim (avoid "fast", "accurate" without numbers)
- For technical depth, prefer concrete specs over vague adjectives
- Bold headline metrics on first mention

**Recommended slides:**

- Product overview with icon + descriptor blocks → `standard-content` (slide 4) with slide 6 components
- Headline capabilities as standalone proof points → callout-box variant of `standard-content`
- Side-by-side comparison with competitors → `comparison-table` (slide 9)
- Positioning on two dimensions → `matrix` (slide 8)
- Process or value chain → `pipeline` (slide 10)

---

### Traction / Validation

Evidence that customers want or are buying the product.

**Variations:**

- **Customer logos** — named accounts, tier-1 validation
- **Quantitative metrics** — revenue, units sold, pilots, retention, yield
- **Case studies** — specific customer stories with measurable outcomes
- **Pipeline** — LOIs, signed contracts, qualified opportunities
- **Testimonials** — named quotes from customers or partners

**What to extract:**

- Customer names (exactly as in memo, no paraphrasing)
- Specific metrics with unit and timeframe (e.g., "99.5% yield over 6 months")
- Named attributions for quotes (name + title + company)
- Contract stage (pilot / paid pilot / signed / deployed)
- Dollar amounts or volume commitments where available

**How to convey:**

- Lead with the strongest proof point — usually the biggest named customer or the largest number
- For pilots, always disclose: paid vs. unpaid, duration, scope
- Avoid vague claims like "strong interest" — always quantify

**Recommended slides:**

- Single hero customer story → `standard-content` (slide 4) with slide 6 icon-text blocks
- 2-3 customer testimonials with attribution → callout variant of `standard-content`
- Pipeline with stages → `pipeline` (slide 10)
- Comparative ROI table → `comparison-table` (slide 9)

---

### Team

The founders, key hires, board, and advisors.

**Variations:**

- **Founding team** — CEO/CTO/CPO with credentials
- **Extended team** — key engineers, operators, GTM leads
- **Board of directors** — investors' board seats, independent directors
- **Advisors** — domain experts, past operators, academic advisors
- **Founder-market fit** — why these specific people for this specific market

**What to extract:**

- Full name, title, and one-sentence descriptor for each person
- Prior companies, exits, publications, patents
- Years of relevant experience
- Notable credentials (PhD, industry awards, named titles)
- Concrete founder-market fit evidence (not generic "deep experience")

**How to convey:**

- Bold every person name on first mention
- Lead with credentials that matter for this specific business (exited founder > generic MBA for a startup)
- Separate founding team from advisors visually
- For founder-market fit, be specific: "Co-founded prior company in same vertical" not "passionate about the space"

**Recommended slides:**

- Founding team + BoD/advisors in one view → `team` (slide 12)
- Deep dive on one founder → `standard-content` (slide 4) with a large photo element

---

### Financials / Projections

Revenue, burn, unit economics, forward projections.

**Variations:**

- **Historical financials** — revenue, growth, burn, runway
- **Forward projections** — revenue forecast, breakeven year, cash need
- **Unit economics** — CAC, LTV, margin, payback
- **Cost structure** — COGS breakdown, R&D intensity, sales efficiency
- **Scenarios** — base / bull / bear projections

**What to extract:**

- Historical revenue figures by year with units (US$ M)
- Forecast revenue with the assumption that drives it
- Burn rate and runway in months
- Unit economic metrics with definitions
- Any growth % that is the headline narrative (e.g., +105% CAGR)

**How to convey:**

- Always flag whether a number is historical, forecast, or company-provided
- Pair any dramatic growth claim with the underlying assumption
- For forecasts, state the year and any breakeven or cash-out milestone
- Keep chart + table side by side when possible — chart shows the shape, table shows the numbers

**Recommended slides:**

- Forecast chart + supporting table → `financials` (slide 13)
- Unit economics summary → `standard-content` (slide 4) with bold-lead bullets
- Scenarios comparison → `comparison-table` (slide 9)

---

### Valuation / Returns

Deal economics: pricing, expected returns, exit scenarios.

**Variations:**

- **Valuation comparables** — public and private comps with multiples
- **Expected returns** — IRR, cash-on-cash, exit multiple
- **Scenario returns** — returns under bear/base/bull exit scenarios
- **Ownership and dilution** — current and post-money stake

**What to extract:**

- Pre-money and post-money valuation
- Proposed investment amount and resulting stake
- Comparable company metrics (revenue multiples, exit multiples)
- Expected IRR with holding period assumption
- Exit scenario assumptions (exit multiple, exit year)

**How to convey:**

- Be explicit about base case vs. bull case
- Bold the returns metrics that drive the recommendation (IRR, CoC)
- For comparables, use real companies with concrete metrics
- Never present "expected returns" without the assumption stack

**Recommended slides:**

- Returns under multiple scenarios → `key-terms` style table or `comparison-table` (slide 9)
- Valuation comps → `comparison-table` (slide 9)
- Summary returns → `standard-content` (slide 4) with bold-lead bullets

---

### Cap Table

Ownership structure before and after the proposed round.

**Variations:**

- **Pre-money cap table** — current shareholders and stakes
- **Post-money cap table** — pro-forma after proposed round
- **Fully diluted** — including option pool and convertibles

**What to extract:**

- Shareholder name, share class, share count, ownership %
- Investment amount (for new investors in this round)
- Option pool size and treatment
- Any stapled terms (liquidation preference, anti-dilution)

**How to convey:**

- Bold the proposing firm's resulting stake
- Show pre and post-money side by side when space allows
- Always label fully diluted vs. as-issued
- Keep share counts precise — don't round

**Recommended slides:**

- Standard cap table → `cap-table` (slide 14)

---

### Deal Terms

Legal and economic terms of the proposed investment.

**Variations:**

- **Standard VC equity** — Series A/B preferred with standard terms
- **Extension round** — same terms as prior round
- **Convertible / SAFE** — discount, cap, MFN
- **Non-standard** — unusual preferences, governance, or protective provisions

**What to extract:**

- Security type (preferred series, SAFE, convertible)
- Liquidation preference (1x non-participating, 2x participating, etc.)
- Board composition
- Protective provisions
- Anti-dilution (broad-based weighted average, full ratchet)
- Use of proceeds

**How to convey:**

- Use the memo's exact legal language — don't paraphrase terms
- Flag any non-standard term prominently
- Separate economic terms from governance terms

**Recommended slides:**

- Term sheet summary → `key-terms` (slide 15)

---

### Risks & Mitigants

What could go wrong and how the company addresses it.

**Variations:**

- **Market risks** — TAM wrong, timing wrong, substitute products
- **Technical risks** — doesn't work at scale, regulatory blocks
- **Execution risks** — key person, hiring, GTM
- **Competitive risks** — incumbent response, new entrant
- **Financial risks** — burn, dilution, customer concentration

**What to extract:**

- Each identified risk with severity signal (deal-breaker vs. watch item)
- The specific mitigant proposed (not vague "team will address")
- Any leading indicators that would flag the risk materializing

**How to convey:**

- Pair every risk with its mitigant on the same line
- Be honest about risks without mitigants — state them
- Avoid generic risks that apply to any startup — focus on company-specific

**Recommended slides:**

- Risks / Mitigants as parallel columns → `two-column` (slide 7)
- Single-column risk list → `standard-content` (slide 4)

---

### Timeline / Milestones

Company history and forward milestones.

**Variations:**

- **Founding history** — incorporation, pivots, key hires
- **Product milestones** — first prototype, first customer, GA launch
- **Funding history** — rounds, investors, valuations
- **Forward roadmap** — planned product releases, hiring targets, geographic expansion

**What to extract:**

- Year (and month where relevant) for each event
- Event description in 1-2 sentences
- Gather dates from across the memo — timeline content is often scattered
- Separate historical from forward-looking

**How to convey:**

- Use a visual timeline with year markers
- Keep each event to 1-2 sentences
- Forward items should use softer language ("plans to", "targeting")

**Recommended slides:**

- Horizontal timeline → `timeline` (slide 11)
- Sparse milestones (< 3) → fold into `standard-content` (slide 4)

---

### Competitive Landscape

How the company positions against alternatives.

**Variations:**

- **Direct competitors** — companies doing the same thing
- **Indirect competitors / substitutes** — alternative ways to solve the problem
- **Positioning framework** — 2x2 matrix or comparison on key dimensions
- **Value chain position** — where they sit in the stack

**What to extract:**

- Named competitors (real companies only, never invented)
- Specific differentiators with evidence
- Company's position on the axes that matter
- Funding / traction of key competitors for context

**How to convey:**

- Use the memo's categorization if it has one
- Pick the 2 dimensions that reveal the company's advantage
- Highlight the subject company visually in the winning position
- For spec comparison, use exact numbers from each competitor

**Recommended slides:**

- Spec comparison across competitors → `comparison-table` (slide 9)
- 2x2 positioning → `matrix` (slide 8)
- Value chain positioning → `pipeline` (slide 10) or `standard-content` (slide 4)

---

## Slides

One entry per reference.pptx slide.

### Slide Types

There are three types of slides in reference.pptx:

**Fixed** (S1, S2, S3, S5, S6) — layout and shapes don't change. The agent fills content into existing shapes. Used as-is.

**Adaptive** (S4 content slides) — the agent adjusts layout to fit the content. The reference slides show the _typical_ layout, not a rigid mold. Adapt intelligently: use more or fewer bullets, adjust column balance, combine thin content or split dense content, switch patterns if the content's shape changes.

**Component** — small reusable visual units that are not full slides on their own but can be cloned and embedded into any fixed or adaptive slide. Slides 5 and 6 are dedicated component reference slides, but **components can also be lifted from fixed or adaptive slides** — e.g. the pill header pair from slide 7 (two-column), the chevron group from slide 10 (pipeline), or the founder photo block from slide 12 (team) can all be cloned onto another content slide as components.

### Reference Slide Index

The renderer clones slides from reference.pptx by index. Each slide is one of three types: **fixed**, **adaptive**, or **component**.

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

**Components beyond slides 5 & 6:** while slides 5 and 6 are dedicated component reference slides, components can also be lifted from any fixed or adaptive slide. The pill header pair from slide 7, the chevron group from slide 10, the founder photo block from slide 12 — all are valid components to clone onto another slide. The agent can compose any content slide from a mix of full-pattern bodies and lifted-component blocks.

---

### S1: Title Slide

**Type:** fixed

**Slide spec metadata:**

```
<!-- slide
slide: S1
-->
```

**Pattern:**
A title-card layout with a teal vertical panel along the left edge (inherited from Custom Layout) and two centered text elements: a large "Investment Memo: {nickname}" heading at 24pt and a smaller "{Month Year}" date line below it at 18pt. No body content. The teal panel anchors the deck identity visually before any content begins.

**Good for:**
The opening slide of every deck — every investment memo deck must begin with this exact slide. It does one job: set context for the entire presentation by stating _what_ deal this is and _when_ it is being considered. There is no decision to make about whether to use it; the only variable is the nickname and date. Used once per deck, always first.

**How to extract:** Use entity name / codename from user input. Date from memo or current date. Format: "Investment Memo: {agenda nickname}" and "{Month Year}".

**Design rules:**

- Title (Title 1 placeholder): "Investment Memo: {agenda nickname}", 24pt
- Date (text box): "{Month Year}", 18pt
- Teal panel from Custom Layout (not editable at slide level)

---

### S2: Executive Summary

**Type:** fixed

**Slide spec metadata:**

```
<!-- slide
slide: S2
-->
```

**Pattern:**
A single dense prose block sized to fill most of the slide, organized as 7 paragraphs at 14pt covering company background, team, traction, and the investment opportunity. No charts, no bullet structure visually — the dense paragraph format signals "this is the one-pager that says everything in one place". Bold key terms throughout (company name, founder names, dollar figures, customer names). The "Investment Opportunity" line acts as a visual section break inside the prose.

**Good for:**
The mandatory second slide of every deck. It is the "if you only read one slide, read this" page — designed for the IC member who skims rather than reads. Use exactly once, immediately after S1. The pattern is fixed because the executive summary is always present and always serves the same purpose; the only variability is the prose content the agent fills in. It is not a substitute for the body slides; it is a distillation that lets the IC navigate to whichever body slide they want to dig into.

**How to extract:** Synthesize from the memo's opening and deal terms sections. Structure as:

1. Company background (what they do, founded when, key technology, target market)
2. Founder/team headline credentials
3. Key traction proof point
4. **Investment Opportunity** — prior round details, current round, proposed investment

The Investment Opportunity section is **always present**. If the memo lacks explicit deal terms, synthesize from fragments (round size, valuation, investors mentioned anywhere). If truly absent, state: "Investment opportunity details not provided in source memo."

**How to extract:** Synthesize from the memo's opening and deal terms sections. Structure as:

1. Company background (what they do, founded when, key technology, target market)
2. Founder/team headline credentials
3. Key traction proof point
4. **Investment Opportunity** — prior round details, current round, proposed investment

The Investment Opportunity section is **always present**. If the memo lacks explicit deal terms, synthesize from fragments (round size, valuation, investors mentioned anywhere). If truly absent, state: "Investment opportunity details not provided in source memo."

**Design rules:**

Body paragraph structure — 7 paragraphs at 14pt, dense prose:

1. **Company background** — what they do, founded when, key technology/product, target market. Bold key terms (company name, technology names).
2. **Founder/team** — headline credentials. Bold names, prior exits, key titles.
3. **Key traction** — strongest proof point. Bold metrics.
4. **"Investment Opportunity"** — bold header, standalone line.
5. **Prior round** — size, valuation, lead investors.
6. **Current round** — what's being raised, terms, participation.
7. **Proposed investment** — firm's proposed amount, resulting stake.

---

### S3: Divider

**Type:** fixed (layout-driven)

**Slide spec metadata:**

```
<!-- slide
slide: S3
section: "{section name}"
-->
```

**Pattern:**
A full-bleed dark teal panel covering the left ~30% of the slide, with the section name as large 32pt white right-aligned text. No body content, no list, no chart. The dark panel + white text combination creates a strong visual break that signals "we are leaving the previous topic and starting a new one". The section name placeholder is editable per slide; the dark panel is layout-locked.

**Good for:**
Section transitions inside the deck. Use one before each major section (Market, Product, Team, etc.) to give the audience a mental reset and orient them to the next topic. The pattern is intentionally minimalist — its job is to create a pause, not to convey information. Usable as many times as the deck has sections, typically 3-5 times. Skip if a section has only 1-2 content slides — fold those into an adjacent section instead of dividing further.

**How to extract:** Section names come from the narrative arc groupings (e.g., "Market", "Product, Traction & Revenue Model", "Team, Financials & Valuation").

**Design rules:**

- Dark teal panel (Rectangle 4 in Divider layout) — fixed
- Section name via editable body placeholder (idx 10) — 32pt, white, right-aligned, no bullet

---

### S4: Content Slide

**Structure:** Adaptive

The content slide provides a title bar (inherited from Content layout) and a free body area. The agent picks one of the pattern slides below as the starting shape.

**Fixed elements (inherited from layout):**

- Title placeholder at (0.67, 0.18) sized 9.80 × 0.96in, 22pt accent2 color, non-bold — do not override per slide
- Any logo on master — do not modify

**Slide spec metadata:** Always `slide: S4` plus a `pattern:` field naming the reference slide to clone.

---

#### standard-content (slide 4)

```
<!-- slide
slide: S4
pattern: standard-content
-->
```

**Pattern:**
The baseline content slide. Title at the top; below it is a free body area at 14pt, typically used for bold-lead bullets but accepting any structured text content. No fixed body shapes — the agent lays out text (and optionally clones slide-5 or slide-6 components) into the empty body region. This is the pattern that falls back from any other when the content doesn't have a stronger structural shape.

**Good for:**
Any memo content that is primarily a claim supported by 3-6 evidence points in prose form. Use it when the content's shape is "one key takeaway + supporting bullets", without an obvious comparison, timeline, or tabular structure. It is the default — if none of the specialized patterns fit cleanly, use this. Team member deep-dives, risk lists without explicit mitigants, single-axis driver lists, product capability summaries, unit economics walkthroughs, and similar prose-with-numbers content all render naturally here. It is also the right choice when the memo content is important but too sparse to fill a more elaborate pattern — three key bullets read better on a clean standard-content slide than stretched into a two-column or matrix.

**How to extract:**

- Title: one sentence stating the key takeaway — not a label
- Body: 3-6 **bold-lead bullets** (bold claim phrase + supporting detail)
- For risk slides without explicit mitigants: each risk as a bold-lead bullet with explanation as the supporting detail
- For team deep-dive: name + title header, credentials as bullets
- Optionally embed one `chart-caption` (slide 5 clone) or `icon-text` (slide 6 clone) component alongside the text

**Density:** 3-6 bullets. If more, split into two slides.

**When NOT to use:** When content has a clear structural shape (comparison, timeline, table, matrix, process).

---

#### chart-caption (slide 5) — **reusable component**

```
<!-- slide
slide: S4
pattern: chart-caption
-->
```

**Pattern:**
A small visual unit consisting of a caption line (14pt, label text) sitting above a chart or picture block. Designed at a size that fits one half of a slide (~5in wide × 4in tall), so it can be used standalone as a single-chart slide or cloned and combined with other components on a two-column layout. The chart is a picture placeholder — the agent fills it with a rendered chart image or leaves it for human finishing.

**Good for:**
Any content that benefits from one visual anchor — a market size chart, a revenue projection graph, a technology diagram, a competitive positioning plot. Use as a standalone slide when the single chart IS the message (e.g. "here's the market size growth"). Use as an embedded component inside a `standard-content` or `two-column` slide when you need a visual alongside text. The caption should state what the chart shows in one line; the title of the surrounding slide states the takeaway.

**How to extract:**

- Caption: short descriptor of the chart's subject and unit (e.g. "Market Size in US$ billion")
- Visual: chart image, reference to a chart spec, or placeholder for human finishing
- If standalone: title is the takeaway, caption is the axis label

**Density:** One chart + one caption. Do not stack multiple charts in this component.

**When NOT to use:** When you need multiple charts — build a multi-component slide using `standard-content` as the container and cloning this component multiple times.

---

#### icon-text (slide 6) — **reusable component**

```
<!-- slide
slide: S4
pattern: icon-text
-->
```

**Pattern:**
A small visual unit consisting of a small icon (~0.57in square) paired with a multi-line text block to its right. Designed to fit as one block within a larger content slide — typically 3-4 of these arranged in a row or grid represent "key points with visual anchors". The icon is a picture; the text is regular bold-lead body.

**Good for:**
Any content that benefits from visual anchors — a list of growth drivers (each with an icon), a set of technology pillars, a product feature list, a set of use cases. Humans absorb iconified lists faster than plain bullet lists. Use when the memo has a naturally categorical list and you can find (or placeholder) iconography that distinguishes each category.

**How to extract:**

- Icon: image reference or descriptor (agent leaves a placeholder for human to drop in the right icon)
- Text: 2-4 lines of bold-lead prose explaining the point
- Typically 3-4 instances arranged as a row or 2x2 grid on a content slide

**Density:** Per component: 1 icon + 2-4 lines of text. Per slide: 3-4 components typical.

**When NOT to use:** When the list has no meaningful categorical distinction, or when no icons can be sourced — fall back to plain bold-lead bullets in `standard-content`.

---

#### two-column (slide 7)

```
<!-- slide
slide: S4
pattern: two-column
-->
```

**Pattern:**
Two equal-width columns, each introduced by a pill header (rounded rectangle label) followed by content. The reference slide uses one `chart-caption` block in the left column and one `icon-text` block in the right column, but the pattern accepts any pair of component types — two charts, two icon-text blocks, chart + bullets, etc. The pill headers at the top are the only fixed elements; the body is fully composable from the reusable components.

**Good for:**
Any content that naturally divides into two named halves — opposing forces (supply vs. demand), contrasting approaches (traditional vs. ours), problem vs. solution framing, risks vs. mitigants, before vs. after, quantitative vs. qualitative validation, two customer segments side by side. Use when placing the two halves in parallel _reveals the dynamic_ — i.e. the comparison itself is the insight. If one side has significantly more content than the other, fall back to `standard-content` instead.

**How to extract:**

- Title: one sentence stating the core tension or dynamic
- Left pill: short header label (e.g. "SUPPLY-SIDE", "PROBLEM", "RISKS")
- Right pill: paired header label ("DEMAND-SIDE", "SOLUTION", "MITIGANTS")
- Left column body: one component (chart-caption, icon-text, or bullets)
- Right column body: one component (same or different type)
- Reframe flat memo lists into a two-sided structure when the dynamic is present but not explicit

**Density:** 2-4 points per column. If columns are unbalanced (6 vs. 2), use standard-content instead.

**When NOT to use:** When content has more than two natural groupings, or when the two sides are not conceptually parallel.

---

#### matrix (slide 8)

```
<!-- slide
slide: S4
pattern: matrix
-->
```

**Pattern:**
A 2x2 grid with HIGH/LOW labels on two axes and named entities positioned within the quadrants. The axis labels are text boxes at the corners; the quadrant entries are a shape group that the agent or user edits. The subject company is typically placed in the winning quadrant and visually distinguished.

**Good for:**
Any content with two clear dimensions and 4+ named entities to position — competitive landscape, technology positioning, market gap framing, strategic quadrant analysis. The value of a matrix is revealing _relative positioning at a glance_: the viewer immediately sees who is where without reading a table. Use when the memo already frames the landscape on two dimensions, or when you can distill the analysis into two dimensions without losing fidelity. Do not force into a matrix if the real positioning needs three or more dimensions — use a comparison-table instead.

**How to extract:**

- Title: one sentence positioning the company as strong on both axes
- Identify the two dimensions that matter most (e.g. flexibility vs. accuracy, speed vs. generalization)
- Axis labels: HIGH/LOW for both axes, with the dimension name (e.g. "Metric 1", "Metric 2")
- Entities: 4-8 named companies or categories, placed in the quadrant that matches their positioning
- Highlight the subject company visually (color, border, bold)

**Density:** 4-8 entities. Axis labels + entity names + brief descriptors.

**When NOT to use:** Fewer than 3 entities, or when the dimensions aren't clear — use standard-content or comparison-table instead.

---

#### comparison-table (slide 9)

```
<!-- slide
slide: S4
pattern: comparison-table
-->
```

**Pattern:**
A row-based comparison layout where each row is a category or attribute (e.g. "Strength", "Limitations", "Spec A") and each column is an entity being compared. Horizontal divider lines separate rows. Icons or small images may sit in the header cells to identify each entity. Unlike a flat data-table, this layout is designed for _qualitative_ comparison where each cell holds prose rather than a single number.

**Good for:**
Any content that compares 3-5 named entities across 3-5 qualitative attributes — competitive technology comparison, strength/weakness matrix, approach comparison, solution variant comparison. Use when the memo has a natural table-of-prose shape where each cell needs a sentence or short paragraph, not just a number. If cells are pure numbers, use a plain data-table instead.

**How to extract:**

- Title: one sentence summarizing the comparative finding
- Row labels: 3-5 attributes to compare (one attribute per row)
- Column headers: 3-5 entities (company name, technology name, or approach name)
- Cell content: 1-2 short sentences per cell — prose, not data
- Header icons: optional, drop in if available

**Density:** 3-5 columns × 3-5 rows. If larger, split into multiple slides.

**When NOT to use:** Pure quantitative comparison → use a data table on `standard-content`. Binary yes/no comparison → use a matrix.

---

#### pipeline (slide 10)

```
<!-- slide
slide: S4
pattern: pipeline
-->
```

**Pattern:**
A horizontal flow of 3-5 chevron/arrow shapes representing sequential steps, with labels under each step. Below the chevron row sits a summary bar or value-proposition row. Each step can have an associated product image above it. The overall structure reads left-to-right as a process, pipeline, or value chain.

**Good for:**
Any content that is naturally sequential — sales funnel stages, product development pipeline, customer journey, value chain position, go-to-market phases, production process. Use when the memo frames something as a progression where each stage feeds the next. The pattern makes the sequence visually obvious and anchors value propositions at each step.

**How to extract:**

- Title: one sentence describing the overall pipeline
- Steps: 3-5 labels, each naming the stage
- Products/offerings: per-step description
- Images: optional per-step product images
- Summary bar: one sentence stating the integrated outcome across all steps
- Value row: per-step value proposition in short phrase

**Density:** 3-5 steps. More than 5 becomes cramped — split or summarize.

**When NOT to use:** Non-sequential content (use two-column or matrix), content without clear stage boundaries (use standard-content).

---

#### timeline (slide 11)

```
<!-- slide
slide: S4
pattern: timeline
-->
```

**Pattern:**
A horizontal timeline structure with year markers, event groups, and vertical separator bars. Events can sit above or below the main axis, allowing historical events on one side and forward milestones on the other. The rightmost year marker often represents "current & forward" with a larger bounded area for future plans. Design supports 4-7 year markers and roughly 1-2 events per year.

**Good for:**
Any content that is naturally chronological — company founding and milestones, funding history, product launch roadmap, historical context leading to current state combined with forward targets. The pattern is especially useful when memo content is scattered across sections and needs to be _synthesized_ into a coherent timeline.

**How to extract:**

- Title: one sentence describing the arc from start to present/future
- Gather dates from **throughout the memo** — timeline content is rarely in one place
- Year markers (bold) with 1-2 sentence event descriptions
- Include: founding, key hires, product milestones, customer wins, funding rounds, forward targets
- Distinguish historical vs. forward events visually if the memo makes this distinction

**Density:** 4-7 milestones. Fewer than 3: fold into standard-content. More than 7: summarize or split.

**When NOT to use:** Content that isn't inherently chronological, or when the dates add no meaning to the story.

---

#### team (slide 12)

```
<!-- slide
slide: S4
pattern: team
-->
```

**Pattern:**
A two-section layout: a "Founding Team" area on the left with larger photos and text blocks for each founder, and a narrower "Board of Directors & Advisors" area on the right with smaller photos and names. Each person has a photo placeholder + name/title/description text block. Section headers are pill-style rounded rectangles.

**Good for:**
Any team slide that needs to show both operators and the broader governance/advisor network. Use when the memo provides named founders with credentials AND a board / advisor list — the pattern's dual layout communicates both "who runs the company" and "who backs them". If the memo only covers founders (no board/advisor material), use `standard-content` with bullet-lead credentials instead.

**How to extract:**

- Title: one sentence on the team's collective strength
- Founding team section: 3-4 founders with photo + name + title + 1-line descriptor
- Board & Advisors section: 2-4 people with smaller photo + name + title
- Person names: bold, accent teal color
- Credentials: one line, concrete (exits, prior companies, named titles)

**Density:** 3-4 founders + 2-4 board/advisors. More than that, split or move extras to appendix.

**When NOT to use:** When the memo doesn't distinguish founders from advisors, or when there's only 1-2 people to show — fall back to `standard-content`.

---

#### financials (slide 13)

```
<!-- slide
slide: S4
pattern: financials
-->
```

**Pattern:**
A financial projection layout with a bar/line chart at the top, typically accompanied by a trend arrow and growth percentage callout, and a supporting data table below. The chart shows the shape of the growth (which the arrow emphasizes); the table shows the precise numbers. A small unit label identifies the currency and scale.

**Good for:**
Revenue projections, unit economics over time, cost trajectories, customer growth, or any financial story where the _trend_ is the headline and the _specific numbers_ are the proof. The pattern is designed to answer "how fast is this growing and what are the actual numbers" in one glance. Use when the memo provides multi-year financial data with a clear growth narrative.

**How to extract:**

- Title: one sentence stating the financial takeaway (e.g. "EBOTS is forecasted to breakeven in 2027")
- Chart: multi-year projection (bar, line, or stacked)
- Growth callout: headline % with an arrow, positioned on the chart (e.g. "+105% CAGR")
- Table below: years as columns, line items as rows (revenue, cost, EBITDA, etc.)
- Unit label: "$US million" or equivalent

**Density:** Chart + one data table with ≤ 10 rows, ≤ 6 years. If more, split.

**When NOT to use:** Single-year financials (use `standard-content`), projections without a clear trend (use `cap-table` or `key-terms` table).

---

#### cap-table (slide 14)

```
<!-- slide
slide: S4
pattern: cap-table
-->
```

**Pattern:**
A full-width data table optimized for ownership-structure data — many rows (shareholders / line items), many columns (pre-money, new round, post-money, fully diluted). The reference sizes the table at roughly 12×5.7in to fit up to 15 rows and 9 columns. Bold header row.

**Good for:**
Cap tables, shareholder breakdowns, pro-forma ownership analyses — any content where many rows × many columns is required and each cell is numeric. The pattern is designed for dense, readable tabular data with exact numbers.

**How to extract:**

- Title: one sentence highlighting the key ownership outcome (e.g. "AIconic is estimated to hold a fully diluted stake of X%")
- Header row: column labels (shareholder class, shares, pre %, new round, post %)
- Rows: one per shareholder or share class
- Bold the firm's resulting stake row
- Preserve exact share counts and percentages — do not round

**Density:** Up to 15 rows × 9 columns. Larger, split across slides or move detail to appendix.

**When NOT to use:** Small tables (< 4 rows) — fold into `standard-content`. Non-cap-table data — use a generic comparison or key-terms table.

---

#### key-terms (slide 15)

```
<!-- slide
slide: S4
pattern: key-terms
-->
```

**Pattern:**
A compact 2-column table: term name on the left, detail on the right. Typically 6-10 rows. The right column is wider to accommodate longer legal or descriptive text. Designed for small tabular content where the key-value shape is the natural fit.

**Good for:**
Term sheet summaries, deal-term lists, key assumption tables, methodology notes, definitions of unit-economic metrics — any list of 6-10 named items where each has a longer explanation. Use when the memo provides a term-by-term legal or methodological breakdown.

**How to extract:**

- Title: one sentence framing what the terms collectively represent (e.g. "Standard VC equity investment terms")
- Term column: 6-10 term names (bold)
- Detail column: 1-3 sentences per term, using the memo's exact legal language for deal terms
- Preserve the memo's wording — don't paraphrase legal terms

**Density:** 6-10 rows × 2 columns. Fewer than 4: fold into `standard-content`. More than 10: split.

**When NOT to use:** Multi-dimensional data (use `comparison-table` or `cap-table`), or numeric tables (use `financials` or `cap-table`).

---

### S5: Investment Criteria

**Type:** fixed

**Slide spec metadata:**

```
<!-- slide
slide: S5
-->
```

**Pattern:**
A full-width 8-row × 2-column table. The left column lists the firm's standard assessment criteria as fixed labels (Strategic Fit, Market, Competitive Edge, Team, Revenue/Profit, Valuation, Risk Mitigants); the right column holds 2-4 sentences of synthesized commentary per row. A title above the table identifies the company being assessed. The fixed-label structure makes every memo deck directly comparable against the same framework.

**Good for:**
The standardized investment-committee assessment that every deck closes with before the appendix. Use exactly once per deck, near the end. Its power is _consistency_: every IC member knows the row order and the criterion definitions, so they can scan and compare across deals quickly. Do not modify the row labels even if a memo is thin on a criterion — leave the row in place and state the gap professionally. The pattern is fixed because the IC framework is institutional, not memo-specific.

**How to extract:** For each criterion row, write 2-4 sentences synthesizing what the memo says about that topic. Draw from all relevant sections — the market row draws from market content, the team row from team content, etc. Do not add judgments beyond what the memo states.

**Mandatory elements** (all rows always present):

- Strategic Fit
- 1. Market size and scalability
- 2. Competitive edge
- 3. Team experience
- 4. Revenue / profit potential
- 5. Valuation / Exit & Return
- 6. Risk Mitigants

If memo lacks content for a criterion, state the gap professionally — never remove the row. Custom criteria framework can replace the default if user provides one.

**Table structure (8 rows × 2 cols):**
| Row | Key factors for Assessment (keep) | Comments (replace) |
|-----|-----------------------------------|-------------------|
| 0 | Strategic Fit | How investment fits fund thesis/pillars |
| 1 | Attractiveness of Investment | (section header — leave empty) |
| 2 | 1. Market size and scalability | Market size, growth drivers, scalability |
| 3 | 2. Competitive edge | Moat, IP, technical differentiation |
| 4 | 3. Team experience | Founder credentials, track record, composition |
| 5 | 4. Revenue / profit potential | Traction proof, revenue model, growth trajectory |
| 6 | 5. Valuation / Exit & Return | Valuation reasonableness, expected IRR/COC, exit prospects |
| 7 | 6. Risk Mitigants | Top risks + corresponding mitigants |

---

### S6: Appendix

**Type:** fixed

**Slide spec metadata:**

```
<!-- slide
slide: S6
-->
```

**Pattern:**
A minimalist divider slide with the single word "Appendix" centered on a clean background. No body content, no list, no chart. It functions as a section break announcing that everything after this point is supplementary reference material that the IC may or may not need to review.

**Good for:**
The boundary between main deck content and supplementary appendix slides. Use exactly once per deck — only if there is at least one appendix content slide following it. Skip entirely if the deck has no appendix material. After this slide, the agent typically places overflow content and detailed comparison tables (`comparison-table`, `cap-table`) that didn't fit in the main narrative.

**How to extract:** Keep as-is. Appendix content slides that follow use S4 patterns (typically `comparison-table` or `cap-table` for comps).

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
- `.claude/scripts/clean_reference.py` removes OLE cruft and orphan rels. Run after manual edits to reference.pptx.
