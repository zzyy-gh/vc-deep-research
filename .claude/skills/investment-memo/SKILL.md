---
name: investment-memo
description: "Transform an investment memo into a structured slide deck — reads memo (PDF/DOCX/MD/HTML), produces slide-spec markdown, then renders to PPTX"
model: opus
forked: true
---

# Investment Memo to Slides

You are transforming a VC investment memo into presentation slides for the investment committee. The memo is the **single source of truth** — no additional research, no new analysis. Extract, restructure, and present what's in the memo.

## Inputs

**Required:**
- Investment memo file (PDF, DOCX, MD, or HTML) — provided by user
- Entity name and deal codename (e.g., "eBots", "Project Robot")

**Optional:**
- Additional notes or supplementary materials from user
- Custom investment criteria framework (defaults to standard 6-criteria scorecard)
- Rendering target: `markdown-only` | `pptx` (default: `markdown-only`)

## Output

### Step 1: Slide Spec (always produced)
Write to: `output/investment-memo/investment-memo-{slug}-v{round}.md`

### Step 2: Slide Advisory (always produced alongside slide spec)
Write to: `output/investment-memo/investment-memo-{slug}-v{round}-advisory.md`

Frontmatter:
```yaml
---
entity: "{name}"
skill: investment-memo
type: slide-advisory
round: {round}
date: "{timestamp}"
model: opus
description: "Slide deck advisory — improvements, visuals, appendix proposals"
inputs:
  - investment-memo-{slug}-v{round}.md
---
```

A companion document that advises how to strengthen the presentation. This is where the skill goes BEYOND the memo — suggesting improvements, flagging issues, recommending visuals, and proposing appendix content with research where needed. The slide spec stays faithful to the memo; the advisory is where critical thinking happens.

### Step 3: Rendered deck (if requested)
- PPTX: `output/investment-memo/investment-memo-{slug}-v{round}.pptx`
- **On-the-fly rendering**: No pre-built script. The agent reads the slide-spec markdown + `assets/style-pptx.md` and writes a tailored python-pptx script for the specific deck, then runs it. This adapts to each deck's content and layout patterns rather than relying on a rigid parser.
- Style guide and example decks in `assets/` inform the agent's rendering decisions.

Frontmatter:
```yaml
---
entity: "{name}"
skill: investment-memo
type: slide-deck
round: {round}
date: "{timestamp}"
model: opus
codename: "{deal codename}"
description: "Investment presentation slides"
inputs:
  - {memo filename}
  # list any additional materials read
---
```

## Slide Spec Format

Each slide is a block starting with `## S{N}: {slide_title}` and containing metadata in a `<!-- slide -->` comment, followed by the slide content in markdown.

```
## S1: Title Slide
<!-- slide
layout: title
-->

# Investment Opportunity: {Codename}
_{Month Year}_
```

### Layout types
Tells renderers which template to use:
- `title` — Title slide (heading + date + optional image)
- `divider` — Section divider (large bold text, minimal)
- `content` — Standard content slide (title + body)
- `table` — Content slide dominated by a data table
- `appendix-header` — Appendix divider

### Content patterns
Within `content` layout, use these markers to signal visual structure to renderers:

- `pattern: two-column` — Body splits into two columns (e.g., supply-side vs demand-side)
- `pattern: highlights` — "HIGHLIGHTS" header followed by 3-4 standalone bold callout statements
- `pattern: testimonials` — Paired blocks of bullet evidence + named attribution
- `pattern: sidebar` — Main content (table/chart) on left, callout box on right
- `pattern: timeline` — Chronological milestone sequence
- `pattern: matrix` — 2x2 or positioning framework

### Metadata fields
```
<!-- slide
layout: content
pattern: highlights
tag: "Company"
source: "/1 Company information"
note: "Footnote text"
-->
```

- `tag` — Section pill badge in bottom-right (e.g., "Market", "Company", "Competitive Analysis")
- `source` — Source citation line at bottom. Use numbered references: `/1 description /2 description`
- `note` — Footnote line at bottom

## Slide Structure

Target: **20-26 slides** for a full memo, **12-15 slides** minimum for sparse memos. Follow this sequence:

---

### Title (1 slide)

```
## S1: Investment Opportunity: {Codename}
<!-- slide
layout: title
-->

# Investment Opportunity: {Codename}
_{Month Year}_
```

- Include `assets/aiconic-logo.jpg` (firm logo) on the title slide

---

### Executive Summary (1 slide)

```
## S2: Executive Summary
<!-- slide
layout: content
tag: "Executive Summary"
-->
```

The "one-pager" — an IC member who reads only this slide should understand the deal. Structure as:

**Left/main body** — three dense paragraphs with bold key terms:
1. **Company description**: what they do, founded when, key technology/product, target market
2. **Founder/team**: headline credentials (prior exits, relevant experience, patents)
3. **Key traction**: strongest proof point (customer validation, revenue, pilot results)

Then a **bold sub-header** "Investment Opportunity" followed by:
4. Prior round details (size, valuation, lead investors)
5. Current round (size, terms, participation)
6. Proposed investment (amount, resulting stake)

**Right sidebar** — "Agenda" listing the sections covered in the deck:
```
**Agenda:**
- Market
- Product, Traction & Revenue Model
- Team, Financials & Valuation
- Appendix
```

---

### Section: Market (1 divider + 2-3 content slides)

**S{N}: Market divider**
```
<!-- slide
layout: divider
-->
Market
```

**S{N}: Market Problem / Drivers**
```
<!-- slide
layout: content
pattern: two-column
tag: "Market"
source: "/1 source description"
-->
```

- Title: sentence-form takeaway (e.g., "Manufacturers face multiple challenges from labor shortage to rising precision demands")
- Use **bold-lead bullets**: first phrase bold (the claim), followed by regular text (the evidence)
  - Example: "**Labor shortage** Global shortfall of labor (China projected to face 25M worker shortfall by 2030)"
- Split into SUPPLY-SIDE and DEMAND-SIDE columns if the memo presents both push and pull factors
- If memo doesn't have a natural two-column split, use 3-4 bold-lead problem statements

**S{N}: Market Sizing**
```
<!-- slide
layout: content
tag: "Market"
source: "/1 source for TAM /2 source for SAM /3 source for SOM"
-->
```

- Title: sentence stating the headline market size number
- TAM → SAM → SOM funnel if memo provides layered sizing
- Use the memo's numbers directly — bold the dollar figures
- Include CAGR and year ranges

**S{N}: Current Gap / Limitations (optional)**
- Only include if the memo explicitly describes why existing solutions fail
- Title: sentence explaining the gap
- Tag: "Market"
- Can use `pattern: matrix` if memo frames limitations along two axes

---

### Section: Product, Traction & Revenue Model (1 divider + 3-5 content slides)

**S{N}: Section divider**
```
<!-- slide
layout: divider
-->
Product, Traction, & Revenue Model
```

**S{N}: Product Overview**
```
<!-- slide
layout: content
pattern: highlights
tag: "Company"
source: "Company information"
-->
```

- Title: sentence-form company positioning statement
- **HIGHLIGHTS** header followed by 3-4 bold standalone statements, each capturing a key capability or spec:
  - Example: "**State-of-the-art precision technology delivering 22um accuracy at 409 FPS with 99.95% yield rate**"
  - Example: "**Versatile assembly combining 3D vision, dual-arm coordination, and AI-powered adaptability**"
- Below highlights: product component labels if relevant (for hardware: labeled parts; for software: platform components)

**S{N}: Product Deep-Dive (optional)**
```
<!-- slide
layout: content
tag: "Company"
-->
```

- Only if memo contains detailed technical architecture, patents, or system breakdown
- Hardware deals: describe the system architecture (sensing → processing → actuation pipeline)
- Software deals: describe the platform stack or integration flow
- Deep-tech deals: describe the IP/patent portfolio structure
- Skip if memo only gives a surface-level product description

**S{N}: Competitive Positioning**
```
<!-- slide
layout: content
pattern: matrix
tag: "Competitive Analysis"
note: "/1 definition of axis 1 /2 definition of axis 2"
-->
```

- Title: sentence positioning the company as uniquely strong on both axes
- Identify the two most important competitive dimensions from the memo and create a 2x2:
  - Place company in the winning quadrant (top-right)
  - Place named competitors in other quadrants with brief labels
- If memo lists competitor categories (e.g., "traditional robots", "humanoid robots"), use those groupings
- Example axes: Accuracy vs Flexibility, Precision vs Adaptability, Cost vs Performance

**S{N}: Competitive Detail Table (optional)**
```
<!-- slide
layout: table
tag: "Competitive Analysis"
source: "/1 source for each competitor spec"
-->
```

- Only if memo provides specific competitor specs or metrics for comparison
- Table columns: company names vs key performance dimensions
- Bold or highlight the company's superior metrics

**S{N}: Customer Validation / Traction**
```
<!-- slide
layout: content
pattern: testimonials
tag: "Customer"
-->
```

- Title: sentence highlighting the strongest proof point
- Structure as paired blocks:
  - **Block 1**: 3-4 bold-lead bullets of evidence, then attribution:
    - "**{Name}**, {Title}, {Company}"
  - **Block 2** (if available): second reference/customer with their evidence + attribution
- Key metrics to highlight: yield rate, replacement ratio, payback period, unit commitments
- If memo has no named references, use `pattern: highlights` instead and present traction metrics as callout statements

**S{N}: Timeline (optional)**
```
<!-- slide
layout: content
pattern: timeline
tag: "Timeline & Future Plan"
-->
```

- Only if memo describes company milestones chronologically
- Year markers with key events at each stage
- Include forward-looking milestones if memo provides them

---

### Section: Team, Financials & Valuation (1 divider + 5-7 content slides)

**S{N}: Section divider**
```
<!-- slide
layout: divider
-->
Team, Financials & Valuation
```

**S{N}: Team**
```
<!-- slide
layout: content
tag: "Team"
-->
```

- Title: sentence highlighting team's strongest credential
- For each key person (CEO, CTO, key leaders):
  - **Name, Degree — Title** as header
  - Bulleted credentials: patents, prior companies, exits, education
- Board of Directors section if mentioned in memo
- Include team composition stats if available (e.g., "1/3 of 24 employees hold PhDs")

**S{N}: Financial Projections**
```
<!-- slide
layout: content
pattern: sidebar
tag: "Financial Projection"
source: "Company information and {firm} projections"
-->
```

- Title: sentence with key financial milestone (e.g., "Projected to breakeven in 2027")
- **Main body**: Revenue/expense/EBITDA table by year

| In US$ M | 2024E | 2025F | 2026F | ... |
|----------|-------|-------|-------|-----|
| Units sold | ... | ... | ... | ... |
| Revenue | ... | ... | ... | ... |
| Expenses | ... | ... | ... | ... |
| EBITDA | ... | ... | ... | ... |
| % margin | ... | ... | ... | ... |

- **Sidebar callout**: Pricing model details (unit price, recurring fees, service model)
- Include CAGR comparison if memo mentions it

**S{N}: Valuation**
```
<!-- slide
layout: content
tag: "Valuation"
-->
```

- Title: sentence stating whether valuation is reasonable with the number
- List each valuation method from memo with its resulting range
- Highlight the pre-money valuation as a reference line
- Footnotes explaining methodology for each method

**S{N}: Returns**
```
<!-- slide
layout: content
tag: "Return"
-->
```

- Title: sentence with IRR and cash-on-cash headline
- Investment summary table:

| | Value |
|---|---|
| Investment | {amount} |
| Post-money at entry | {value} |
| Exit price (Year N) | {value} |
| Entry stake | {%} |
| Exit stake (after dilution) | {%} |

- Cash flow row: Year 0 through Year N with IRR and COC

**S{N}: Cap Table (if data available)**
```
<!-- slide
layout: table
tag: "Cap Table"
-->
```

- Title: sentence with resulting ownership stake
- Full shareholder table: name, role, share classes held, before %, after %
- Note any pro-forma assumptions

**S{N}: Key Terms (if data available)**
```
<!-- slide
layout: table
tag: "Key Terms"
-->
```

- Title: sentence summarizing terms posture
- Terms table:

| Term | Detail |
|------|--------|
| Valuation | {pre-money / post-money} |
| Securities & round size | {instrument, amount} |
| Investment | {amount, resulting stake} |
| Investor rights | {protections, preferences} |

**S{N}: Investment Criteria Scorecard**
```
<!-- slide
layout: table
tag: "Investment Criteria"
-->
```

- Title: "Investment criteria: {Company}"
- Default 6-criteria scorecard (configurable — if user provides a different framework, use that):

| Criteria | Assessment |
|----------|-----------|
| Strategic Fit | {how investment fits fund thesis/pillars} |
| 1. Market size and scalability | {market size, growth drivers, scalability potential} |
| 2. Competitive edge | {moat, IP, technical differentiation} |
| 3. Team experience | {founder credentials, track record, team composition} |
| 4. Revenue / profit potential | {traction proof, revenue model, growth trajectory} |
| 5. Valuation / Exit & Return | {valuation reasonableness, expected IRR/COC, exit prospects} |
| 6. Risk Mitigants | {top risks identified + corresponding mitigants} |

Each cell: 2-4 sentences synthesized from the memo. Do not add judgments beyond what the memo states.

---

### Unmapped Memo Sections

After mapping memo content to the defined slide structure above, check for any remaining memo sections that weren't covered. For each:
- Create a `content` slide with an appropriate layout pattern
- Place it in the most logical position within the deck flow (e.g., a regulatory section after Market, a go-to-market section after Product)
- Use the same formatting conventions (sentence-form titles, bold-lead bullets, source citations)
- Tag with the closest matching section label, or create a descriptive tag if none fits

These slides follow the same content rules as the rest of the deck — memo content only, no invented analysis.

---

### Appendix (1 divider + 0-4 content slides)

**S{N}: Appendix divider**
```
<!-- slide
layout: appendix-header
-->
Appendix
```

**Comps tables** — include only if memo references comparable companies for valuation. Each as a `layout: table` slide:

- IPO Comps: Company, Description, Deal Date, Deal Size, Valuation, Revenue, Val/Revenue multiple
- M&A Comps: Company, Description, Deal Date, Deal Value, Revenue, Val/Revenue multiple
- Trading Comps: Company, Description, Exchange, Enterprise Value, Revenue, EV/Revenue multiple

Include median/average summary row at bottom of each table.

**Additional reference slides** — for any other structured data in the memo that supports the thesis but doesn't fit in the main body (e.g., product category taxonomy, patent list, customer pipeline detail).

---

## Content Rules

### Title Writing
Every content slide title MUST be a **sentence-form takeaway**, not a label. The title IS the key message of the slide.

- BAD: "Market Overview"
- GOOD: "The robotics market for precision manufacturing is estimated at US$ 18B today, growing at 11.5% CAGR"
- BAD: "Team"
- GOOD: "Founded and led by serial entrepreneurs with proven success in deep technology ventures"
- BAD: "Financial Projections"
- GOOD: "Based on our projections, the company is forecasted to breakeven in 2027"

Exceptions: Investment criteria slide uses "Investment criteria: {Company}" label. Divider slides use section names only.

### Bold-Lead Bullets
The primary content formatting pattern. First phrase is **bold** (the claim or label), followed by regular text (the evidence or detail):

```
**Labor shortage** Global shortfall of labor (China projected to face 25M worker shortfall by 2030), coupled with rising labor costs
```

```
**Achieved 99.5% production yield rate** in precision manufacturing at Foxconn's facility, outperforming global competitors (Fanuc, ABB)
```

Use this pattern for: market drivers, product capabilities, competitive advantages, traction evidence, risk factors, risk mitigants.

### Key Numbers and Names
Bold all:
- Dollar figures: **US$ 18B**, **$350M**
- Percentages that matter: **99.5% yield rate**, **93% IRR**
- Company names on first mention in each slide: **Foxconn**, **Lam Research**
- Named people: **Dr. Zheng Xu**
- Key specs: **22um accuracy**, **409 FPS**

### Content Density
- Each slide: ONE clear message supported by 3-6 data points
- Tables for structured data (financials, comps, terms, cap table, specs comparison)
- Bold-lead bullets for evidence and arguments
- Short paragraphs (2-4 sentences) only for exec summary
- No bullet lists longer than 6 items per slide

### What NOT to Add
- No data, claims, or analysis not in the source memo
- No market research beyond what's stated
- No competitor information beyond what's mentioned
- No financial projections beyond what's provided
- No qualitative judgments the memo doesn't make
- If the memo lacks content for a slide category, skip that slide entirely — do not pad with generic statements

### Handling Sparse Memos
If the memo is short or lacks detail for certain sections:
- **Always produce**: Title, Exec Summary, at least 1 Market slide, at least 1 Product slide, Team, Investment Criteria
- **Skip if no data**: Comps, Cap Table, Technical Deep-Dive, Timeline, Competitive Detail Table, Key Terms
- **Minimum viable deck**: 12-15 slides (title + exec summary + 2 market + 2 product + team + financials + valuation + returns + criteria + appendix divider)

## Rendering

The skill produces the slide-spec markdown. Rendering to PPTX is done on the fly — the agent reads the slide-spec + style guide from `assets/` and writes a tailored python-pptx script for each deck.

Style templates and example decks live in `assets/`:
- `assets/style-pptx.md` — visual style config (colors, fonts, spacing, layout rules)
- `assets/eBots_presentation.pptx` — reference deck (26 slides, eBots "Project Robot"). Read this to understand slide master layouts, theme colors, and visual conventions that `style-pptx.md` describes. The renderer should match this deck's look and feel.
- `assets/aiconic-logo.jpg` — AIconic Ventures firm logo. Place on the title slide (top-left or per reference deck positioning).

This separation means:
- Changing content/structure → edit SKILL.md
- Changing visual style → edit `assets/style-pptx.md`
- Reference deck for visual conventions → `assets/eBots_presentation.pptx`
- Firm logo → `assets/aiconic-logo.jpg`

## Process

### Slide Spec
1. Read the memo file (handle PDF, DOCX, MD, HTML input)
2. Extract all content and mentally map each piece to the slide structure
3. Determine which optional slides have sufficient memo content to justify inclusion
4. Write each slide block in the slide-spec format, following the sequence above
5. **Verify**: every memo section is accounted for — if any content doesn't map to the defined slide structure, create additional slides per the "Unmapped Memo Sections" rule
6. **Verify**: every claim in the slides traces back to the memo — no invented content
6. **Verify**: every slide title is sentence-form (except criteria + dividers)
7. **Verify**: financial numbers match memo exactly (cross-check all figures)
8. Write the slide-spec markdown file

### Slide Advisory
9. Review the slide spec critically — as an experienced IC presenter, not just a formatter
10. For each slide, assess: does the audience understand THIS before moving to the NEXT?
11. Identify where visuals (charts, diagrams, matrices) would replace or strengthen text
12. Flag potential IC questions that the deck doesn't address
13. Propose appendix items — research independently where needed (this is the one place the skill goes beyond the memo)
14. Write the advisory file

### Rendering
15. If rendering requested, read `assets/style-pptx.md`, write a tailored python-pptx script for this deck, and run it

## Slide Advisory Template

```markdown
# {Company Name} — Slide Advisory

## Narrative Flow Assessment
How well does the deck build the IC's understanding slide by slide?
- Does the story arc work? (problem → solution → proof → ask)
- Where might the audience lose the thread?
- Which slides could be reordered for better impact?
- Are there logical leaps that need bridging slides?

## Visual Enhancement Recommendations
For each slide where a visual would strengthen the message:
- **S{N}: {slide title}**
  - Current: {what's there now — text, bullets, table}
  - Recommended: {chart type / diagram / visual and why}
  - Example: {brief description of what the visual would show}

Common opportunities:
- Market sizing → waterfall or funnel chart (TAM → SAM → SOM)
- Revenue trajectory → line chart with projections
- Competitive positioning → 2x2 matrix or radar chart
- Timeline/milestones → horizontal timeline graphic
- Unit economics → stacked bar or bridge chart
- Team → headshot grid with key credentials

## Potential IC Questions & Gaps
Questions an IC member might ask that the deck doesn't address:
- {Question} — which slide should address this, what's missing
- {Question} — ...

## Content Strengthening
Specific slides where the argument could be stronger:
- **S{N}: {slide title}** — {what's weak and how to fix it}
- ...

## Appendix Recommendations
Additional slides that would strengthen the deck. Research independently where the memo doesn't provide the data:
- **Proposed: {slide title}** — {what it would contain, why it matters}
  - Source: {memo section / independent research needed}
- ...

## Data Accuracy Flags
Any numbers, claims, or assertions in the memo that seem inconsistent, outdated, or need verification:
- {claim} — {concern}
- ...
```

## Quality Checklist

### Slide Spec
- [ ] Every content slide title is sentence-form takeaway (not a label)
- [ ] No content invented beyond the memo
- [ ] All section tags are consistent with the tag vocabulary
- [ ] All financial numbers match the memo exactly
- [ ] Bold-lead bullet pattern used consistently for evidence/claims
- [ ] Key numbers and names are bolded
- [ ] Slide count is in 12-26 range
- [ ] Executive summary is self-contained (readable as a standalone one-pager)
- [ ] Source citations present on slides with external data claims
- [ ] Investment criteria assessments sourced only from memo content

### Slide Advisory
- [ ] Narrative flow assessment considers audience perspective, not just content completeness
- [ ] Visual recommendations are specific (chart type, what data to show), not generic ("add a chart")
- [ ] IC questions are realistic (things a partner would actually ask)
- [ ] Appendix recommendations include research where the memo has gaps
- [ ] Data accuracy flags cite specific numbers/claims, not vague concerns
