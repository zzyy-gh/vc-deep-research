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
| `assets/examples/`        | Reference source materials — example memo and reference decks the templates were derived from                                                                             |
| `assets/aiconic-logo.jpg` | Firm logo embedded in title slide                                                                                                                                         |

## Outputs

The PPTX is the deliverable. Everything else is the agent's working trail. All artifacts live in `output/investment-memo/`, produced in this order:

1. **Slide spec** → `investment-memo-{slug}-v{round}.md` — content brief for the renderer: takeaway story + facts per slide. Written first.
2. **PPTX** → `investment-memo-{slug}-v{round}.pptx` — the deliverable. Designed and built by `document-skills:pptx` per Process step 5.
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

- `slide` — reference slide type to clone (`S1`–`S6`). For body content, use `S4` and let the renderer pick the pattern.

The spec does not prescribe S4 patterns — pattern selection is owned by the renderer in step 5. The vocabulary for `slide` lives in `assets/guide.md`.

**Section purposes:**

- **Story** — one sentence: what this slide must convince the IC of. The takeaway, not the topic.
- **Content** — concrete title, bullets, table rows, captions, numbers — ready for the renderer to lay out.
- **Notes** _(optional)_ — source pointers, density warnings, gaps the agent had to neutral-language around.

## Process

Read `assets/guide.md` first — it's the lens for everything below.

1. **Read the memo fully.** First pass: structure and emphasis. Second pass: match each section to a slide and decide its takeaway story.
2. **Assess density.** Thin → fold into adjacent slide. Normal → one slide. Dense → split. Flag dense slides in Notes so the renderer can re-split if needed.
3. **Compose the deck.** S1 first, S2 second, S5 near end, S6 last. Group content per the narrative arc in guide.md, with S3 dividers between sections. **S3 section names come verbatim from the Narrative Arc** — do not paraphrase the existing names. New section names may be *added* if the memo's structure genuinely needs one the arc doesn't cover. Pattern selection for S4 is the renderer's job, not the spec-writer's — leave it to step 5.
4. **Sanity-check the spec.** Run the checklist in guide.md before handing off. Story sentences are takeaways, not topics.
5. **Hand off to `document-skills:pptx`** with the spec md, the memo, and `assets/`. The renderer owns build and QA, but must read and respect `assets/guide.md` as the design contract.
6. **Write the advisory.** _After_ the PPTX exists, read the rendered deck and write `investment-memo-{slug}-v{round}-advisory.md`. Two sections: deck-wide observations (Overall) and per-slide notes (Per Slide) — not a place to second-guess the renderer's visual choices.

## Advisory Template

```markdown
# {Company} — Slide Advisory

## Overall

Deck-wide observations: narrative flow, where the audience might lose the thread, reorder suggestions, cross-slide IC questions, and proposed new slides (appendix items, missing bridges, anything not yet in the deck).

## Per Slide

One block per slide that needs attention. Cover content, design, and data flags together. Skip slides that nailed it.

- **S{N}: {title}** — what's weak or worth flagging. Mix freely: content sharpening, layout/visual finishing notes, data concerns, bolder framing, missing context.
```
