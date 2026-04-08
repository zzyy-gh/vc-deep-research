---
name: investment-memo
description: "Transform an investment memo into a structured slide deck — reads memo (PDF/DOCX/MD/HTML), writes a content brief, hands off to document-skills:pptx for design and render"
model: opus
forked: true
---

# Investment Memo to Slides

Transform a VC investment memo into IC presentation slides.

## Inputs

- Investment memo (PDF, DOCX, MD, HTML)
- Entity name and deal codename
- Optional: supplementary notes, custom criteria framework

## Assets

| File                    | Role                                                                                     |
| ----------------------- | ---------------------------------------------------------------------------------------- |
| `assets/guide.md`       | Design contract — theme, constraints, ship states, slide definitions, content catalog, narrative arc |
| `assets/reference.pptx` | 6 barebones slides: the 5 fixed templates (S1, S2, S3, S5, S6) + a blank S4 canvas       |

## Outputs

All artifacts in `output/investment-memo/`, in order:

1. **Slide spec** → `investment-memo-{slug}-v{round}.md` — content brief: takeaway story + facts per slide.
2. **PPTX** → `investment-memo-{slug}-v{round}.pptx` — the deliverable.
3. **Advisory** → `investment-memo-{slug}-v{round}-advisory.md` — written after the deck exists, as a handoff to the human reviewer. Frontmatter follows the standard convention with `type: slide-advisory`.

## Slide Spec Format

The spec is a content brief: _what story each slide must tell and what facts go on it_. Each slide is a `## S{N}: {title}` block with a `<!-- slide -->` metadata comment, followed by **Story**, **Content**, and (optional) **Notes**.

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

`slide` metadata is one of `S1`–`S6`. Fixed slides (`S1`, `S2`, `S3`, `S5`, `S6`) are cloned from `reference.pptx` with text swapped. `S4` is a body slide — the renderer builds it from a blank canvas, designing the composition that lands the takeaway.

## Process

`assets/guide.md` is the binding authority on everything about the slides — theme, constraints, ship states, slide definitions, content catalog, narrative arc. Read it first and treat it as the source of truth for every decision below; the steps here only sequence the work.

1. **Read the memo fully.** Match each section to a slide; decide its takeaway story.
2. **Compose the deck.** S1 first, S2 second, S5 near end, S6 last. Group content per the narrative arc in guide.md, with S3 dividers between sections. S4 body slides are designed from scratch — no pattern to pick.
3. **Sanity-check the spec** against guide.md's constraints and ship states. Story sentences are takeaways, not topics.
4. **Hand off to `document-skills:pptx`.** It owns build and QA mechanics, but `assets/guide.md` remains the contract for the core principles and constraints. The renderer must read it to know where to follow strictly and where it has creative freedom. The spec is equally binding: every slide in it ships, none dropped because a reference layout is awkward.
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
