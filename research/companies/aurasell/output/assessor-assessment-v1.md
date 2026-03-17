---
entity: "AuraSell"
type: assessment
description: "assessment"
date: "2026-03-17T00:00:00+08:00"
source: "assessor (sonnet)"
round: 1
inputs:
  - researcher-company-research-v1.md
  - financial-analyst-financials-v1.md
  - product-analyst-product-analysis-v1.md
  - first-principles-analysis-v1.md
  - critic-analytical-critique-v1.md
  - critic-bear-critique-v1.md
  - critic-ic-critique-v1.md
---

# AuraSell — Investment Assessment

## Deal Breakers

No hard stops identified from available information. However, two conditions are borderline and must be resolved in diligence before any commitment:

| Flag | Severity | Source | Status |
|------|----------|--------|--------|
| No SOC 2 / ISO 27001 certification, 7 months post-launch | Near Hard Stop | product.md, critiques/bear.md | Unresolved — certification status unknown |
| No ARR disclosed and no confirmed ARR figure under NDA | Gating Condition | financial.md, critiques/ic.md | Unresolved — must obtain before term sheet |
| 870M contacts across global jurisdictions with no disclosed compliance posture | High Risk | critiques/bear.md, product.md | Unresolved — GDPR/CCPA/EU AI Act exposure unquantified |

**Assessor note**: None of these are independently fatal, but writing a check without resolving the ARR question specifically is not defensible. The IC critique is direct: "Any investor writing a check without this number is flying blind." Treat actual ARR as a pre-term-sheet requirement, not a post-term-sheet diligence item.

---

## Key Assumptions

The five things that must be true for this investment to generate a fund-returning outcome:

| # | Assumption | Status | Evidence |
|---|-----------|--------|----------|
| 1 | AI-native architecture delivers materially superior sales outcomes vs. Salesforce Agentforce — enough to justify CRM migration risk | Unvalidated | AVO Automation results are company-reported and unaudited. No independent benchmarks exist. Salesforce Agentforce already at $800M standalone ARR with 29K deals. The architectural advantage is asserted, not demonstrated at scale. |
| 2 | AuraSell can reach $3–5M ARR within 12–15 months to support a non-dilutive Series A at $300M+ | Partially Validated (negative lean) | Sales motion only stood up Feb 2026 (CMO/VP RevOps hired then). Two named customers as of Nov 2025, likely sub-$1M ARR today. Burn multiple estimated at 20x+. Comparable: Rox reached $8M ARR via wrap-and-extend faster than AuraSell has disclosed any ARR. |
| 3 | GTM OS overlay creates a defensible land-and-expand motion leading to full CRM migration | Unvalidated | The overlay was launched 6 months post-launch — possibly reactive, not proactive. Rox ($1.2B, $8M ARR) chose this model first and appears to be outpacing AuraSell's traction. No conversion data from overlay-to-full-CRM exists. |
| 4 | Gross margins are sustainable at 65%+ net of AI inference and data licensing costs | Unvalidated | 41M agent runs at $0.01/run = ~$410K/month in inference costs against sub-$1M ARR. Data licensing for 870M contacts is an ongoing expense not disclosed. Financial.md and product.md have a 10–100x discrepancy in per-run cost estimates. No gross margin data has been shared. |
| 5 | Salesforce Agentforce is "good enough but not great enough" — leaving 2–3 years of enterprise displacement opportunity | Unvalidated (negative lean) | Salesforce Agentforce: $800M standalone ARR, 29K deals, 169% YoY growth, every top-10 deal in Q4 FY2026 included it, AELA bundling underway. The incumbent is responding faster and more aggressively than the research narrative implies. The Siebel analog is structurally flawed — Salesforce can add AI without rewriting its deployment model. |

---

## Unknowns Inventory

### Critical Unknowns
These could change the go/no-go decision if answered differently than the base case assumes:

- **Actual ARR and paying customer count as of today.** The entire financial model rests on estimates. At 2 customers it's a pre-PMF story. At 15–20 customers with $1M+ ARR, it's an early-traction story with very different risk profiles. Resolve via NDA request before proceeding.
- **Actual gross margin including AI inference and data licensing costs per customer.** A 25-point swing in gross margin (from 75% to 50%) changes the capital requirements for the entire business. At sub-50% margins the consolidation pricing model may be structurally uneconomic. Resolve via financial data room request.
- **Why the GTM OS pivot happened in month 6 — and what the standalone CRM pipeline looks like now.** If the pivot was defensive (standalone CRM stalling), the core thesis requires significant revision. If the pipeline still contains full-replacement deals in flight, the overlay is additive not substitutional. Resolve via management call with direct question.
- **SOC 2 status and expected certification timeline.** Enterprise deals cannot convert without this. If SOC 2 Type II is not in process, the enterprise pipeline that justifies the valuation cannot materialize within 12 months. Resolve via direct inquiry.

### Important Unknowns
These affect structure and conviction, but not necessarily the binary go/no-go:

- **Rox AI's actual competitive positioning vs. AuraSell** — Rox is the most direct analog (AI-native GTM, wrap approach, Sequoia/GC backing, $1.2B valuation, $8M ARR) but is absent from the competitive analysis in research.md and product.md. AuraSell's team must have a specific view on how they win against Rox. The answer is a signal of competitive intelligence depth.
- **Data provider identity and contract terms for the 870M contact database.** If ZoomInfo or Apollo restricts access to competing platforms, the enrichment feature — central to the product demo — collapses. Check for most-favored-nation or access-restriction clauses.
- **Enterprise pipeline specifics: any pilots at 500+ employee companies?** The CMO and VP RevOps were hired to build this motion. What has been built so far? Is there a single enterprise LOI or pilot agreement?
- **Agent run breakdown: paying customers vs. free trials, and complexity distribution.** 41M runs is the flagship metric. If it is concentrated in a handful of high-volume pilots or free-tier accounts, the usage signal is weak. If it represents broad adoption across 20+ paying customers, it is genuine.
- **Cap table and actual seed post-money valuation.** The $120–150M estimate uses median dilution applied to a non-median round. The actual figure matters for understanding the return threshold and current investor economics.

### Nice to Know
Would sharpen the analysis but unlikely to change the decision:

- Attio's actual post-Series B valuation (the $300–500M range used in comps is a guess).
- Clay's precise ARR at Series C raise (reported as $100M but may have been $70–75M, which narrows the comparable).
- Whether the Sacra pricing reference ($20K starting ACV) was accessed directly or cited secondhand.
- Whether AuraSell has applied for any government or regulated-industry contracts where security certification timelines matter differently.
- AuraSell's specific LLM vendor(s) — the multi-model claim is a roadmap item; single-vendor dependency today is a pricing and availability risk.

---

## Information Asymmetry

### Founder Knows (We Don't)
- Actual ARR, MRR, and pipeline weighted by probability of close
- Real gross margin including inference costs and data licensing by customer
- Actual reason for the GTM OS pivot — whether driven by enterprise resistance or proactive strategy
- Internal NRR and whether "every customer expanded" is still true as of March 2026
- The actual post-money valuation from the seed round
- SOC 2 audit status and any enterprise security exceptions granted to current customers
- Whether any large enterprise (500+ employees) is in a paid pilot or advanced evaluation

### We Know (Founder May Not)
- How aggressively Salesforce is using AELA to pre-empt displacement conversations with enterprise buyers
- Rox AI's $1.2B valuation and $8M ARR trajectory as a direct competitive benchmark and a signal that the "wrap" model is gaining commercial traction faster
- LP sentiment on AI-native CRM as a category — whether this still reads as differentiated or has become a crowded theme
- What a flat or down Series A would do to retention in a 40-person team with aggressive equity compensation
- The pattern of prior "Salesforce killers" (Outreach, Freshworks) and how those IC conversations looked at seed stage

### Neither Knows
- Whether enterprise buyers will conclude that Salesforce Agentforce is "good enough" within 12–18 months or will continue evaluating alternatives
- How AI inference costs will evolve — if costs drop 10x by 2027 the margin math improves dramatically; if a major model provider raises prices the margin math collapses
- Whether a GDPR/EU AI Act enforcement action against a data-rich AI GTM platform will emerge as a sector-level event
- Whether macro conditions (rate environment, SaaS spending) will create a flight-to-known-vendors dynamic in 2026–2027
- The winning architecture in this category — by 2028 it will be clear whether rip-and-replace or wrap-and-extend won, but that is the bet being made today

---

## Research Gaps

Specific missing data with suggested sources, prioritized by importance:

| Gap | Importance | Suggested Source |
|-----|-----------|-----------------|
| Actual ARR and paying customer count | Critical | Request under NDA in first management call; this is a standard seed diligence ask |
| Gross margin: AI inference cost per agent run + data licensing cost per customer per month | Critical | Financial data room; ask for a P&L or unit economics model |
| SOC 2 status and enterprise security compliance roadmap | Critical | Management call; request any SOC 2 readiness assessment documents |
| GTM OS pivot causation: sales objection data from Q4 2025 pipeline | Critical | Management call; ask for a pipeline breakdown pre/post-pivot by objection type |
| Rox AI competitive analysis — head-to-head win/loss data | High | Management call; competitive intelligence call with a RevOps buyer evaluating both |
| Identity of data providers for 870M contacts and contract terms | High | Data room; legal review of data licensing agreements |
| Enterprise pipeline: any pilots at 500+ employee companies | High | Management call; CRM snapshot of pipeline by company size |
| Agent run breakdown: paying vs. free-tier, run type complexity distribution | High | Product analytics data; ask for a dashboard export |
| Actual seed post-money valuation | Medium | Cap table document; founders may disclose under NDA |
| AVO Automation reference call with independent verification of outcomes | Medium | Direct call with AVO Automation CRO Faisal Hassan; request pre/post data |
| Customer reference at MobiClocks | Medium | Direct reference call; key question: are they on a paid contract or extended pilot? |
| Technical architecture document for data model and agent orchestration layer | Medium | Data room; useful for assessing architectural defensibility claim |
| Attio post-Series B valuation | Low | GV investment press release or Pitchbook/Crunchbase subscription |

---

## Discrepancies

Where findings conflict across research files, or where claims conflict with evidence:

| Finding | Conflicts With | Severity | Resolution Needed |
|---------|---------------|----------|-------------------|
| financial.md estimates AI inference cost at "$41K" based on $0.001/run | product.md estimates $400K–$2M/month based on $0.01–$0.05/run | High | A 10–100x variance in the central cost structure assumption. Reconcile with actual per-run cost data from the company. This variance directly determines whether gross margins are 75% or 50%. |
| research.md frames GTM OS pivot as proactive "Trojan horse" strategy | first-principles.md and critiques/analytical.md note this could be a reactive signal that standalone CRM wasn't gaining traction | High | Ask management directly what drove the pivot timing. The charitable and uncharitable interpretations have meaningfully different investment implications. |
| financial.md estimates $23.5M remaining cash and 23–28 months runway | critiques/analytical.md and critiques/bear.md note burn will accelerate with CMO/VP RevOps hires and GTM scaling, compressing runway to 15–19 months | Medium | Model the burn at $1.3–1.6M/month (appropriate for 60–80 person team) and confirm hiring plan with management. |
| research.md attributes "$1M to $100M ARR" scaling to Jason Eubanks as a founder achievement | critiques/analytical.md correctly notes Eubanks joined Harness as CRO, not as founder — this is a revenue leadership achievement, not founder credit | Medium | No investment-thesis change, but the framing in the pitch deck should be corrected: "served as CRO during Harness's growth from $1M to $100M ARR." |
| research.md, product.md cite "41M agent runs" as a strong usage signal | critiques/analytical.md notes this is single-source, company self-reported, and the definition of an "agent run" is unknown (could be a trivial field update) | Medium | Request definition and breakdown of run types from management. Vanity metric risk is real. |
| Contact database count varies across documents: 870M (research.md), 850M (financial.md, screen.md), 850M+ (product.md) | Internal inconsistency; suggests the number is approximate or not verified | Low | Confirm the exact figure from AuraSell. Minor but signals research used marketing materials rather than verified data. |
| financial.md uses Clay's $3.1B valuation at $100M ARR as a seed-stage comparable | critiques/analytical.md notes Clay's path took 8 years total (2 years post-seed after 6 years of foundational work); using Clay as a seed comparable is a category error | Low | Remove Clay as a direct comp; use it as an aspirational ceiling only. The operative comps are Attio, Rox, and Day AI — which are much earlier in their trajectories. |
| financial.md applies median seed dilution (20–25%) to estimate the post-money valuation | critiques/analytical.md correctly flags this as methodologically circular — outlier rounds often reflect non-median dilution terms | Low | Flag the valuation as unknown/unconfirmed; use a wider range ($100M–$200M post-money) or omit the estimate and request the actual figure under NDA. |

---

## Section Health (Traffic Light)

| Section | Status | Note |
|---------|--------|------|
| Team | Green | Eubanks' operator background (Harness CRO, Twilio pre-IPO, Meraki) is genuinely differentiated for this problem. Bandi (VMware, Nutanix) brings platform engineering depth. Winslow hire from Salesforce is a strong signal. Gap: no named VP Product, which is a structural risk for a 15-module product company. |
| Product | Yellow | Real product in market with active usage and full-stack replacement customers. Two strong differentiators: unified data model and GTM OS overlay. Material risks: no security certifications, module depth unproven vs. specialists (Gong, Conga, Clari), GTM OS Salesforce sync is technically fragile, data moat is licensed not proprietary. |
| Market | Yellow | TAM is real ($90B+ CRM + adjacencies) but the near-term addressable market (mid-market, non-Salesforce-locked buyers) is much smaller and shared with 10+ funded competitors. Timing window is real but already partially closed — Salesforce Agentforce $800M ARR is not a theoretical threat, it is an active one. |
| Traction | Red | Two named customers (both mid-market, likely $20K–$50K ACV) and no disclosed ARR seven months post-launch. "41M agent runs" is a potentially meaningful metric but unverified and undefined. No enterprise pilot confirmed. No G2 reviews, no community signal. The traction data available is thin relative to the capital raised and the valuation implied. |
| Financials | Red | Almost no confirmed financial data exists. Revenue, customer count, ACV distribution, gross margins, and actual burn rate are all estimated. The one confirmed financial fact — $30M raised in 28 hours — reflects investor signal quality, not business performance. The burn multiple is almost certainly in excess of 20x. The financial analysis was admirably transparent about what is estimated vs. confirmed, but the estimates have wide error bars. |
| Competition | Yellow | Competitive landscape is comprehensive for the named competitors (Salesforce Agentforce, Attio, HubSpot, Gong) but missing Rox AI — the most directly comparable competitor by architecture and traction. Salesforce's Agentforce threat is acknowledged but consistently softened in the research narrative; the critique files are more accurate in assessing its severity. |
| Risks | Yellow | Risks are identified and catalogued across research files. The analytical and bear critiques add important weight to: (1) the Salesforce AELA bundling threat, (2) the gross margin structural concern, (3) the "too many horses" competitive dynamic, and (4) the SOC 2 timeline constraint. The first-principles "kill the company" scenarios are the strongest section of the risk analysis. The research narrative tends to soften risks with mitigations that are not yet validated. |

---

## Overall Assessment

AuraSell has the right team for the problem — Eubanks' specific operator background (Harness CRO during $1M-to-$100M, Twilio pre-IPO, Meraki through Cisco acquisition) is genuinely rare for a seed-stage founder, and the case for a generational platform shift in enterprise CRM is intellectually coherent. The seed round dynamics (28-hour close, oversubscribed to $40M, N47 + Menlo + Unusual syndicate) reflect real investor conviction, not pure hype. The GTM OS overlay is strategically sophisticated, and the two named customers replacing full stacks are the right behavioral signal for early PMF.

The problem is the gap between the narrative and the evidence. Seven months post-launch, the company has no disclosed ARR, two named mid-market customers, no security certifications, and a pivot away from its core thesis. The financial model is almost entirely estimated. The "41M agent runs" flagship metric is unverified, undefined, and may be a vanity statistic. The key assumption that "AI-native architecture delivers materially superior outcomes" has never been independently tested — the AVO Automation results are company-reported and unaudited. Meanwhile, Salesforce Agentforce is at $800M standalone ARR with 29,000 deals closed and a bundling strategy explicitly designed to prevent displacement. The competitive landscape has ten or more well-funded startups — including Rox AI at $1.2B valuation and $8M ARR via the wrap-and-extend approach that AuraSell has now adopted — all targeting the same RevOps buyer persona. The entry valuation of $120–150M (estimated) means the return math requires either a $1.5B+ exit or exceptionally strong follow-on execution, neither of which can be assumed given current traction.

**Recommended next action: Conditional interest, not a term sheet.** The investment should not proceed without three data points obtained under NDA: (1) actual ARR and paying customer count, (2) gross margin net of AI inference and data licensing costs, and (3) SOC 2 certification status and timeline. If ARR exceeds $1M with a confirmed enterprise pilot in pipeline and gross margins are 65%+, this is worth a term sheet conversation — the team and the market timing are compelling enough to accept the uncertainty. If ARR is below $500K with no enterprise pipeline, pass and request a 90-day revisit when the data is cleaner. Do not let the 28-hour close velocity create artificial urgency in this decision — the deal is not competitive in the same way it was in August 2025.
