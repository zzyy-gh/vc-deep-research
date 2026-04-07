---
name: investment-memo
description: "Transform an investment memo into a structured slide deck — reads memo (PDF/DOCX/MD/HTML), writes a content brief, hands off to document-skills:pptx for design and render"
model: opus
forked: true
---

# Investment Memo to Slides

Transform a VC investment memo into IC presentation slides. The memo is the **single source of truth** — extract and restructure, don't research or invent. This skill owns the story, content, and structure; `document-skills:pptx` owns the visual composition of S4 slides.

## Inputs

- Investment memo file (PDF, DOCX, MD, HTML)
- Entity name and deal codename
- Optional: supplementary notes, custom criteria framework

## Assets

| File                      | Role                                                                                                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `assets/guide.md`         | Single reference for building a deck — global config, design principles, per-slide specs, narrative arc, checklists                                                       |
| `assets/reference.pptx`   | Slide templates cloned by the renderer                                                                                                                                    |
| `assets/clone_slide.py`   | Post-save safety net — `validate_pptx_rels(path)` raises if any slide rId is dangling. Read-only, never modifies anything. Render scripts must call it after `prs.save()` |
| `assets/examples/`        | Reference source materials — example memo and reference decks the templates were derived from                                                                             |
| `assets/aiconic-logo.jpg` | Firm logo embedded in title slide                                                                                                                                         |

## Outputs

The PPTX is the deliverable. Everything else is the agent's working trail. All artifacts live in `output/investment-memo/`, produced in this order:

1. **Slide spec** → `investment-memo-{slug}-v{round}.md` — content brief for the renderer: takeaway story + facts per slide. Written first.
2. **PPTX** → `investment-memo-{slug}-v{round}.pptx` — the deliverable. Designed and built by `document-skills:pptx` per Process step 5. Must pass `validate_pptx_rels` before the round closes.
3. **Advisory** → `investment-memo-{slug}-v{round}-advisory.md` — written _after_ the deck exists, as a handoff to the human reviewer. Critical thinking _beyond_ the memo: narrative flow, IC question gaps, content strengthening, data flags, appendix proposals.

Advisory frontmatter:

```yaml
---
entity: "{name}"
skill: investment-memo
type: slide-advisory
round: { round }
date: "{timestamp}"
model: opus
description: "Slide deck advisory — narrative, content, IC questions, appendix proposals, data flags"
inputs:
  - investment-memo-{slug}-v{round}.md
---
```

## Slide Spec Format

The spec is a **content brief** for the renderer: *what story each slide must tell and what facts go on it*. Each slide is a `## S{N}: {title}` block with a `<!-- slide -->` metadata comment, followed by **Story**, **Content**, and (optional) **Notes**.

```
## S7: Market Dynamics
<!-- slide
slide: S4
pattern: two-column
-->

**Story:** Labor supply is shrinking while demand for fulfillment accelerates — the squeeze is the "why now."

**Content:**

- Title: "Labor supply is shrinking while demand for fulfillment is accelerating"
- Supply-side constraints:
  - Aging warehouse workforce (avg age 46, +8 yrs since 2010)
  - 70% turnover in fulfillment roles
  - Immigration tightening in key US/EU markets
- Demand-side pull:
  - E-commerce fulfillment volume 2020→2030 (+12% CAGR)
  - Caption / unit: "Fulfillment volume in billion units"

**Notes:**

- Reframed three flat memo bullets into supply/demand to make the dynamic explicit
- Source numbers from memo §2.1 and §2.3
```

**Metadata fields:**

- `slide` — reference slide to clone (`S1`–`S6`)
- `pattern` — for S4 only; an *advisory* hint at the content's shape, drawn from guide.md's Reference Slide Index (e.g. `two-column`, `matrix`, `pipeline`) or a short freeform description (e.g. `pattern: custom — chevron flow above a comparison table`). The renderer is free to override based on visual judgment.

The full vocabulary for `slide` and the named patterns lives in `assets/guide.md` — guide.md is the source of truth, this skill file just describes the spec format.

**Section purposes:**

- **Story** — one sentence: what this slide must convince the IC of. The takeaway, not the topic.
- **Content** — concrete title, bullets, table rows, captions, numbers — ready for the renderer to lay out.
- **Notes** _(optional)_ — source pointers, density warnings, gaps the agent had to neutral-language around.

## Process

Read `assets/guide.md` first — it's the lens for everything below.

1. **Read the memo fully.** First pass: structure and emphasis. Second pass: match each section to a slide and decide its takeaway story.
2. **Assess density.** Thin → fold into adjacent slide. Normal → one slide. Dense → split. Flag dense slides in Notes so the renderer can re-split if needed.
3. **Compose the deck.** S1 first, S2 second, S5 near end, S6 last. Group content per the narrative arc in guide.md, with S3 dividers between sections. Suggest an S4 `pattern:` hint per slide based on content shape — the renderer can override.
4. **Sanity-check the spec.** Run the checklist in guide.md before handing off. Story sentences are takeaways, not topics.
5. **Hand off to `document-skills:pptx` as the designer.** The renderer owns visual composition of S4. Pass it the spec md, the original memo, and `assets/` (reference.pptx, guide.md, clone_slide.py) — let it design freely. Two rules are non-negotiable: **fixed slides (S1, S2, S3, S5, S6) clone the reference exactly**; **S4 is an open canvas** where the renderer can override the spec's `pattern:` hint, generate charts, and lift components from any reference slide. Validate with `validate_pptx_rels(OUT)` before closing.
6. **Write the advisory.** _After_ the PPTX exists, read the rendered deck and write `investment-memo-{slug}-v{round}-advisory.md`. Focus on narrative flow, IC question gaps, content strengthening, data flags, and appendix proposals — not on second-guessing the renderer's visual choices.

## Advisory Template

```markdown
# {Company} — Slide Advisory

## Narrative Flow

Story arc, where the audience might lose the thread, reorder suggestions, missing bridges.

## Slide Critique

- **S{N}: {title}** — where the *rendered slide* needs a human-finishing visual pass (layout, spacing, chart styling). Skip if the renderer nailed it.

## IC Questions & Gaps

- {question} — which slide should address it, what's missing.

## Content Strengthening

- **S{N}: {title}** — where the *content itself* is weak (bullet doesn't hit hard, number lacks context, argument needs sharpening). Distinct from Slide Critique: this is about what the slide says, not how it looks.

## Appendix Proposals

- **{title}** — what it contains, why it matters, source.

## Data Flags

- {claim} — concern.
```
