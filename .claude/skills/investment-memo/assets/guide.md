# Slide Guide

The reference for the investment-memo skill — what to present, how to present it, how to arrange it. Read this first before starting for a thorough understanding of the task.

---

## Theme

The visual contract. Constant across every slide in every deck.

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

## Core Principles

### Hard constraints

1. **Fixed templates.** S1, S2, S3, S5, S6 clone from `reference.pptx` — swap text, layout stays. S4 keeps the layout-defined title placeholder; everything below the title is free composition.
2. **Theme.** Colors, typography, spacing above. Constant on every slide.
3. **Hygiene.** No overlaps, no overflow, font sizes ≥ the typography minimums. A slide that fails hygiene doesn't ship.
4. **Spec content.** Every fact traces back to the memo via the spec. Nothing invented, nothing dropped.

### S4 body design

The fixed slides are solved by the reference. S4 is where design work happens — these principles govern that free composition.

- **Land the impact.** Every S4 slide exists to deliver one reader impact. Pick the composition that best lands it — charts, diagrams, and custom compositions are fair game; text-in-boxes is rarely the strongest answer for data-rich content. Slides should look like a designer touched them, not like a form was filled.
- **Vary across the deck.** Three consecutive body slides with the same layout means you're template-filling, not designing.
- **Breathing room.** Compose with deliberate whitespace between adjacent blocks — every pair should read as clearly separated at a glance. Position each block with a visible gap from its neighbour, not flush against it.

### Ship states

Two allowed states:

- **Ship-ready** — complete, final, presentable as-is.
- **Half-done, hand-off-clean** — missing pieces (data not in the memo, photos, logos, external assets) are labeled placeholders a non-designer fills in under a minute in PowerPoint. Flagged in the advisory.

**Forbidden: hidden gaps.** Empty image shapes with no label, placeholder data that looks real, layouts needing designer finishing, flattened or scripted visuals a human can't edit in PowerPoint.

**When ambition and finishability collide, finishability wins.** Design down to a cleaner composition that ships — don't leave a half-broken ambitious slide behind.

---

## Slides

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

### S4: Body Slides

`slide: S4`. The blank canvas where memo content lives. Build from scratch — no template to fill. The reference file gives you a blank S4 with a pre-positioned title placeholder (22pt accent2, layout-defined); everything below the title is yours. See **Core Principles → S4 body design** for how to compose, and the **Content Catalog** below for what to extract per topic.

### S5: Investment Criteria

`slide: S5`. Full-width 8-row × 2-column table; left column lists the firm's standard assessment criteria as fixed labels, right column holds 2-4 sentences synthesizing what the memo says about that criterion (draw from all relevant sections; do not add judgments beyond what the memo states). The fixed-label structure makes every memo deck directly comparable — its power is _consistency_. Used exactly once per deck, near the end. Do not modify the row labels even if a memo is thin on a criterion — leave the row in place and state the gap professionally.

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

`slide: S6`. Minimalist divider with "Appendix" centered. Used exactly once per deck — only if at least one appendix content slide follows. Skip entirely if the deck has no appendix material. Appendix content that follows uses S4 body slides or entirely blank slides, as the content demands.

---

## Content Catalog

Extension of S4 — organizes memo content by type. For each body slide, find the matching content type. Each entry: **Pull** (what to extract from the memo) and **Impact** (what the reader should walk away feeling or understanding). Composition is entirely the renderer's call — pick the form that lands the impact.

### Market

The size, shape, and dynamics of the market the company plays in.

**Pull:**

- Sizing — TAM/SAM/SOM with horizon, CAGR with timeframe
- Problem framing — pain points, inefficiencies, unmet needs
- Drivers — single-sided tailwinds or two-sided supply/demand dynamics
- Gap framing — what current solutions miss, white space being addressed
- Segmentation — vertical, geographic, or customer-tier breakdowns

**Impact:** the reader should feel the market is both large and moving — size and momentum land together, not one without the other. Any "why now" cause should feel inseparable from the size figure.

### Product / Technology

What the company builds, how it works, what makes it defensible.

**Pull:**

- Product overview — what it is, who uses it, headline capabilities
- Technical depth — architecture, key algorithms, engineering moats
- Capability specs — yield, speed, accuracy, capacity (with units)
- Differentiation — vs. named real alternatives
- Roadmap — current state, near-term releases, long-term vision with dates

**Impact:** the reader should walk away understanding what is actually built today (vs. promised for later) and why it's hard to replicate. Capability claims should land as numbers, not adjectives.

### Traction / Validation

Evidence that customers want or are buying the product.

**Pull:**

- Customer logos — named accounts, tier-1 validation
- Quantitative metrics — revenue, units, pilots, retention, yield, with units and timeframes
- Case studies — specific customer stories with measurable outcomes
- Pipeline — LOIs, signed contracts, qualified opportunities, by stage
- Testimonials — quotes with name + title + company

**Impact:** the reader should believe real customers care — the strongest proof point should hit first and feel specific, not general. Vague enthusiasm should never stand in for a number or a name.

### Team

The founders, key hires, board, and advisors.

**Pull:**

- Founding team — names, titles, one-line credentials
- Extended team — key engineers, operators, GTM leads
- Board and advisors — investors, independent directors, domain experts
- Founder-market fit — concrete reasons why these specific people for this market

**Impact:** the reader should feel this is the right team for this specific market — credentials framed for their relevance to the thesis, not a résumé dump. Founder-market fit should land as a concrete reason, not a generic claim.

### Financials / Projections

Revenue, burn, unit economics, forward projections.

**Pull:**

- Historical financials — revenue, growth, burn, runway by period
- Forward projections — revenue forecast, breakeven year, cash need
- Unit economics — CAC, LTV, margin, payback (with definitions)
- Cost structure — COGS breakdown, R&D intensity, sales efficiency
- Scenarios — base / bull / bear projections

**Impact:** the reader should see the shape of the business — trajectory, burn, breakeven, runway — and trust the assumptions behind any dramatic number. Actuals, estimates, and forecasts should never blur.

### Valuation / Returns

Deal economics: pricing, expected returns, exit scenarios.

**Pull:**

- Valuation comparables — public and private comps with multiples
- Expected returns — IRR, cash-on-cash, exit multiple
- Scenario returns — bear/base/bull exit scenarios
- Ownership and dilution — current and post-money stake

**Impact:** the reader should understand the return on offer and the assumptions it rests on — a return without its inputs is incomplete. Base case and bull case should never be mistaken for each other.

### Cap Table

Ownership structure before and after the proposed round.

**Pull:**

- Pre-money cap table — current shareholders and stakes
- Post-money cap table — pro-forma after proposed round
- Fully diluted view — option pool, convertibles, warrants
- Investment amount, option pool treatment, stapled terms

**Impact:** the reader should see ownership before and after at a glance and find the proposing firm's resulting stake immediately. Exact share counts and percentages matter — never round.

### Deal Terms

Legal and economic terms of the proposed investment.

**Pull:**

- Security type (preferred series, SAFE, convertible)
- Liquidation preference, anti-dilution mechanism
- Board composition, protective provisions
- Use of proceeds
- Any non-standard preferences, governance, or protective provisions

**Impact:** the reader should grasp the economic and governance shape of the deal quickly, with any non-standard term jumping out unmistakably. Use the memo's exact legal language — don't paraphrase.

### Risks & Mitigants

What could go wrong and how the company addresses it.

**Pull:**

- Market risks — TAM wrong, timing wrong, substitute products
- Technical risks — doesn't work at scale, regulatory blocks
- Execution risks — key person, hiring, GTM
- Competitive risks — incumbent response, new entrants
- Financial risks — burn, dilution, customer concentration
- Each risk with severity (deal-breaker vs. watch item) and its specific mitigant

**Impact:** the reader should feel risks are named honestly and company-specific, with mitigants that sound thought-through rather than sanitized. Risks without mitigants should be stated as such, not hidden.

### Timeline / Milestones

Company history and forward milestones.

**Pull:**

- Founding history — incorporation, pivots, key hires
- Product milestones — first prototype, first customer, GA launch
- Funding history — rounds, investors, valuations
- Forward roadmap — planned releases, hiring, geographic expansion

**Impact:** the reader should see the arc of the company — where it has been and where it is going — at a single glance. Historical commitments and forward plans should read differently; the future should feel forecast, not fact.

### Competitive Landscape

How the company positions against alternatives.

**Pull:**

- Direct competitors — companies doing the same thing
- Indirect competitors / substitutes — alternative ways to solve the problem
- Positioning framework — relevant dimensions for comparison
- Value chain position — where they sit in the stack
- Funding / traction of key competitors for context

**Impact:** the reader should see where the company wins and against whom — the advantage should be unmistakable. Use real named companies only, never invented ones, and comparisons should rest on exact numbers where specs are the point.

---

## Narrative Arc

How slides compose into a deck:

```
Title → Executive Summary
Divider: Market
Content slides  → market
Divider: Product
Content slides  → product, traction, competitive, timeline slides
Divider: Team
Content slides  → team
Divider: Deal
Content slides  → financials, valuation, cap table, terms slides
Investment Criteria
Appendix (optional)       → overflow
```

A Divider and Content slides form a section. If a section has no content, drop it. If there is new content, weave it into the existing sections or create new sections. The arc is a preferred structure, not a constraint — the goal is a sound, coherent flow.

---

## Notes

- `reference.pptx` contains 6 slides: the 5 fixed templates (S1 title, S2 exec-summary, S3 divider, S5 investment-criteria, S6 appendix) + a blank S4 canvas.
- The Divider layout bakes no-bullet / right-align / white / 32pt into `<a:lstStyle>` so new divider slides inherit the style.
