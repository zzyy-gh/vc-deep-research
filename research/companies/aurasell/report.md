---
entity: "AuraSell"
type: consolidated-report
round: 2
date: "2026-03-17T00:00:00+08:00"
status: refined
---

# AuraSell -- Consolidated Investment Memo

## TL;DR

AuraSell is an AI-native CRM and GTM platform attempting to consolidate 15+ fragmented sales tools, founded by Jason Eubanks (CRO who scaled Harness from $1M to $100M+ ARR) with a $30M seed from N47, Menlo, and Unusual Ventures. The key tension: the team and market timing are genuinely compelling, but seven months post-launch the company has no disclosed ARR, only two named mid-market customers, and faces an incumbent (Salesforce Agentforce at $800M standalone ARR) responding faster than the thesis assumed -- while a closer competitor (Rox AI, $1.2B valuation, ~$8M ARR) is executing the same wrap-and-extend approach AuraSell adopted in February 2026, but with a 12-month head start. This is a high-conviction team bet in a category where most investors will lose money even if the thesis proves correct.

## Company Snapshot

| Dimension | Detail |
|-----------|--------|
| Stage | Seed ($30M, Aug 2025) |
| Sector | Enterprise SaaS / AI-Native CRM / RevOps |
| Founded | 2023 (stealth); Aug 2025 (public launch) |
| HQ | San Francisco, CA |
| Funding | $30M seed (oversubscribed to $40M, closed in 28 hours) |
| Team | Jason Eubanks (CEO, ex-CRO Harness), Srinivas Bandi (CTO, ex-VMware/Nutanix), Steve Burton (CMO, ex-CrowdStrike), David Winslow (VP RevOps, ex-Salesforce SVP) |
| Key Metric | 41M agent runs (Nov 2025, self-reported, unverified, definition unknown) |

## Investment Thesis

**Bull Case**
- Generational platform shift: AI-native architecture built from first principles could deliver structurally superior outcomes vs. AI bolted onto Salesforce's 25-year-old schema -- if validated at scale
- Strong founder-market fit: Eubanks served as CRO during Harness's $1M-to-$100M growth; Winslow hire from Salesforce provides insider knowledge of the incumbent's weaknesses
- GTM OS as Trojan horse: Overlay reduces adoption friction, creates land-and-expand path, avoids the "rip and replace Salesforce" death sentence
- Tool consolidation tailwind: CFOs cutting SaaS spend; replacing 5-7 vendors with AI at ~$375/user/month vs. $600-$1,200/user/month is a compelling economic argument
- Exceptional round signal: 28-hour close with enterprise-sophisticated syndicate (N47, Menlo, Unusual) is not fake signal

**Bear Case**
- Salesforce is not Siebel: $800M Agentforce ARR, 29K deals, AELA bundling, 169% YoY growth -- AI is a capability layer, not a deployment model rewrite
- Rox AI is ahead on the same path: $1.2B valuation, ~$8M ARR, chose wrap-and-extend first with stronger disclosed traction
- Too many horses: $300M+ deployed into 10+ AI-native CRM/GTM startups -- category war of attrition where most investors lose money
- No revenue visibility: Seven months post-launch, no ARR, two mid-market customers, burn multiple estimated at 22x+
- AI cost structure risk: 10-100x variance in per-run inference cost estimates; gross margins entirely unknown; potential 25-point margin compression changes capital requirements

## Key Findings

**Team**: Eubanks' operator background is genuinely differentiated -- CRO during Harness's $1M-to-$100M ARR growth, pre-IPO at Twilio, Meraki through Cisco acquisition. Important framing: he was CRO at Harness, not founder -- a revenue leadership achievement, not P&L ownership. The Winslow hire (ex-Salesforce SVP, Office of the CEO) is a strong enterprise credibility signal. Gap: no named VP of Product for a company building 15 integrated modules.

**Market position**: AuraSell operates in a $90B+ CRM market undergoing AI-driven disruption, but the realistic near-term addressable market (mid-market buyers not locked into Salesforce enterprise agreements) is much smaller and shared with 10+ funded competitors. The window where challengers could establish beachheads before incumbents responded has narrowed significantly.

**GTM OS pivot**: In February 2026 -- six months after launching as a Salesforce replacement -- AuraSell launched an overlay that works atop existing CRMs. This is the most important strategic signal. It either represents a pragmatic Trojan horse (bull) or a reactive concession that the standalone CRM replacement was not gaining traction (bear). Rox AI chose this approach from inception and reached ~$8M ARR faster. The company has not publicly explained the pivot's causation.

**Traction**: Thin. Two named mid-market customers (AVO Automation, MobiClocks). 41M agent runs is company self-reported from a single press release with no definition of what constitutes a "run." Customer outcome claims (70-80% task reduction, 35% velocity increase at AVO) are unaudited. No disclosed ARR, no enterprise pipeline confirmed, no SOC 2 certification.

## Financial Picture

| Metric | Value | Confidence |
|--------|-------|------------|
| ARR | $0-$2M (est.) | Very Low |
| Gross Margin | 50-75% (est.) | Very Low |
| Monthly Burn | $900K-$1.05M (current); $1.3-1.6M by Q4 2026 | Low |
| Remaining Cash | ~$23.5M (est.) | Medium |
| Effective Runway | 15-19 months (accelerating burn) | Low |
| Burn Multiple | ~22x (est.) | Very Low |
| Implied Seed Post-Money | $100M-$200M (undisclosed) | Very Low |

**Critical financial unknown**: A 10-100x variance in AI inference cost estimates ($0.001/run vs. $0.01-$0.05/run) directly determines whether gross margins are 75% (SaaS-like) or 50% (AI services-like). At $0.01/run with 41M monthly runs, inference alone costs $410K/month -- potentially exceeding total revenue. Combined with undisclosed data licensing costs for ~870M contacts, gross margins could be structurally challenged. This is the single most important unit economics question and neither estimate is sourced from the company.

**Down-round risk**: At the implied seed valuation, AuraSell needs $3-5M ARR to support a non-dilutive Series A. With a sales motion stood up in February 2026, enterprise sales cycles of 3-6+ months, no SOC 2, and 10+ funded competitors, reaching that ARR in the fundraising window is aggressive. Estimated 40-60% probability of a flat or down round at Series A.

## Product and Technology

**Architecture**: AI-native data model designed for LLM/agent traversal -- vector/graph representations, event-driven schemas, unified context objects per deal. Two deployment modes: standalone CRM replacement and GTM OS overlay atop Salesforce/HubSpot. 15+ integrated modules including native CPQ, call intelligence (Whisper), Monte Carlo forecasting, and agentic automation with 200+ integrations.

**Where AuraSell genuinely differentiates**: Unified context layer with every signal in a single data model. Natural language enrichment UX that is distinctly ahead of competitors. Native CPQ and forecasting that Rox lacks. Price disruption (~$375/user/month vs. $600-$1,200/user/month multi-tool stack).

**Central product risk**: Module depth vs. specialist competitors. CPQ, forecasting, and conversation intelligence are each multi-year engineering efforts where Conga, Clari, and Gong spent 5-10 years building depth. AuraSell built functional equivalents of all three in ~15 months. Enterprise buyers will eventually demand feature parity with specialists in their specific use case. This is the most plausible path by which otherwise happy early customers churn.

**SOC 2 constraint**: No security certifications disclosed at seven months. Enterprise procurement will not close without SOC 2. SOC 2 Type II takes 12-18 months from initial audit engagement. If not already in process, the enterprise GTM motion is selling into a wall -- a company hiring a CMO and VP RevOps to build enterprise pipeline while lacking SOC 2 is a structural mismatch.

**Data asset caveat**: The ~870M contact database is almost certainly licensed from third-party providers. This is a commodity feature with ongoing cost exposure, not a proprietary moat. If a data provider restricts access, this capability collapses.

## Risk Assessment

### Deal Breakers

No hard stops identified, but three conditions are borderline and must be resolved before commitment:

| Flag | Severity | Status |
|------|----------|--------|
| No SOC 2 / ISO 27001 at 7 months post-launch | Near Hard Stop | Unresolved |
| No ARR disclosed; no confirmed figure under NDA | Gating Condition | Unresolved |
| 870M contacts with no disclosed GDPR/CCPA compliance posture | High Risk | Unquantified |

### Key Assumptions

1. **AI-native architecture delivers materially superior outcomes vs. Agentforce** -- Unvalidated. No independent benchmarks. AVO results are company-reported.
2. **$3-5M ARR achievable in 12-15 months for non-dilutive Series A** -- Negative lean. Sales motion stood up Feb 2026; Rox reached $8M ARR faster via wrap-and-extend.
3. **GTM OS creates defensible land-and-expand to full CRM replacement** -- Unvalidated. No conversion data. Pivot may have been reactive.
4. **Gross margins sustainable at 65%+** -- Unvalidated. 10-100x cost variance unresolved. No margin data disclosed.
5. **Salesforce Agentforce leaves a 2-3 year displacement window** -- Negative lean. $800M ARR, AELA bundling, every top-10 Q4 deal included Agentforce.

### Unknowns Inventory

**Critical** (could change go/no-go): Actual ARR and customer count. Gross margin net of AI inference and data licensing. GTM OS pivot causation. SOC 2 status and timeline.

**Important** (affects conviction): Rox AI head-to-head win/loss data. Data provider identity and contract terms. Enterprise pipeline (500+ employee pilots). Agent run breakdown by paying vs. free-tier and complexity. Actual seed post-money valuation.

**Nice to know**: Attio's actual valuation. Clay's precise ARR at Series C. AuraSell's specific LLM vendor(s).

## Section Health

| Section | Health | Notes |
|---------|--------|-------|
| Team | Green | Eubanks' CRO track record (Harness, Twilio) is genuinely rare at seed stage. Winslow from Salesforce adds enterprise credibility. Gap: no VP Product. |
| Product | Yellow | Real product with active usage and full-stack replacement customers. No security certs, module depth unproven, data moat is licensed. |
| Market | Yellow | TAM real ($90B+) but near-term addressable market smaller and shared with 10+ funded competitors. Timing window partially closed. |
| Traction | Red | Two mid-market customers, no disclosed ARR at 7 months, flagship metric unverified and undefined. |
| Financials | Red | Almost no confirmed data. Revenue, margins, burn all estimated. Burn multiple likely 22x+. Down-round risk 40-60%. |
| Competition | Yellow | Salesforce Agentforce ($800M ARR) and Rox AI ($1.2B, ~$8M ARR) are both formidable. $300M+ deployed into category. |
| Risks | Yellow | Well-identified but narrative tends to soften them. SOC 2 absence, AELA bundling, and margin uncertainty are most acute. |

## Critique Summary

### Analytical Critic
- All core traction metrics (41M runs, AVO outcomes, "every customer expanded") trace to a single company press release -- single point of failure in the evidence base
- 10-100x discrepancy in AI inference cost estimates between financial and product analyses is unresolved and directly determines margin viability
- Eubanks framing was inflated (CRO, not founder at Harness); Clay used as a seed-stage comparable was a category error; seed valuation estimate used median dilution on a non-median round

### Bear Case Critic
- Salesforce Agentforce ($800M ARR, 29K deals, AELA bundling) is already neutralizing the cost-savings narrative that anchors AuraSell's pitch
- Zero revenue visibility at 7 months + implied $100-200M seed valuation creates a down-round trap with estimated 40-60% probability
- The AI-native CRM horse race has too many horses ($300M+ deployed) -- category dynamics favor attrition, not breakout. Historical pattern (Freshworks, Outreach) shows CRM challengers get acquired or plateau, not displace Salesforce

### IC Partner Critic
- Non-negotiable pre-term-sheet: actual ARR, gross margins, SOC 2 status -- "Any investor writing a check without this number is flying blind"
- Return math at $100-200M entry requires $1.2-2B+ exit; most likely positive outcome is $500M-$2B acquisition (4-8x seed, not a fund returner at scale)
- **Recommendation**: Conditional interest. Proceed if ARR >$1M with enterprise pilot, gross margins 65%+, SOC 2 in process. Pass if ARR <$500K; revisit in 90 days.

### External Critic (Groq / Llama-3.3-70B)
- Pattern matches more closely with losers (Siebel trajectory) than winners, primarily due to competitive crowding and Salesforce's speed of AI response
- The single biggest differentiator between winners and losers in similar situations is adaptability -- the GTM OS pivot is AuraSell's key test of this capacity
- Comparable metrics cannot be assessed due to financial opacity; Rox AI's $8M ARR and Attio's 5,000 customers provide the benchmarks AuraSell must be measured against

## Recommended Next Steps

1. **Obtain ARR and customer count under NDA** -- non-negotiable before any term sheet conversation
2. **Request gross margin data**: AI inference cost per agent run, data licensing cost per customer, blended gross margin
3. **Confirm SOC 2 status**: Is audit in process? Target certification date?
4. **Management call on GTM OS pivot**: What drove the timing? Pipeline breakdown pre/post-pivot by objection type
5. **Customer reference call**: Speak directly with AVO Automation CRO (Faisal Hassan) to verify outcomes independently
6. **Competitive intelligence**: Talk to a RevOps leader evaluating AuraSell alongside Rox and Agentforce
7. **Data provider diligence**: Identify who supplies the ~870M contacts, review contract terms
8. **Cap table review**: Obtain actual post-money valuation from seed round

## Source Versions

| Artifact | Round | Date |
|----------|-------|------|
| research.md | 2 (refined) | 2026-03-17 |
| financial.md | 2 (refined) | 2026-03-17 |
| product.md | 2 (refined) | 2026-03-17 |
| first-principles.md | 1 | 2026-03-17 |
| assessment.md | 1 | 2026-03-17 |
| critiques/analytical.md | 1 | 2026-03-17 |
| critiques/bear.md | 1 | 2026-03-17 |
| critiques/ic.md | 1 | 2026-03-17 |
| critiques/groq.md | 2 (new) | 2026-03-17 |

## Evolution Notes (Round 1 to Round 2)

Six substantive changes were made during round 2 refinement, all driven by critique feedback:

1. **Eubanks framing corrected**: Round 1 research attributed Harness's $1M-to-$100M ARR growth as a founder achievement. Round 2 correctly frames Eubanks as CRO (revenue leader) at Harness, not founder. The achievement is real and directly relevant but should not be conflated with P&L ownership. Harness was founded by Jyoti Bansal.

2. **Rox AI added as primary competitor**: Round 1 omitted Rox AI entirely from the competitive landscape -- a significant gap identified by all three internal critics. Round 2 positions Rox ($1.2B valuation, ~$8M ARR, Sequoia/GC-backed, wrap-and-extend from day one) as the most directly comparable competitor and the most important competitive benchmark.

3. **Traction metrics tempered**: Round 1 treated "41M agent runs" and AVO Automation outcomes as moderate traction signals. Round 2 applies systematic caveats: single-source company press release, "agent run" definition unknown, customer outcomes unaudited, "every customer expanded" is statistically meaningless with two customers.

4. **Salesforce threat elevated**: Round 1 acknowledged Salesforce Agentforce but softened it with the Siebel analogy. Round 2 uses updated Q4 FY2026 data ($800M standalone ARR, 29K deals, 169% YoY growth, AELA bundling) and explicitly notes the Siebel analogy is structurally flawed -- Salesforce can add AI far more easily than Siebel could add cloud.

5. **AI cost variance flagged as critical unknown**: Round 1 financial analysis estimated $0.001/run ($41K/month) while product analysis estimated $0.01-$0.05/run ($410K-$2M/month). Round 2 elevates this 10-100x discrepancy as the single most important unit economics question, with both scenarios modeled and implications for gross margin, capital requirements, and business viability spelled out.

6. **GTM OS pivot presented with both interpretations**: Round 1 defaulted to the charitable "Trojan horse" reading. Round 2 presents the bull interpretation (pragmatic beachhead) and bear interpretation (reactive signal that standalone CRM was stalling) side by side, explicitly notes that Rox chose this approach first with stronger traction, and flags that the company has not publicly explained the pivot's causation.
