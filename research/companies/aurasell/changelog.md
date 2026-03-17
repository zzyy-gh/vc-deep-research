# AuraSell — Changelog

## Storage Migration (2026-03-17)

**Trigger**: Structural refactor — flat output directory with versioned naming.

**Changes**:
1. All artifacts moved to `output/` with `{source}-{description}-v{round}.md` naming
2. `history/` folder eliminated — v1 files coexist with v2 in output/
3. `critiques/` subfolder eliminated — critic files live in output/
4. `custom-reports/tech-competitive/` flattened into output/
5. Custom sources.yaml merged into main sources.yaml
6. All frontmatter updated: `researcher:`/`analyst:`/`critic:` → unified `source:` field
7. Added `description:` and `inputs:` frontmatter fields
8. `refined_from: round-1` → `refined_from: v1`

---

## Round 2 (2026-03-17)

**Trigger**: Refinement incorporating round 1 critique feedback + external model critiques.

**Research artifacts refined**: research.md, financial.md, product.md (all rewritten as round 2).

**External critiques added**: Groq/Llama-3.3-70B (succeeded). GPT-4 and Gemini skipped (API quota limits).

**Key changes**:
1. Eubanks framing corrected — CRO at Harness, not founder
2. Rox AI ($1.2B, ~$8M ARR) added as primary competitor — was entirely missing from round 1
3. Traction metrics (41M agent runs, AVO outcomes) tempered with systematic caveats
4. Salesforce Agentforce threat elevated with Q4 FY2026 data ($800M ARR, 29K deals, AELA bundling)
5. AI inference cost 10-100x variance flagged as critical unknown (neither estimate sourced from company)
6. GTM OS pivot presented with dual interpretation (Trojan horse vs. reactive signal)
7. Burn rate modeled with acceleration to $1.3-1.6M/month, runway compressed to 15-19 months
8. Down-round risk estimated at 40-60% probability
9. Contact count standardized to ~870M throughout

**Report regenerated**: report.md (round 2 consolidated memo with evolution notes).

**Round 1 artifacts archived**: All originals in history/ directory.

---

## Round 1 (2026-03-17)

**Trigger**: Initial research pipeline — screen → deep dive → critique → assessment.

**Phases completed**: Screen, research (4 parallel agents), critique (3 internal critics), assessment, consolidated report.

**Key findings**: Strong team, real product, thin traction, high competitive risk, no disclosed financials.

**Recommendation**: Conditional interest — obtain ARR, gross margin, SOC 2 status under NDA before term sheet.
