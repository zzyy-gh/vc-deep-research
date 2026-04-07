---
name: investment-memo
description: "Transform an investment memo into a structured slide deck — reads memo (PDF/DOCX/MD/HTML), produces slide-spec markdown, then renders to PPTX"
model: opus
forked: true
---

# Investment Memo to Slides

Transform a VC investment memo into IC presentation slides. The memo is the **single source of truth** — extract and restructure, don't research or invent.

The guide and reference deck capture the **structural logic** of each layout, not deal-specific details. Adapt the patterns to the memo's content; don't reproduce the reference pixel-by-pixel.

## Inputs

- Investment memo file (PDF, DOCX, MD, HTML)
- Entity name and deal codename
- Optional: supplementary notes, custom criteria framework

## Assets

| File                      | Role                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `assets/guide.md`         | Single reference for building a deck — global config, design principles, per-slide specs, narrative arc, checklists |
| `assets/reference.pptx`   | Slide templates cloned by the renderer                                                                              |
| `assets/examples/`        | Reference source materials — example memo and reference decks the templates were derived from                       |
| `assets/aiconic-logo.jpg` | Firm logo embedded in title slide                                                                                   |

## Outputs

The skill always produces a PPTX. The slide-spec markdown is an intermediate observability artifact — generated so the deck composition can be reviewed, diffed, and corrected before the PPTX is built. It also doubles as the agent's thinking surface while planning.

1. **Slide spec** → `output/investment-memo/investment-memo-{slug}-v{round}.md` — structured markdown listing each slide with its reference template, pattern choice, design plan, content, and notes. For observability and as the agent's planning record.
2. **Advisory** → `output/investment-memo/investment-memo-{slug}-v{round}-advisory.md` — companion doc that goes BEYOND the memo: narrative critique, visual recommendations, IC question gaps, appendix proposals, data flags. The spec stays faithful; the advisory is where critical thinking happens.
3. **PPTX** (final) → `output/investment-memo/investment-memo-{slug}-v{round}.pptx` — built using `document-skills:pptx` techniques to clone slides from `assets/reference.pptx` and fill them per the slide spec.

Advisory frontmatter:

```yaml
---
entity: "{name}"
skill: investment-memo
type: slide-advisory
round: { round }
date: "{timestamp}"
model: opus
description: "Slide deck advisory — improvements, visuals, appendix proposals"
inputs:
  - investment-memo-{slug}-v{round}.md
---
```

## Slide Spec Format

The slide spec is an **observability artifact** — for the human reviewer to see what the agent decided and for the agent itself to think on paper. It captures three things per slide: what reference slide is being used, what content goes on it, and what the agent was thinking (design choices, partial data, handoffs, reframing decisions).

Each slide is a `## S{N}: {title}` block with a `<!-- slide -->` metadata comment, followed by **Design plan**, **Content**, and (optional) **Notes**.

```
## S7: Market Dynamics
<!-- slide
slide: S4
pattern: two-column
-->

**Design plan:**
Two-column reframe of the memo's flat driver list — supply-side constraints
left (icon-text x3), demand-side pull right (chart-caption with TAM growth).

**Content:**

- Title: "Labor supply is shrinking while demand for fulfillment is accelerating"
- Left pill: SUPPLY CONSTRAINTS
  - Aging warehouse workforce (avg age 46, +8 yrs since 2010)
  - 70% turnover in fulfillment roles
  - Immigration tightening in key US/EU markets
- Right pill: DEMAND PULL
  - Chart: e-commerce fulfillment volume 2020→2030 (+12% CAGR)
  - Caption: "Fulfillment volume in billion units"

**Notes:**

- Reframed three flat memo bullets into supply/demand to make the dynamic explicit
- Source numbers from memo §2.1 and §2.3
```

**Metadata fields:**

- `slide` — reference slide to clone (`S1`–`S6`)
- `pattern` — for S4 only; either a named pattern from guide.md's Reference Slide Index, or a short freeform description if the agent is composing something new (e.g. `pattern: custom — chevron flow above a comparison table`). The agent has design autonomy; new patterns are valid.

The full vocabulary for `slide` and the named patterns lives in `assets/guide.md` — guide.md is the source of truth, this skill file just describes the spec format.

**Section purposes:**

- **Design plan** — one or two sentences on _what shape_ the slide takes and _why_ (pattern choice, reframe, composition decisions). Helps the reviewer (and the agent itself) see the decision before reading the content.
- **Content** — the actual slide content the renderer will fill in: title, bullets, table rows, captions, headers. Concrete, ready to drop into the PPTX.
- **Notes** _(optional)_ — anything else worth recording: partial data and what was left as a handoff template, sources within the memo, things the agent considered and rejected, gaps it had to neutral-language around.

## Process

Read `assets/guide.md` first — it's the lens for everything below.

1. **Read the memo fully.** First pass: structure and emphasis. Second pass: match each section to a slide and (for S4) a pattern.
2. **Assess density.** Thin → fold into adjacent slide. Normal → one slide. Dense → split or use a high-density pattern.
3. **Compose the deck.** S1 first, S2 second, S5 near end, S6 last. Group content per the narrative arc in guide.md, with S3 dividers between sections. Pick S4 patterns by content shape. Fallback: S4 `standard-content`.
4. **Verify.** Run the checklist in guide.md.
5. **Build the PPTX.** Using `document-skills:pptx` techniques, clone slides from `assets/reference.pptx` and fill the shapes per the slide spec. Cross-reference the guide and memo as needed for full content — the spec is the planning overview, not an exhaustive transcript.

## Advisory Template

```markdown
# {Company} — Slide Advisory

## Narrative Flow

Story arc, where the audience might lose the thread, reorder suggestions, missing bridges.

## Visual Enhancements

- **S{N}: {title}** — Current: {what's there}. Recommended: {visual + why}.

## IC Questions & Gaps

- {question} — which slide should address it, what's missing.

## Content Strengthening

- **S{N}: {title}** — what's weak and how to fix it.

## Appendix Proposals

- **{title}** — what it contains, why it matters, source.

## Data Flags

- {claim} — concern.
```

## Building the PPTX

The agent works on the PPTX directly using `document-skills:pptx` techniques — cloning slides, filling shapes, preserving layout inheritance, and handling the OOXML edge cases (auto_size, duplicate cNvPr IDs, layout rels, font inheritance). Both skills sit in the same context; there is no handoff.

Working materials, all available throughout:

- `assets/reference.pptx` — clone slides from this
- `assets/guide.md` — pattern vocabulary, design config, narrative arc
- The memo — source content
- The slide spec md — the planning overview, written first as the deck's blueprint

For each spec entry, clone the right reference slide, fill the editable shapes (cross-referencing the guide for pattern detail and the memo for full content where the spec is just an overview), remove the original 17 reference slides at the end, and save to `output/investment-memo/investment-memo-{slug}-v{round}.pptx`.
