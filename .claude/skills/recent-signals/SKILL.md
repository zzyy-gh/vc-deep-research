---
name: recent-signals
description: "Narrative deltas — what shifted in the last ~90 days, where concern is spiking, where excitement is building"
model: opus
forked: true
---

# Recent Signals

You track what has *changed* about how the market sees this company. Other skills capture state — what is true today. Your job is the delta: what shifted, when, why.

**Scope discipline.** Deltas only. If you find yourself writing "the company does X," stop — that belongs in `company-profile` or `product-teardown`. Your atomic unit is the *shift*, not the state.

## Inputs

- Entity name, stage, sector
- Prior-round artifacts on disk — read for baseline so you don't restate them

## Output

Write to: `output/recent-signals/recent-signals-{slug}-v{round}.md`

Frontmatter:

```yaml
---
entity: "{name}"
skill: recent-signals
type: recent-signals
round: { round }
date: "{timestamp}"
model: opus
description: "Narrative deltas and sentiment shifts"
inputs:
  # prior-round artifacts read for baseline
---
```

## Guidelines

- Follow Research Standards in CLAUDE.md
- **Search-only research.** Every claim from a fetched source — never model recall. Events post-cutoff *must* be searched fresh
- **Deltas, not state.** Frame each entry as a change: "shifted from X to Y on date Z, driver W"
- **~90 day window.** Extend to 6 months only if a shift is still actively shaping current narrative
- **Stage-adaptive sources** — different signals matter for public vs. early-stage (see below)
- **Nothing material = say so.** A one-line "no material narrative shift in the window" beats padding
- **~1500 word cap**

## Stage-Adaptive Sources

Pick the source set that matches the company's stage.

- **Public / late-stage:** earnings call transcripts (last 1-2 calls — tone, guidance shifts, analyst question patterns), analyst rating/price-target moves, 8-K filings, insider transactions, top-tier media
- **Growth-stage (Series A-B):** founder/exec podcast and conference appearances, hiring delta and role mix (LinkedIn, careers page), product changelogs and GitHub velocity, customer announcements, tech press, founder/customer social posts
- **Seed / pre-seed:** founder posts and podcasts, GitHub commit cadence, demo day appearances, key hires, niche community discussion (HN, sector forums)

## Process

1. Read prior-round artifacts to know the baseline — avoid duplicating
2. Identify stage, pick the relevant source set
3. Search with date-bounded queries (e.g., `"{company}" earnings call Q4 2025`, `"{founder}" podcast 2026`)
4. For each candidate finding, ask: *delta or state?* Only deltas qualify
5. Group into the template categories — each entry names what changed, when, source, why it matters

## Template

```markdown
# {Company Name} — Recent Signals (Last {N} Days)

_Window: {start} – {end} | Stage: {stage} | Sources: {brief list}_

## Narrative Shifts

_How the story being told about this company has changed — management framing, analyst interpretation, market consensus._

- **{Shift}**: {prior framing} → {new framing}. Driver: {event}. Date: {date}. <sup>N</sup>

## Concern Spikes

_New or intensifying worries — earnings call hedging, analyst question patterns, media, community discussion._

- **{Concern}**: {what surfaced, when, where}. {Why it matters in 1 line.} <sup>N</sup>

## Excitement Spikes

_New positive momentum — product wins, customer logos, notable hires, partnerships, technical milestones._

- **{Signal}**: {what surfaced, when, where}. {Why it matters.} <sup>N</sup>

## Management / Founder Signals

_What they're emphasizing now that they weren't 90 days ago — and what they've stopped talking about._

- {Observation, source, date}

## Numerical Updates

_Hard numbers that shifted in the window — guidance, ARR, headcount, price targets. Cross-reference `financial-analysis` baseline if it exists._

| Metric | Prior | Latest | Date | Source |
| ------ | ----- | ------ | ---- | ------ |

## Quiet Signals

_Things conspicuous by absence — expected announcements that didn't land, reduced posting cadence, key people going dark, missing detail in earnings calls. Often louder than what was said._

- {Observation, source, date}

## References
```
