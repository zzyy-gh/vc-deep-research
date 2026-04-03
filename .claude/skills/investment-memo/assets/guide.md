# Slide Guide

The complete reference for the investment-memo skill. Covers **what to present**, **how to present it**, and **how to arrange it** — all organized around the slides in reference.pptx.

**How to read this file:**
1. **Global Config** — visual settings inherited by all slides
2. **Design Principles** — rules governing every slide
3. **Slides** — one entry per reference.pptx slide. Each describes: what content it handles, how to identify that content in a memo, how to extract and structure it, editable shapes for the renderer, and design rules. S4 (content slide) has sub-entries for each pattern.
4. **Narrative Arc** — how slides compose into a deck
5. **Handling Unexpected Content** — what to do when memo content doesn't match any slide
6. **Checklist** — verification for the finished deck

**How the agent uses this:** Read this guide, then read the memo with the slides in mind. Match memo content to slides. Arrange per the narrative arc. Write the slide spec.

**How to extend:** Add a new pattern under S4, or add a new structured slide entry if reference.pptx gains a new template slide.

---

## Global Config

### Slide Dimensions

```yaml
width: 13.3in    # 12192000 EMU
height: 7.5in    # 6858000 EMU (widescreen 16:9)
```

### Color Palette

```yaml
colors:
  background: "#FFFFFF"
  text_primary: "theme"
  text_secondary: "#393335"     # Callout box text
  accent_teal: "#00A0AC"        # People names, team highlights
  accent_yellow: "#FFFF00"      # Emphasis on dark backgrounds
  link_blue: "#0563C1"          # Hyperlinks
  black: "#000000"              # Sidebar labels
  section_tag_bg: "theme"
  section_tag_text: "theme"
```

### Base Typography

```yaml
fonts:
  title_slide:
    heading: { size: 24pt, bold: false }
    date: { size: 18pt, bold: false }
  divider:
    heading: { size: 32pt, bold: true }
  content_slide:
    title: { size: 18-22pt, bold: false }
    body: { size: 14pt, bold: false }
    body_bold_lead: { size: 14pt, bold: true }
    subheader: { size: 16pt, bold: true }
    callout_box: { size: 12pt, bold: true, color: "#393335" }
    source: { size: 8-10pt, bold: false }
    footnote: { size: 7-8pt, bold: false }
  table:
    header: { size: 12pt, bold: true }
    cell: { size: 12pt, bold: false }
  team:
    name: { size: 14pt, bold: true, color: "#00A0AC" }
    credentials: { size: 11pt, bold: false }
  section_tag:
    text: { size: 12pt, bold: true }
```

### Element Spacing

```yaml
margins:
  left: 0.47in
  right: 0.47in
  top: 0.3in
  bottom: 0.5in
title_area:
  top: 0.3in
  height: 1.2in
body_area:
  top: 1.6in
  bottom: 0.8in
source_line:
  bottom: 0.15in
  left: 0.47in
section_tag:
  bottom: 0.15in
  right: 0.47in
  padding: 4pt
  corner_radius: 8pt
```

### Tag Vocabulary

Bottom-right pill badges. The renderer accepts any tag string — unfamiliar tags use the same style.

```yaml
tags:
  - "Executive Summary"
  - "Market"
  - "Company"
  - "Competitive Analysis"
  - "Customer"
  - "Timeline & Future Plan"
  - "Team"
  - "Financial Projection"
  - "Valuation"
  - "Return"
  - "Cap Table"
  - "Key Terms"
  - "Investment Criteria"
  - "Go-to-Market"
  - "Risk"
  - "Regulatory"
  - "Unit Economics"
```

### Slide Numbers
- Present on all slides except S1
- Sequential numbering starting from 2

---

## Design Principles

### Correctness Over Ambition

A simpler but correct slide is always better than an ambitious but broken one. When in doubt:
- Use `standard-content` rather than forcing a complex pattern that doesn't quite fit
- Slides needing truly custom visuals (architecture diagrams, complex charts) should use a standard pattern and note the enhancement opportunity in the advisory

### Presenting Gaps Professionally

When content is missing but the slide element is mandatory:
- Use the same font, size, and style as normal content
- State the gap in neutral language: "Source memo does not address [topic]"
- If partial information exists: "Based on available information, [partial]. Full details not provided."
- Never: leave blank, write "N/A" or "TBD", use dashes, italicize or gray out

### Content Overflow

Content must fit the slide without overlapping elements or running off-screen. The body area is ~4.8 inches tall at 14pt body text. When content approaches the limit:

1. **Wrap to next line** — long bullets naturally wrap within the text box. Account for this when counting how many items fit.
2. **Split across slides** — if the content for one topic needs more space, create a second slide with the same pattern and tag. Continue the content.
3. **Move to appendix** — lower-priority detail (detailed comps, extended data) can move to appendix slides.
4. **Never shrink fonts** below the minimums in Global Config to fit more. Overflow means the content needs restructuring, not smaller text.
5. **Never remove content** from the memo to fit — all memo content must be accounted for somewhere in the deck.

### Presentation Craft

Every slide answers one question for the IC: "What do I need to understand here?" The title states the answer. The body provides the evidence.
- The slide title IS the message — not a label. "Market Overview" tells the audience nothing. "The robotics market for precision manufacturing is estimated at US$ 18B today" tells them everything.
- One message per slide. If you have two takeaways, you need two slides.
- The audience reads top-to-bottom, left-to-right. Place the most important information where the eye lands first.
- Every claim needs evidence on the same slide. Don't make the audience remember something from a previous slide.

### Information Hierarchy

Within each slide, content has three tiers:
1. **Title** — the takeaway. The one thing the audience should remember.
2. **Primary content** — the evidence supporting the title. Bold-lead bullets, table data, callout statements.
3. **Supporting content** — source lines, footnotes, methodology notes. Present but not prominent.

Don't promote supporting content to primary tier (e.g., don't make source citations into bullet points). Don't demote primary content (e.g., don't bury a key metric in a footnote).

### Data Density

Each slide should feel complete but not crowded:
- **Content slides**: 3-6 data points. Each point: one bold-lead bullet (1-2 lines).
- **Tables**: up to 15 rows × 9 columns. If larger, split or move to appendix.
- **Callout boxes** (highlights): exactly 3-4. Each: 1-2 sentences.
- **Whitespace matters** — a slide with 4 well-spaced points reads better than 8 crammed ones.
- When in doubt, split. Two clear slides beat one dense one.

### Visual Hierarchy

Guide the viewer's eye through consistent visual structure:
- **Bold-lead pattern** — first phrase bold (the claim), rest regular (the evidence). This is the primary formatting pattern across all content slides.
- **Subheaders** — 16pt bold, used to label columns or sections within a slide (e.g., "SUPPLY-SIDE", "HIGHLIGHTS").
- **Key numbers and names** — always bold: dollar figures (**US$ 18B**), percentages (**99.5% yield**), company names on first mention (**Foxconn**), people (**Dr. Zheng Xu**), specs (**22um accuracy**).
- **Tags** — bottom-right pill badge identifies the section. Consistent across slides in the same section.
- **Source lines** — small text at bottom. Present but never competing with the body content.

### Emphasis & Distillation

The agent's job is to distill, not transcribe. A 5-page memo becomes a 20-slide deck not by splitting it into 20 pieces, but by restructuring it for the IC's decision-making process:
- **Reframe** — the memo's flat bullet list of "growth drivers" becomes a supply-side vs. demand-side two-column comparison that reveals the dynamic.
- **Synthesize** — dates scattered across the memo become a coherent timeline. Competitor descriptions become a positioning matrix.
- **Select** — not every memo detail deserves a slide. Pick the data points that support the investment thesis. The rest can go in the advisory as potential appendix items.
- **Never invent** — distillation means choosing and restructuring, not adding. Every claim on a slide must trace back to the memo.

---

## Slides

One entry per reference.pptx slide.

### Fixed vs. Adaptive Structure

**Fixed structure** (S1, S2, S5, S6) — layout and shapes don't change. The agent fills content into existing shapes. Even so, content must be formatted smartly to prevent overflow — wrap text, keep bullets concise, ensure table cells are readable.

**Adaptive structure** (S3, S4 patterns) — the agent adjusts the layout to fit the content. The reference slide shows the *typical* layout, not a rigid mold. Adapt intelligently: use more or fewer bullets, adjust column balance, combine thin content or split dense content, switch patterns if the content's shape changes. The pattern is a guide — use judgment.

### Reference Slide Index

The renderer clones slides from reference.pptx by index. S4 pattern slides are grouped together.

| Slide spec | Pattern | ref index | Structure | Description |
|-----------|---------|-----------|-----------|-------------|
| `slide: S1` | — | 1 | Fixed | Title |
| `slide: S2` | — | 2 | Fixed | Executive Summary |
| `slide: S3` | — | 3 | Fixed | Divider |
| `slide: S4` | (base) | 4 | — | Content base (not cloned directly) |
| `slide: S4` | `standard-content` | 5 | Adaptive | Bold-lead bullets |
| `slide: S4` | `two-column` | 6 | Adaptive | Two parallel columns |
| `slide: S4` | `highlights` | 7 | Adaptive | Callout boxes |
| `slide: S4` | `data-table` | 8 | Adaptive | Full-width table |
| `slide: S4` | `sidebar` | 9 | Adaptive | Table + callout |
| `slide: S4` | `testimonials` | 10 | Adaptive | Evidence blocks + attribution |
| `slide: S4` | `timeline` | 11 | Adaptive | Year markers + events |
| `slide: S4` | `matrix` | 12 | Adaptive | 2x2 positioning grid |
| `slide: S5` | — | 13 | Fixed | Investment Criteria |
| `slide: S6` | — | 14 | Fixed | Appendix |

---

### S1: Title Slide

**Structure:** Fixed
**Used:** Once (always first)

**Slide spec metadata:**
```
<!-- slide
slide: S1
-->
```

**What it presents:** Deal name and date. Sets the context for the entire deck.

**How to extract:** Use entity name / codename from user input. Date from memo or current date. Format: "Investment Memo: {agenda nickname}" and "{Month Year}".

**Editable shapes:**
| Shape | Name in PPTX | Type | What to fill |
|-------|-------------|------|-------------|
| Title | `Title 1` | Placeholder (idx 0) | "Investment Memo: {agenda nickname}" |
| Date | `Title 1` | Text box (not a placeholder — match by shape type TEXT_BOX) | "{Month Year}" |
| Logo | `Picture 2` | Picture | Keep as-is |

Note: Two shapes share the name `Title 1`. Distinguish by type: the placeholder is the main title, the text box is the date line.

**Design rules:**
- Heading centered vertically (upper third), 24pt
- Date below heading, 18pt
- Slide number hidden

---

### S2: Executive Summary

**Structure:** Fixed
**Used:** Once (always second)

**Slide spec metadata:**
```
<!-- slide
slide: S2
-->
```

**What it presents:** The "one-pager" — an IC member who reads only this slide should understand the deal.

**How to extract:** Synthesize from the memo's opening and deal terms sections. Structure as:
1. Company background (what they do, founded when, key technology, target market)
2. Founder/team headline credentials
3. Key traction proof point
4. **Investment Opportunity** — prior round details, current round, proposed investment

The Investment Opportunity section is **always present**. If the memo lacks explicit deal terms, synthesize from fragments (round size, valuation, investors mentioned anywhere). If truly absent, state: "Investment opportunity details not provided in source memo."

**Editable shapes:**
| Shape | Name in PPTX | What to fill |
|-------|-------------|-------------|
| Nickname | `Rectangle 4` | Agenda nickname |
| Body | `Rectangle 5` | Background, facts, investment opportunity |
| Agenda sidebar | `Rectangle 10`, `Rectangle 11` | "Agenda:" + section list matching the deck |

**Design rules:**

Body (Rectangle 5) paragraph structure — 7 paragraphs at 14pt, dense prose:
1. **Company background** — what they do, founded when, key technology/product, target market. Bold key terms (company name, technology names).
2. **Founder/team** — headline credentials. Bold names, prior exits, key titles.
3. **Key traction** — strongest proof point. Bold metrics (yield rate, customer names, order numbers).
4. **"Investment Opportunity"** — bold header, standalone line.
5. **Prior round** — size, valuation, lead investors. Bold dollar figures and investor names.
6. **Current round** — what's being raised, terms, participation.
7. **Proposed investment** — firm's proposed amount, resulting stake.

Nickname box (Rectangle 4): agenda nickname in bold, 14pt.

Sidebar: "Agenda:" lists the actual sections in the deck. "Background & Supporting Fact:" is a fixed label. Update the agenda list to match the deck's divider sections.

Title: "Executive summary" — fixed text, 24pt.

---

### S3: Divider

**Structure:** Fixed
**Used:** Multiple times (before each major section)

**Slide spec metadata:**
```
<!-- slide
slide: S3
-->
```

**What it presents:** Section transition — gives the audience a mental reset before a new topic.

**How to extract:** Section names come from the narrative arc groupings (e.g., "Market", "Product, Traction & Revenue Model", "Team, Financials & Valuation").

**Editable shapes:**
| Shape | Name in PPTX | What to fill |
|-------|-------------|-------------|
| Section name | `TextBox 5` | Section name |

**Design rules:**
- Section name only, 32pt bold
- Dark left panel (Rectangle 4) — keep as-is
- No other content

---

### S4: Content Slide

**Structure:** Adaptive
**Used:** Multiple times (the workhorse — most slides in the deck)

The content slide provides a title bar, line separator, slide number, and tag badge. The **body area** below the title is built according to the selected pattern.

**Fixed shapes (always present):**
| Shape | Name in PPTX | Notes |
|-------|-------------|-------|
| Title | `Title 1` (placeholder 0) | Sentence-form takeaway. Width is 9.80in (right edge at 10.47in), leaving clearance for the tag badge at 10.66in. |
| Slide number | `Slide Number Placeholder 2` | Auto-filled |
| Tag badge | `Rectangle: Rounded Corners 43` | Tag text from metadata. Position: (10.66in, 0.05in). |
| Logo | `Picture 2` (on layout) | Firm logo at (11.89in, 0.48in). Inherited from layout — do not modify. |

**Slide spec metadata:** Always `slide: S4` plus a `pattern:` field.

#### Patterns

Each pattern handles specific kinds of memo content. The agent picks the pattern that best matches the content's shape.

**Source lines:** Only include `source:` in the slide metadata when the memo explicitly cites external sources for the claims on that slide. If all content comes from the memo itself (company information, internal projections), omit the source line. The advisory should flag slides where external sourcing would strengthen the claims.

**Pattern flexibility:** The patterns below describe typical use cases. In most cases, follow the guide's recommendations. In rare cases where the content obviously fits a different pattern better, the agent should use judgment and deviate — the guide is a harness, not a straitjacket.

---

##### standard-content

```
<!-- slide
slide: S4
pattern: standard-content
tag: "{tag}"
-->
```

**Pattern:** Bold-lead bullets with a sentence-form title. The default layout for presenting a message supported by evidence points.

**Good for:** Any content that is primarily a claim supported by 3-6 evidence points in prose form. The fallback when no specialized pattern fits.

**Typical content:** Market sizing with bullet evidence. Valuation methods + ranges. Team bios and credentials. Technology pillars with specs per pillar. Go-to-market strategy. Risk factors. Any prose-with-data-points content.

**How to extract:**
- Title: sentence stating the key takeaway — not a label
- Body: 3-6 **bold-lead bullets** (bold claim phrase + supporting detail)
- For team slides: name + degree as header, credentials as bullets, person names in accent teal
- For risk slides: each risk as a bold-lead bullet with mitigant as the supporting detail
- For market slides: each driver/trend as a bold-lead bullet with data evidence

**Density:** 3-6 bullets. If more, split into two slides.

**When NOT to use:** When content has a clear structural shape (comparison, timeline, table).

---

##### two-column

```
<!-- slide
slide: S4
pattern: two-column
tag: "{tag}"
-->
```

**Pattern:** Two equal-width columns, each with a subheader and bold-lead bullets. Reveals a dynamic by placing two sides in parallel.

**Good for:** Any content that naturally divides into two named halves — opposing forces, contrasting approaches, paired categories, before/after comparisons.

**Typical content:** Market drivers (supply vs. demand). Risks vs. mitigants. Current limitations vs. needed capabilities. Problem vs. solution framing.

**How to extract:**
- Title: sentence stating the core tension or dynamic
- Two columns each with a **subheader** (16pt bold, e.g., "SUPPLY-SIDE", "DEMAND-SIDE", "RISKS", "MITIGANTS") followed by bold-lead bullets
- The memo may list items flatly — **reframe** into a two-sided structure that reveals the underlying dynamic

**Density:** 2-4 bullets per column. If columns are unbalanced (6 vs. 2), use standard-content instead.

**Reference:** S4 in eBots deck (market drivers — supply-side vs. demand-side)

---

##### highlights

```
<!-- slide
slide: S4
pattern: highlights
tag: "{tag}"
-->
```

**Pattern:** "HIGHLIGHTS" subheader followed by 3-4 rounded rectangle callout boxes, each a standalone bold statement.

**Good for:** Any content that consists of 3-4 independent, self-contained proof points — each strong enough to stand alone without context from the others.

**Typical content:** Product capabilities as punchy callouts. Key achievements or milestones. Headline metrics that each independently support the thesis.

**How to extract:**
- Title: sentence positioning the overall message
- "HIGHLIGHTS" subheader (16pt bold)
- 3-4 callout boxes — distill each point into one bold statement combining claim + proof (e.g., "22um accuracy at 409 FPS with 99.95% yield rate")
- Select the differentiating items — don't list everything, pick what matters most

**Density:** Exactly 3-4 callout boxes. Each: 1-2 sentences max.

**Reference:** S8 in eBots deck (product highlights)

---

##### testimonials

```
<!-- slide
slide: S4
pattern: testimonials
tag: "Customer"
-->
```

**Pattern:** 1-2 evidence blocks (rounded rectangles) each with bold-lead bullets + a named attribution line.

**Good for:** Any content where specific claims or evidence are attributed to named sources — giving the data a face and credibility.

**Typical content:** Customer validation with named references. Pilot results attributed to specific clients. Advisor endorsements. Partner feedback with quotes.

**How to extract:**
- Title: sentence highlighting the strongest proof point
- 1-2 evidence blocks, each with: 3-4 bold-lead evidence bullets + attribution: "**Name**, Title, Company" in accent teal
- Key metrics to highlight: yield rate, replacement ratio, payback period, unit commitments, ROI figures

**Density:** 1-2 evidence blocks. Each: 3-4 bullets + attribution.

**When NOT to use:** When evidence isn't attributed to specific people — use highlights instead.

**Reference:** S12 in eBots deck (Foxconn and investor references)

---

##### sidebar

```
<!-- slide
slide: S4
pattern: sidebar
tag: "{tag}"
-->
```

**Pattern:** Main content area (~65% left) paired with a rounded rectangle callout (~30% right). Primary + supplement side by side.

**Good for:** Any content where one piece is the main data and another is a compact supporting detail — a table with a methodology note, data with a pricing model, a chart with a key takeaway callout.

**Typical content:** Financial projections table + pricing/business model callout. Data tables with methodology or assumption notes. Revenue model with unit economics summary.

**How to extract:**
- Title: sentence stating the key financial or data takeaway
- Main area (left): typically a table with years as columns, or 4-6 structured bullets
- Sidebar (right): rounded rectangle with bold summary — pricing model, key assumption, methodology note
- Present only what the memo provides — do not project or extend financial data

**Density:** Main: one table or 4-6 bullets. Sidebar: 3-6 lines.

**When NOT to use:** When both pieces are equally important — use two-column.

**Reference:** S16 in eBots deck (financial projections + pricing callout)

---

##### timeline

```
<!-- slide
slide: S4
pattern: timeline
tag: "Timeline & Future Plan"
-->
```

**Pattern:** Horizontal timeline with year markers and event descriptions connected by a visual line.

**Good for:** Any content that is naturally chronological — a sequence of events, milestones, or phases ordered in time.

**Typical content:** Company founding and milestones. Funding history. Product launch roadmap. Historical context leading to current state.

**How to extract:**
- Title: sentence describing the arc from start to present/future
- Gather dates from **throughout the memo** — timeline content is often scattered, not in one section
- Year markers (bold) with 1-2 sentence event descriptions
- Include: founding, key hires, product milestones, customer wins, funding rounds, forward targets

**Density:** 3-7 milestones. Fewer than 3: fold into standard-content. More than 7: summarize.

**Reference:** S13 in eBots deck (company history 2017→2025)

---

##### matrix

```
<!-- slide
slide: S4
pattern: matrix
tag: "Competitive Analysis"
-->
```

**Pattern:** 2x2 grid with labeled axes and named entities positioned in quadrants. The subject company in the winning quadrant.

**Good for:** Any content with two clear dimensions and 4+ named entities to position — reveals relative positioning at a glance.

**Typical content:** Competitive landscape (flexibility vs. accuracy, speed vs. generalization). Market gap framing (current solutions on two axes). Strategic positioning frameworks.

**How to extract:**
- Title: sentence positioning the company as strong on both axes
- Identify the two most important dimensions from the memo
- 2x2 grid with labeled axes at edges
- Named entities placed in quadrants with brief descriptive labels
- Company highlighted in the winning quadrant (distinct color/border)
- If the memo categorizes competitors (e.g., "traditional", "humanoid"), use those groupings

**Density:** 4-8 entities. Axis labels + entity names + brief descriptors.

**When NOT to use:** Fewer than 3 entities or dimensions aren't clear — use standard-content.

**Reference:** S5, S10 in eBots deck (accuracy vs. repeatability, competitive positioning)

---

##### data-table

```
<!-- slide
slide: S4
pattern: data-table
tag: "{tag}"
-->
```

**Pattern:** Full-width table with bold headers. The layout for any inherently tabular data.

**Good for:** Any content that naturally fits rows × columns — structured data needing precise comparison or key-value pairs.

**Typical content:** Deal terms (Term | Detail). Returns/cash flow tables. Cap tables. Competitor spec comparisons. Valuation comps. Key-value summaries.

**How to extract:**
- Title: sentence summarizing the table's key finding
- Full-width table with bold header row
- For key terms: Term | Detail format; use memo's exact legal language — don't paraphrase
- For cap tables: bold the firm's resulting stake
- For returns: bold IRR, cash-on-cash, dollar amounts
- Optional footnotes below the table

**Density:** 4-15 rows, 2-9 columns. Sparse data (2-3 rows): fold into standard-content. Exceeds slide area: split or move to appendix. Data needing commentary: use sidebar instead.

**Reference:** S11, S17-S20 in eBots deck (competitor specs, returns, cap table, key terms)

---

### S5: Investment Criteria

**Structure:** Fixed
**Used:** Once (near end, before appendix)

**Slide spec metadata:**
```
<!-- slide
slide: S5
-->
```

**What it presents:** Investment assessment against a standard framework, synthesized from the entire memo.

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

**Editable shapes:**
| Shape | Name in PPTX | What to fill |
|-------|-------------|-------------|
| Title | `Title 1` (placeholder 0) | "Investment criteria: {Company Name}" |
| Table | `Table 2` | Keep "Key factors for Assessment" (col 0), replace "Comments" (col 1) |
| Tag badge | `Rectangle 7` | Keep as-is |

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

**Structure:** Fixed
**Used:** Once (always last, if appendix content exists)

**Slide spec metadata:**
```
<!-- slide
slide: S6
-->
```

**What it presents:** Start of supplementary reference material.

**How to extract:** Keep as-is. Appendix content slides that follow use S4 patterns (typically data-table for comps).

**Editable shapes:**
| Shape | Name in PPTX | What to fill |
|-------|-------------|-------------|
| Title | `Title 3` (placeholder 0) | "Appendix" (keep as-is) |

---

## Narrative Arc

How slides compose into a deck. Structural slides (S1, S2, S5, S6) have fixed positions. Reusable slides (S3 dividers + S4 content) fill in between.

```
S1:  Title                          ← always first
S2:  Executive Summary              ← always second
S3:  Divider: Market
     S4 content slides (market problem, sizing, gap)
S3:  Divider: Product, Traction & Revenue Model
     S4 content slides (product, deep-dive, competitive, customer validation, timeline)
S3:  Divider: Team, Financials & Valuation
     S4 content slides (team, financials, valuation, returns, cap table, key terms)
S5:  Investment Criteria            ← near end
S6:  Appendix                       ← last (if content exists)
     S4 content slides (comps, overflow)
```

**Section groupings (blueprints):** Each group gets a divider slide. A group is included only if the memo has content for at least one slide in it. If content is too thin for its own group, fold it into an adjacent group.

| Section | Content it covers | Typical Position |
|---------|------------------|-----------------|
| Market | Market problems/drivers, market sizing, market gap | After exec-summary |
| Product, Traction & Revenue Model | Product overview, deep-dive, competitive positioning, customer validation, timeline, go-to-market | After Market |
| Team, Financials & Valuation | Team, financial projections, valuation, returns, cap table, key terms, unit economics | After Product |
| Risk | Risks/mitigants, regulatory landscape | Flexible — before or after Deal Terms |
| Appendix | Comps, overflow content | End |

**When to deviate:** If the memo leads with team/founder story, or the competitive landscape is the central thesis, or the deal is primarily financial — reorder to match the memo's emphasis. The arc is a guide, not a constraint.

---

## Handling Unexpected Content

When memo content doesn't match any slide description above:

1. **Try to fit it into an existing S4 pattern.** Most content can be presented as `standard-content` (bold-lead bullets with a sentence title).
2. **Pick the closest tag** from the vocabulary. If nothing fits, create a descriptive custom tag.
3. **Place it logically** in the narrative arc — where would this content best serve the audience's understanding?
4. **Preserve the memo's framing** — use the memo section heading as the basis for the slide title.

---

## Checklist

### Content
- [ ] Every memo section accounted for — mapped to a slide or explicitly excluded
- [ ] No content invented beyond what the memo states
- [ ] All financial numbers match the memo exactly
- [ ] Structural slides present (S1, S2, S5 if assessment content exists, S6 if appendix content)
- [ ] Gaps handled professionally — mandatory elements never blank

### Design
- [ ] Every S4 content slide title is a sentence-form takeaway (not a label)
- [ ] Bold-lead bullet pattern used consistently
- [ ] Key numbers and names bolded
- [ ] Each slide has ONE clear message supported by 3-6 data points
- [ ] No bullet lists longer than 6 items per slide
- [ ] Source citations on slides with external data claims
- [ ] Tags from the vocabulary (or clearly justified custom tags)
- [ ] Slide count in 12-26 range
- [ ] Pattern selections match the content shape

### Process
- [ ] Read guide before starting
- [ ] Memo read fully before mapping
- [ ] Structural slides in correct positions
- [ ] Section ordering follows narrative arc or has clear rationale for deviation
- [ ] Advisory produced alongside slide spec

---

## Notes

- Visual config derived from the eBots deck (March 2025)
- reference.pptx contains 14 slides (see Reference Slide Index table above)
- reference.pptx is pre-cleaned: no OLE objects, no `<p:tags>` metadata, no orphan-prone relationships. Every slide is safe to clone or delete without producing broken references. Run `.claude/scripts/clean_reference.py` after any manual edits to reference.pptx.
- S4 content slide Title 1 placeholder is 9.80in wide (right edge at 10.47in), leaving clearance for the tag badge at 10.66in and the logo at 11.89in.
- eBots_presentation.pptx in assets/ is a complete example output — not used by the renderer
- `.claude/scripts/build_patterns.py` generates reference.pptx from the eBots deck — run it to regenerate if the reference slides need updating. Follow up with `clean_reference.py` to re-apply the cleanups.
