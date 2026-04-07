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
| `assets/clone_slide.py`   | Post-save safety net — `validate_pptx_rels(path)` raises if any slide rId is dangling. Read-only, never modifies anything. Render scripts must call it after `prs.save()` |
| `assets/examples/`        | Reference source materials — example memo and reference decks the templates were derived from                       |
| `assets/aiconic-logo.jpg` | Firm logo embedded in title slide                                                                                   |

## Outputs

The PPTX is the deliverable. Everything else is the agent's working trail. All artifacts live in `output/investment-memo/`, produced in this order:

1. **Slide spec** → `investment-memo-{slug}-v{round}.md` — planning blueprint, faithful to the memo. Written first.
2. **PPTX** → `investment-memo-{slug}-v{round}.pptx` — the deliverable. Built per Process step 5. Must pass `validate_pptx_rels` (from `assets/clone_slide.py`) before the round closes.
3. **Render script (optional)** → `render-{slug}-v{round}.py` — keep on disk if `document-skills:pptx` produced a single coherent script during the build. Skip if the deck was built through iterative coworking with no clean final script. The PPTX is what's required, not the script.
4. **Advisory** → `investment-memo-{slug}-v{round}-advisory.md` — written *after* the deck exists, as a handoff to the human reviewer. Critical thinking *beyond* the memo: narrative critique, visual improvements that need human finishing, IC question gaps, appendix proposals, data flags.

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

- **Design plan** — one or two sentences on what shape the slide takes and why.
- **Content** — concrete title, bullets, table rows, captions, ready for the build phase.
- **Notes** _(optional)_ — handoffs, source pointers, considered-and-rejected alternatives, gaps the agent had to neutral-language around.

## Process

Read `assets/guide.md` first — it's the lens for everything below.

1. **Read the memo fully.** First pass: structure and emphasis. Second pass: match each section to a slide; for S4, sketch a starting pattern (advisory — the build phase can deviate).
2. **Assess density.** Thin → fold into adjacent slide. Normal → one slide. Dense → split or use a high-density pattern.
3. **Compose the deck.** S1 first, S2 second, S5 near end, S6 last. Group content per the narrative arc in guide.md, with S3 dividers between sections. Pick S4 patterns by content shape. Fallback: S4 `standard-content`.
4. **Sanity-check the spec.** Run the checklist in guide.md before building.
5. **Build the PPTX (cowork with `document-skills:pptx`).** Treat the pptx skill as a design partner, not a fill-in-the-blanks tool. Two rules govern slide-by-slide freedom:

   - **Fixed slides (S1, S2, S3, S5, S6) are non-negotiable.** Clone them as-is from `assets/reference.pptx` and only fill the editable text shapes. Layout, geometry, colors, fonts, and shape composition must match the reference exactly. These slides exist to keep every IC deck visually consistent.
   - **S4 content slides are an open canvas.** The reference S4 patterns are *visual vocabulary*, not a prison. Compose new layouts, generate new visuals (charts, diagrams, icon arrangements), redraw freely — as long as the result matches the deck's colors, typography, and style. The spec's `pattern:` field is advisory.

   Workflow: clone fixed slides → for each S4 slide, draft → render → look at it → fix what's ugly → repeat until the slide makes its point cleanly. Cross-reference the memo and guide as needed. When the deck reads well end-to-end, run `validate_pptx_rels(OUT)` once as a final safety check. If it raises, fix and re-validate.
6. **Write the advisory.** *After* the PPTX exists, write `investment-memo-{slug}-v{round}-advisory.md` as a handoff to the human reviewer. Reference the rendered slides directly (S{N}: title), suggest visual improvements that would require human finishing, flag IC question gaps and data concerns, and propose appendix slides.

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

