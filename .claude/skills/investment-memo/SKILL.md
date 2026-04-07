---
name: investment-memo
description: "Transform an investment memo into a structured slide deck — reads memo (PDF/DOCX/MD/HTML), produces slide-spec markdown, then renders to PPTX"
model: opus
forked: true
---

# Investment Memo to Slides

You are transforming a VC investment memo into presentation slides for the investment committee. The memo is the **single source of truth** — no additional research, no new analysis. Extract, restructure, and present what's in the memo.

**Generalization over reproduction.** The guide and reference slides capture the **structural logic** of each layout — not deal-specific details. When applying them, extract the reusable pattern (two-column comparison, data table with callout) and adapt it to the current memo's content. Don't try to reproduce the reference deck pixel-by-pixel. Find the right level of constraint: too loose → inconsistent output, too tight → only works for one deal. Simplify iteratively until the pattern reliably produces correct, professional slides for any memo.

## Inputs

**Required:**
- Investment memo file (PDF, DOCX, MD, or HTML) — provided by user
- Entity name and deal codename (e.g., "eBots", "Project Robot")

**Optional:**
- Additional notes or supplementary materials from user
- Custom investment criteria framework (defaults to standard 6-criteria scorecard)

## Architecture

| File | Role | What to expect |
|------|------|----------------|
| **`assets/guide.md`** | Slide guide | Everything about what to present and how. Global config, design principles, per-slide specs (content handling + design rules + shape mapping), narrative arc, checklists. The single reference for building a deck. |
| **`assets/reference.pptx`** | Slide templates | 14 slides: 4 structural (title, exec summary, divider, appendix) + 1 S4 base + 8 S4 patterns + 1 investment criteria. The renderer clones slides from this file by index. |
| **`assets/eBots_presentation.pptx`** | Example output | Complete 26-slide eBots deck. Visual reference of a finished deck. Not used by the renderer. |
| **`assets/aiconic-logo.jpg`** | Firm logo | Embedded in reference.pptx title slide. |
| **`assets/examples/`** | Worked examples | Source memo → slide spec pairs showing the complete input→output transformation. |

## Output

The skill always produces a PPTX as its final output. The slide-spec markdown (Step 1) is an intermediate artifact written *with the PPTX in mind* — it scaffolds the content and pattern decisions that the renderer needs. The advisory (Step 2) and the final PPTX (Step 3) all flow from it.

### Step 1: Slide Spec (intermediate)
Write to: `output/investment-memo/investment-memo-{slug}-v{round}.md`

A structured markdown file mapping each slide of the deck — its reference template, content, pattern, and shape fills. Generated to drive PPTX rendering, not as a standalone deliverable.

### Step 2: Slide Advisory
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

### Step 3: PPTX (final output)
- PPTX: `output/investment-memo/investment-memo-{slug}-v{round}.pptx`
- The agent invokes `document-skills:pptx` to clone slides from `assets/reference.pptx` and fill them per the slide spec from Step 1. See [Rendering](#rendering) for details.

## Slide Spec Format

Each slide is a block starting with `## S{N}: {slide_title}` and containing metadata in a `<!-- slide -->` comment, followed by the slide content in markdown.

```
## S1: Investment Memo: Project Robot
<!-- slide
slide: S1
-->

# Investment Memo: Project Robot
_March 2025_
```

### Metadata fields

- `slide` — Which reference slide to clone: `S1`, `S2`, `S3`, `S4`, `S5`, `S6`. See guide.md for what each does.
- `pattern` — For S4 content slides only. Which body layout to use: `standard-content`, `two-column`, `highlights`, `testimonials`, `sidebar`, `timeline`, `matrix`, `data-table`. See guide.md for when to use each.
- `tag` — Section pill badge (e.g., "Market", "Company"). See tag vocabulary in guide.md.
- `source` — Source citation line. Use numbered references: `/1 description /2 description`
- `note` — Footnote line

Example:
```
<!-- slide
slide: S4
pattern: two-column
tag: "Market"
source: "/1 Global Workforce Crisis report"
-->
```

## Process

Read `assets/guide.md` before starting.

### Step A: Preparation

Read the guide. Understand what slides exist (S1-S6), what content each handles, and the available S4 patterns. This is the lens through which you'll read the memo.

### Step B: Memo Analysis

Read the memo fully. With the guide in mind, match memo content to slides:

1. **First pass** — read without mapping. Note section structure, key data points, where depth vs. brevity signals importance.
2. **Second pass** — match content to slides. For each section or topic in the memo, identify which slide (and for S4, which pattern) best presents it. Some content maps directly (deal terms → S4 data-table). Some is synthesized from scattered fragments (timeline from dates throughout the memo, competitive matrix from descriptions across sections).
3. **Assess density** — thin content (1-2 points): fold into an adjacent slide. Normal (3-6 points): one slide. Dense (7+ points): split across slides or use a high-density pattern.

### Step C: Deck Composition

1. Place structural slides in fixed positions: S1 first, S2 second, S5 near end, S6 last.
2. Group matched content into sections per the narrative arc in guide.md. Add S3 divider slides before each section.
3. For each S4 content slide, pick the pattern that matches the content's shape (guide.md describes what each pattern handles and when to use it).
4. Handle unmatched content — use S4 `standard-content` as fallback, pick the closest tag, place logically in the arc.

### Step D: Verification

Run the checklist in guide.md (content, design, and process sections).

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

## Potential IC Questions & Gaps
Questions an IC member might ask that the deck doesn't address:
- {Question} — which slide should address this, what's missing

## Content Strengthening
Specific slides where the argument could be stronger:
- **S{N}: {slide title}** — {what's weak and how to fix it}

## Appendix Recommendations
Additional slides that would strengthen the deck:
- **Proposed: {slide title}** — {what it would contain, why it matters}
  - Source: {memo section / independent research needed}

## Data Accuracy Flags
Numbers, claims, or assertions that seem inconsistent, outdated, or need verification:
- {claim} — {concern}
```

## Rendering

The skill produces the slide-spec markdown. Rendering to PPTX is delegated to **`document-skills:pptx`** — Claude's official PPTX skill, which knows how to clone slides, manipulate shapes, preserve theme/layout inheritance, and avoid the common corruption pitfalls (duplicate IDs, broken rels, missing namespaces).

**How it works:**
1. The agent reads the slide spec, `assets/guide.md`, and `assets/reference.pptx`
2. The agent invokes `document-skills:pptx` with the task: clone the appropriate reference slide for each deck slide, fill the editable shapes per the slide spec, then remove the original 17 reference slides from the output file
3. The agent saves the resulting PPTX to `output/investment-memo/investment-memo-{slug}-v{round}.pptx`

**Why delegate to document-skills:pptx:** It is maintained by Claude, handles the OOXML edge cases that this skill kept hitting (auto_size text frames, duplicate cNvPr IDs, layout rel retargeting, font size inheritance), and frees this skill to focus on the *content* mapping rather than the *file format* mechanics.

**What this skill provides as input to document-skills:pptx:**
- `assets/reference.pptx` — the template to clone from
- `assets/guide.md` — global config (colors, font sizes, spacing), shape positions, pattern descriptions
- The slide spec markdown — the per-slide content and pattern selection

**What document-skills:pptx is responsible for:**
- Opening reference.pptx and cloning slides by index
- Filling editable shapes (placeholders, text boxes, tables) with content
- Preserving theme, layout inheritance, and shape styling
- Producing a clean PPTX that opens in PowerPoint without repair prompts

