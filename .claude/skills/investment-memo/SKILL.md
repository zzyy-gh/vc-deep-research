---
name: investment-memo
description: "Transform an investment memo into a structured slide deck — reads memo (PDF/DOCX/MD/HTML), writes a content brief, hands off to document-skills:pptx for design and render"
model: opus
forked: true
---

# Investment Memo to Slides

Transform a VC investment memo into IC presentation slides. The memo is the **single source of truth** — extract and restructure, don't research or invent.

## Inputs

- Investment memo (PDF, DOCX, MD, HTML)
- Entity name and deal codename
- Optional: supplementary notes, custom criteria framework

## Assets

| File                    | Role                                                                                      |
| ----------------------- | ----------------------------------------------------------------------------------------- |
| `assets/guide.md`       | Design contract — global config, principles, slide types, content catalog, narrative arc |
| `assets/reference.pptx` | Slide templates the renderer clones                                                       |
| `assets/examples/`      | Example memo and source decks the templates were derived from                             |

## Outputs

All artifacts in `output/investment-memo/`, in order:

1. **Slide spec** → `investment-memo-{slug}-v{round}.md` — content brief: takeaway story + facts per slide.
2. **PPTX** → `investment-memo-{slug}-v{round}.pptx` — the deliverable.
3. **Advisory** → `investment-memo-{slug}-v{round}-advisory.md` — written after the deck exists, as a handoff to the human reviewer. Frontmatter follows the standard convention with `type: slide-advisory`.

## Slide Spec Format

The spec is a content brief: *what story each slide must tell and what facts go on it*. Each slide is a `## S{N}: {title}` block with a `<!-- slide -->` metadata comment, followed by **Story**, **Content**, and (optional) **Notes**.

**Story is the takeaway, not the topic** — one sentence stating what the slide must convince the IC of.

```
## S7: Market Dynamics
<!-- slide
slide: S4
-->

**Story:** Labor supply is shrinking while demand for fulfillment accelerates — the squeeze is the "why now."

**Content:**
- Title: "Labor supply is shrinking while demand for fulfillment is accelerating"
- Supply-side: aging workforce, 70% turnover, immigration tightening
- Demand-side: e-commerce volume +12% CAGR 2020→2030

**Notes:** Reframed flat memo bullets into supply/demand. Numbers from memo §2.1 / §2.3.
```

`slide` metadata is the reference type to clone (`S1`–`S6`). For body content, use `S4` and let the renderer pick the pattern. Pattern vocabulary lives in `guide.md`.

## Process

Read `assets/guide.md` first — it's the lens for everything below.

1. **Read the memo fully.** Match each section to a slide; decide its takeaway story.
2. **Compose the deck.** S1 first, S2 second, S5 near end, S6 last. Group content per the narrative arc in guide.md, with S3 dividers between sections.
3. **Sanity-check the spec** against guide.md's checklist. Story sentences are takeaways, not topics.
4. **Hand off to `document-skills:pptx`.** It takes over with full authority over build, design, and QA — must read and respect `assets/guide.md` as the design contract.
5. **Write the advisory.** After the PPTX exists, read the rendered deck and write `investment-memo-{slug}-v{round}-advisory.md`.

## Advisory Template

```markdown
# {Company} — Slide Advisory

## Overall

Deck-wide observations: narrative flow, reorder suggestions, cross-slide IC questions, proposed new slides (appendix items, missing bridges).

## Per Slide

One block per slide that needs attention. Cover content, design, and data flags together. Skip slides that nailed it.

- **S{N}: {title}** — what's weak or worth flagging.
```
