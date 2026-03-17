---
entity: AuraSell
type: financial-analysis
date: 2026-03-17
analyst: financial-analyst (opus)
status: researched
---

# AuraSell -- Financial Analysis

## Revenue Model & Quality

- **Revenue type**: Recurring SaaS (annual subscriptions). [Confirmed] The platform charges annual subscription fees, with pricing reportedly starting at ~$20,000/year for smaller customers and scaling up for larger implementations.
- **Revenue quality**: Likely contracted annual commitments given enterprise/mid-market positioning. Recurring, not usage-based (though AI agent runs may introduce a consumption component over time). Revenue quality is potentially high if contracts are multi-year, but this is unconfirmed at this stage.
- **Customer concentration risk**: [Unknown] No public disclosure of customer count. Two named customers (AVO Automation, MobiClocks) are known from the November 2025 press release. At this stage, customer concentration risk is almost certainly high -- typical for a company less than 8 months old.
- **Revenue recognition**: Standard SaaS recognition expected (ratably over contract period). No services revenue disclosed that would complicate recognition. No red flags, but no detail available.

**Key gap**: AuraSell has not disclosed any revenue figures, ARR, or customer count publicly. The company is likely pre-revenue or very early revenue (sub-$1M ARR), given August 2025 founding, November 2025 GA launch, and absence of any revenue claims in press materials.

---

## Key Metrics

| Metric | Value | Source | Confidence |
|--------|-------|--------|------------|
| ARR/MRR | $0 - $2M ARR (est.) | Estimate based on stage/timing | Low |
| Growth Rate (YoY) | N/A (less than 1 year old) | -- | -- |
| Gross Margin | 70-80% (est.) | SaaS industry benchmark | Estimate |
| Net Revenue Retention | N/A (insufficient history) | -- | -- |
| Logo Churn | N/A (insufficient history) | -- | -- |
| ACV | $20K - $100K (est.) | Pricing page signals, mid-market target | Low |
| AI Agent Runs | 41 million (cumulative) | GlobeNewswire Nov 2025 | Confirmed |
| Employees | ~40 | Multiple sources | Confirmed |
| Total Raised | $30M | Multiple sources | Confirmed |

**ARR estimation methodology** [Estimated]: The company launched in August 2025, reached GA in November 2025, and has named two customers publicly. Assuming 5-15 paying customers by March 2026 at an estimated ACV of $30K-$80K yields a range of $150K-$1.2M ARR. A midpoint estimate of $500K ARR is reasonable but highly uncertain.

---

## Unit Economics

Unit economics analysis at this stage is necessarily speculative. AuraSell is pre-scale, and reliable LTV/CAC data requires at least 12-18 months of customer cohort history.

- **LTV**: [Estimated] Assuming a $50K ACV, 70% gross margin, and 3-year average customer lifetime (conservative for enterprise SaaS), LTV = $50K x 0.70 x 3 = $105K per customer. If net revenue retention exceeds 100% (plausible given "every customer expanded usage" claim), LTV could be materially higher.

- **CAC**: [Estimated] With ~40 employees and early-stage go-to-market, CAC is difficult to isolate. The company recently hired a CMO and VP of Revenue Operations (February 2026), suggesting a shift from founder-led sales to structured GTM. Early CAC is likely high on a per-customer basis given the small customer base, but blended CAC should decline as the sales motion matures. Estimate: $30K-$80K fully loaded CAC per enterprise customer at current scale.

- **Payback Period**: [Estimated] At $50K ACV and $50K estimated blended CAC, payback is approximately 12 months on a gross margin basis (50K x 0.70 = $35K year-1 gross profit, payback ~17 months). This is within acceptable range for enterprise SaaS.

- **LTV/CAC Ratio**: [Estimated] At $105K LTV / $50K CAC = 2.1x. Below the commonly cited 3x benchmark but acceptable for a company less than 1 year old. This ratio should improve as the sales motion scales and CAC declines.

- **Gross Margin per Customer**: [Estimated] At $50K ACV and 70% gross margin = $35K gross profit per customer per year. AI inference costs (for 41M+ agent runs) could pressure gross margins below typical SaaS levels. This is a key metric to monitor -- companies with heavy LLM inference costs have reported gross margins of 50-60% rather than the 75-85% typical of pure SaaS.

**Key unknowns**: Actual customer count, actual ACV distribution, AI inference cost per agent run, and whether the 41M agent runs figure includes free trials or only paying customers.

---

## Burn Rate & Runway

### Monthly Burn Estimate [Estimated]

**Headcount-based burn calculation**:
- 40 employees, headquartered in San Francisco
- Assumed average fully-loaded compensation (salary + benefits + equity): $180K-$220K/year per employee (blended across engineering, sales, G&A)
- Midpoint: $200K x 40 = $8M/year in compensation = ~$667K/month
- Add infrastructure costs (cloud compute, AI inference/API costs, data licensing for 85M company records and 850M contacts): estimated $100K-$200K/month
- Office, legal, travel, software: ~$50K-$100K/month
- **Total estimated monthly burn: $850K - $1.0M/month**
- **Annual burn estimate: $10M - $12M/year**

### Runway Estimate [Estimated]

- $30M raised in August 2025
- Approximately 7 months elapsed (August 2025 to March 2026)
- Estimated cash consumed: 7 x $900K = ~$6.3M
- **Estimated remaining cash: ~$23.5M - $24M**
- **Estimated runway: 23-28 months from today (into mid-to-late 2028)**

### Next Raise Timing [Estimated]

Given the current burn rate and assuming acceleration in hiring (the CMO and VP RevOps hires signal scaling), burn will likely increase to $1.2M-$1.5M/month over the next 6-12 months. A Series A raise is likely in Q4 2026 or Q1 2027, targeting 18+ months of runway from the raise date. The company will want to raise with meaningful ARR traction (ideally $2M-$5M ARR) to command a strong Series A valuation.

### Burn Multiple [Estimated]

If current ARR is ~$500K and annual net burn is ~$10M, the burn multiple is approximately 20x (net burn / net new ARR). This is extremely high but expected for a company less than 1 year old that is still building its sales motion. For reference, a burn multiple below 2x is considered excellent; below 4x is good. AuraSell needs to demonstrate rapid ARR acceleration to bring this into an acceptable range before the Series A.

---

## Cohort Trends

[Insufficient data] The company has been live for approximately 7 months. There is one public data point suggesting strong early engagement: "every AuraSell customer expanded their usage in the first few weeks of adoption" (November 2025 press release). The AVO Automation case study cites 35% increase in sales velocity, 70-80% reduction in manual task time, and 50% faster ramp time.

These are promising early signals but do not constitute cohort data. Key questions for diligence:
- Are the 41M agent runs from a handful of power users or broadly distributed?
- What is the contract renewal profile for the earliest customers (first renewals would come due around August-November 2026)?
- Are newer customers adopting faster than early adopters?

---

## Cap Table Analysis

### Round History

| Round | Date | Amount | Investors | Est. Dilution | Est. Post-Money |
|-------|------|--------|-----------|---------------|-----------------|
| Seed | Aug 2025 | $30M | N47, Menlo Ventures, Unusual Ventures | 20-25% | $120M - $150M |

**Valuation estimate methodology** [Estimated]: AuraSell's $30M seed is exceptionally large. The median US SaaS seed round in 2025 was $2.5-3.2M at a $14-20M post-money valuation. A $30M seed round at typical 20-25% dilution implies a $120M-$150M post-money valuation. This is in the top 1% of seed rounds. Note the round was oversubscribed at $40M and scaled back, suggesting investor demand could have supported an even higher valuation.

### Dilution and Ownership Estimates [Estimated]

- **Founders**: Assuming standard founder allocation and 20-25% seed dilution, co-founders (Jason Eubanks and Srinivas Bandi) likely retain 55-65% combined ownership post-seed, before option pool.
- **Option pool**: A typical seed-stage option pool is 10-15%. With 40 employees and plans to scale aggressively, an option pool of 12-15% is likely.
- **Investor ownership**: N47 (lead), Menlo Ventures, and Unusual Ventures collectively hold ~20-25%.
- **Liquidation preferences**: Standard 1x non-participating preferred is expected for a seed round of this profile. No senior preferences or ratchets expected at this stage.
- **Dead equity concerns**: None apparent. Both co-founders are active. No mention of departed co-founders or dormant shareholders.

### Cap Table Risk Factors

The exceptionally high seed valuation ($120M-$150M estimated) creates execution pressure. To achieve a meaningful step-up at Series A, the company needs to demonstrate ARR trajectory that justifies a $300M-$500M+ valuation within 12-18 months. If growth disappoints, the company risks a flat or down round, which would dilute existing shareholders and damage morale.

---

## Comparable Valuations

### Private Company Comparables

| Company | Stage | Funding | Valuation | Revenue Estimate | Multiple | Date |
|---------|-------|---------|-----------|-----------------|----------|------|
| Clay | Series C | $100M | $3.1B | ~$100M ARR | ~31x | Aug 2025 |
| Attio | Series B | $52M | N/A (est. $300-500M) | N/A | N/A | Aug 2025 |
| Day AI | Series A | $20M | N/A (est. $100-200M) | Pre-revenue/early | N/A | 2025 |
| AuraSell | Seed | $30M | $120-150M (est.) | Pre-revenue/early | N/A | Aug 2025 |

**Clay** is the most instructive comparable. [Confirmed] Clay reached $100M ARR with 10,000+ customers and received a $3.1B valuation (31x revenue multiple) at Series C. Clay's trajectory from seed to $3.1B took approximately 3-4 years. AuraSell's implied seed valuation of $120-150M is aggressive but not unreasonable if the company can capture even a fraction of Clay's growth trajectory.

**Attio** raised $116M total across four rounds, positioning as a modern CRM challenger. [Confirmed] Attio's Series B ($52M, August 2025) from GV suggests a valuation in the $300-500M range, but this is after multiple rounds of traction validation.

**Day AI** raised $24M total ($4M seed + $20M Series A from Sequoia). [Confirmed] Positioning as "the Cursor of CRM" with a focus on AI-native relationship management. Earlier stage, comparable ambition to AuraSell.

### Public Company Comparables

| Company | EV/Revenue (TTM) | Relevance |
|---------|-------------------|-----------|
| Salesforce (CRM) | ~7-8x | Incumbent; mature growth |
| HubSpot (HUBS) | ~12-15x | Mid-market CRM/GTM |
| Freshworks (FRSH) | ~5-7x | SMB/mid-market CRM |

Public company multiples are substantially lower than private growth-stage multiples, reflecting the premium for high growth rates. At scale, AuraSell would likely trade at 10-20x revenue if it maintains strong growth, or 5-8x if growth normalizes to market rates.

### Implied Valuation Range for AuraSell

At the current stage (pre-revenue/early revenue, seed), traditional revenue-based valuation is not applicable. The $120-150M implied post-money is driven by:
1. Team pedigree (proven operators from Twilio, Harness, VMware, Nutanix)
2. Market size ($30B+ Salesforce TAM plus adjacent tools)
3. Investor signal (28-hour close, oversubscribed, tier-1 VCs)
4. AI-native positioning in a hot market

For Series A (likely Q4 2026/Q1 2027), a reasonable target valuation would be $300M-$500M, requiring $3M-$5M ARR to support the step-up at 60-100x revenue multiples (typical for top-tier early-stage AI SaaS).

---

## Path to Profitability

### Current Trajectory [Estimated]

At an estimated $10-12M annual burn and sub-$1M ARR, AuraSell is deeply unprofitable. This is entirely expected and appropriate for a seed-stage company. Profitability is not a near-term goal.

### Break-Even Scenarios

**Scenario 1: Aggressive growth** -- If AuraSell reaches $20M ARR by 2028 with 75% gross margins and scales the team to ~150 employees ($30M annual compensation), operating break-even is achievable at $35-40M ARR (approximately 2029). This assumes the company raises a Series A ($30-50M) and Series B ($60-100M) to fund growth.

**Scenario 2: Capital-efficient path** -- If the company limits headcount growth to ~80 employees and achieves $10M ARR by 2028, break-even could come at $15-20M ARR (approximately 2029), but growth would be slower and the company would be less competitive in a fast-moving market.

### Capital Efficiency Relative to Peers

AuraSell's $30M seed is large, but the company ships with significant built-in data assets (85M company records, 850M contacts), suggesting the initial capital funded substantial data infrastructure. Capital efficiency will be measured by how quickly the company converts seed capital into repeatable revenue. The benchmark is Clay, which went from seed to $100M ARR in approximately 3-4 years with $204M total capital raised.

---

## Financial Red Flags

1. **Valuation risk**: [Estimated] The implied $120-150M post-money seed valuation sets a high bar. If the company cannot generate $3M+ ARR within 12-18 months, a flat or down round is possible. Down rounds at this stage can be company-threatening due to morale and talent retention impacts.

2. **Gross margin uncertainty**: The 41M agent runs suggest heavy AI inference usage. If each agent run costs even $0.001 in inference costs, that is $41K in compute for a pre-revenue company. As usage scales, AI compute costs could significantly compress gross margins below SaaS norms. The company needs to demonstrate a path to 70%+ gross margins at scale.

3. **Revenue opacity**: No revenue, customer count, or ACV data has been disclosed publicly. While this is common at seed stage, the absence of any revenue signal 7 months post-launch warrants attention. The company may be in extended beta/free pilot mode, which delays revenue recognition.

4. **Customer concentration**: With only two named customers (AVO Automation, MobiClocks), the revenue base (if any) is almost certainly concentrated. Loss of a single early customer would be material.

5. **Data asset costs**: Maintaining 85M company records and 850M contacts requires ongoing data licensing and infrastructure costs. This is a meaningful recurring expense that competitors with smaller data ambitions do not carry.

6. **Hiring acceleration**: The February 2026 CMO and VP RevOps hires signal the company is shifting into growth mode, which will increase burn rate. If revenue does not follow quickly, runway compression could force a fundraise from a position of weakness.

7. **No disclosed metrics**: The company has not shared any standard SaaS metrics (ARR, NRR, logo churn, ACV). For a company that raised $30M, this lack of transparency is not unusual at seed but should be resolved before the Series A process begins.

---

## Data Quality Assessment

| Data Point | Quality | Notes |
|------------|---------|-------|
| Funding amount ($30M) | High | Confirmed by multiple sources |
| Investors (N47, Menlo, Unusual) | High | Confirmed |
| Round speed (28 hours) | High | Confirmed by company and press |
| Employee count (~40) | Medium | Multiple sources but may be dated |
| Valuation | Low | Not disclosed; estimated at $120-150M |
| Revenue/ARR | Very Low | No public data; estimates only |
| Pricing ($20K+/yr starting) | Low | Single source reference |
| Customer count | Very Low | Only 2 named customers |
| Gross margins | Very Low | Estimated from industry benchmarks |
| AI inference costs | Very Low | No data available |

---

## Key Questions for Diligence

1. What is the current ARR and how many paying customers does the company have?
2. What is the actual ACV distribution and contract structure (annual vs. multi-year)?
3. What percentage of the 41M agent runs come from paying customers vs. free trials?
4. What is the AI inference cost per agent run, and what is the blended gross margin?
5. What does the data licensing cost structure look like for the 85M/850M record database?
6. What is the current pipeline and expected ARR by end of 2026?
7. What are the Series A fundraising plans -- timing, target size, and target valuation?
8. What is the actual post-money valuation from the seed round?

---

## Sources

See sources.yaml for full source list.

- [Aurasell Raises $30M Seed (FinSMEs)](https://www.finsmes.com/2025/08/aurasell-raises-30m-in-seed-funding.html)
- [TechFundingNews: Seed Announcement](https://techfundingnews.com/aurasell-raises-30m-seed-for-ai-native-crm-platform/)
- [The SaaS News: $30M Round](https://www.thesaasnews.com/news/aurasell-raises-30-million-in-seed-round)
- [GlobeNewswire: Rapid Growth Announcement (Nov 2025)](https://www.globenewswire.com/news-release/2025/11/13/3187410/0/en/Aurasell-Ends-Tool-Sprawl-With-Rapid-Growth-of-the-First-AI-Native-GTM-Platform.html)
- [GlobeNewswire: CMO and VP RevOps Hires (Feb 2026)](https://www.globenewswire.com/news-release/2026/02/11/3236507/0/en/Aurasell-Hires-CMO-and-VP-of-RevOps-to-Drive-Strategic-Growth-and-Execution-Amid-Rapid-Momentum.html)
- [SaaStr: AI App of the Week](https://www.saastr.com/ai-app-of-the-week-aurasell-the-ai-native-crm-thats-actually-replacing-15-tools/)
- [Clay $3.1B Valuation (Crunchbase News)](https://news.crunchbase.com/venture/ai-powered-gtm-startup-clay-valuation-doubles-capitalg/)
- [Clay $100M Revenue (Latka)](https://getlatka.com/companies/clay)
- [Attio $52M Series B](https://attio.com/blog/attio-raises-52m-series-b)
- [Day AI $20M Series A (Upstarts Media)](https://www.upstartsmedia.com/p/day-ai-sequoia-ai-crm)
- [US SaaS Seed Benchmarks 2025 (Metal)](https://www.metal.so/collections/us-saas-seed-round-benchmarks-2025-average-round-size-valuations-dilution)
- [AI Startup Funding Trends 2026 (Qubit Capital)](https://qubit.capital/blog/ai-startup-fundraising-trends)
