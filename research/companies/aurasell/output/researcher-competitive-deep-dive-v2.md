---
entity: "AuraSell"
type: competitive-deep-dive
description: "competitive-deep-dive"
date: "2026-03-17T15:00:00+08:00"
source: "researcher (opus)"
round: 2
---

# Competitive Deep Dive: 11x and Emerging AI Sales Competitors

## Purpose

This report analyzes 11x.ai and other emerging AI sales agent competitors from an AuraSell investment perspective. The focus is on competitive dynamics that affect AuraSell's positioning, market opportunity, and risk profile. This supplements the existing competitive landscape coverage of Rox AI, Salesforce Agentforce, Attio, Monaco, and Day AI in AuraSell's primary research.

---

## 1. 11x.ai -- Deep Dive

### Company Overview

- **Founded**: 2022 by Hasan Sukkar (ex-McKinsey)
- **HQ**: San Francisco (relocated from London, July 2023)
- **Total Raised**: ~$76M across 3 rounds
- **Valuation**: ~$350M (as of Series B, Nov 2024)
- **Headcount**: ~48 (as of 2024)
- **Confirmed Customers**: Pleo, Rho (confirmed by TechCrunch investigation). Siemens, Airtable, ElevenLabs listed on marketing materials but Airtable and ZoomInfo denied being customers
- **CEO**: Prabhav Jain (since May 2025; founder Hasan Sukkar stepped down to non-executive chairman)

### Funding History

| Date | Round | Amount | Lead Investor | Valuation |
|------|-------|--------|---------------|-----------|
| 2023 | Seed | ~$2M | Undisclosed | N/A |
| Sep 2024 | Series A | $24M | Benchmark | ~$90M |
| Nov 2024 | Series B | $50M | Andreessen Horowitz | ~$350M |

The 4x valuation jump from Series A to Series B in under 3 months was aggressive even by 2024 AI standards, and subsequent events suggest the metrics supporting it were questionable.

### Products

**Alice (AI SDR)**: Autonomous outbound prospecting agent that sources leads, researches prospects, writes personalized email sequences, and books meetings. Operates across email and social channels. Claims 2% reply rate (comparable to human SDRs). Supports 105+ languages. Integrates with CRMs for lead data enrichment and resurrection.

**Jordan/Mike (AI Phone Agent)**: Handles inbound lead qualification and consented outbound calls in 30+ languages. Tailors conversations to brand voice. Executes follow-ups including CRM updates and meeting scheduling. Reports of issues with accent recognition and handling complex objections.

**Product Philosophy**: 11x positions as "digital workers" -- full role replacements, not copilots or tools. Each product replaces a specific human function (SDR, phone rep) rather than augmenting an existing workflow. This is fundamentally different from AuraSell's platform approach.

### Technical Architecture

Based on a detailed ZenML case study, 11x rebuilt Alice from scratch in late 2024 (launched as Alice 2.0 in January 2025):

- **Framework**: LangGraph/LangChain suite (TypeScript), LangSmith for observability
- **Architecture**: Hierarchical multi-agent system with a supervisor node routing to four specialized sub-agents (researcher, positioning report generator, LinkedIn writer, email writer)
- **LLMs**: OpenAI and Anthropic models (multi-model)
- **Infrastructure**: Google Cloud Platform, FastAPI backend, PostgreSQL
- **Performance**: ~2M leads sourced, ~3M messages sent, ~21,000 replies (as of Jan 2025 rebuild launch)

The architecture is relatively standard LLM application infrastructure. There is no evidence of proprietary model training or unique technical IP beyond the orchestration layer. The "moat" is workflow orchestration and data pipelines, not model capabilities.

### The 11x Controversy -- A Cautionary Tale

In March 2025, TechCrunch reported that 11x had been claiming companies as customers that were not active customers. Key findings from nearly two dozen sources including investors and current/former employees:

- **False customer claims**: ZoomInfo and Airtable both told TechCrunch they were not customers and never gave permission for logo use. ZoomInfo's lawyer threatened legal action citing "deceptive trade practices, trademark infringement, misappropriation of goodwill, and false advertising."
- **Revenue manipulation**: 11x sold one-year contracts with a 90-day break clause but counted the full annual contract value even after customers exercised the break clause and stopped paying. One employee stated the company claimed ~$14M ARR when actual contracts past the trial period totaled only ~$3M.
- **Severe churn**: Former employees reported 70-80% customer loss rates. 11x's own statement acknowledged "highest churn" in "initial cohorts in late 2023" but claimed a current 79% retention rate.
- **Workplace culture**: Reports of 60-hour work weeks, public call-outs over Slack, high turnover, and concerns about timely salary payments.

**CEO departure (May 2025)**: Two months after the TechCrunch expose, founder Hasan Sukkar stepped down as CEO. CTO Prabhav Jain (ex-Brex, joined August 2024) took over. The company framed this as a planned leadership transition for scaling, but the timing -- six weeks after the fake customers story -- suggests the board acted.

### Revenue and Traction -- What We Actually Know

- **Claimed ARR**: Approaching $10M (company statement, late 2024)
- **Estimated actual ARR**: ~$3M based on contracts past trial period (employee source, March 2025)
- **Latka data**: $2M revenue with 48-person team (2024)
- **Churn**: 70-80% of customers lost (employee reports) vs. 79% retention claimed by company
- **Pricing**: ~$5,000/month ($50-60K/year) with annual contracts and 90-day break clauses

The gap between claimed and actual revenue is material. For investment analysis purposes, 11x's actual ARR is likely in the $2-5M range as of early 2026, substantially below the $10-14M figures the company has cited.

### Go-to-Market

11x initially targeted SMB with a self-serve motion but pivoted to mid-market/enterprise with demo-led sales, white-glove onboarding, and dedicated customer success. Pricing at $50-60K/year positions as a "role replacement" cost (cheaper than a human SDR at $60-80K fully loaded). Annual contracts with break clauses are designed to reduce friction but create the revenue recognition issues described above.

### 11x vs. AuraSell -- Head-to-Head Analysis

**Different competitive categories**: 11x and AuraSell are not direct competitors in the traditional sense. They operate in adjacent but distinct segments:

| Dimension | 11x | AuraSell |
|-----------|-----|----------|
| **Core thesis** | Replace human SDRs with digital workers | Replace 15+ sales tools with unified AI platform |
| **Product scope** | Narrow (outbound SDR, phone) | Broad (CRM, enrichment, CPQ, forecasting, coaching) |
| **Buyer** | VP Sales / SDR manager | CRO / VP RevOps |
| **Competitive displacement** | Human headcount | Software spend (Salesforce + 10 tools) |
| **Revenue model** | Per-worker (~$60K/year) | Per-user SaaS (est. $20K+/year) |
| **Architecture** | Point agents on LangChain stack | Unified data model with AI execution layer |
| **Maturity** | ~3 years, $76M raised, controversy-damaged | ~7 months public, $30M raised, pre-traction |
| **Moat** | Workflow orchestration (weak) | Data model + integration depth (unproven) |

**Where 11x threatens AuraSell**: If 11x (or similar AI SDR players) captures the outbound prospecting wedge and expands into broader GTM, they could pre-empt AuraSell's "agentic prospecting" module. A company already using Alice for outbound has less incentive to adopt AuraSell's prospecting features. However, 11x's execution problems make this a weaker threat than it appeared 12 months ago.

**Where AuraSell has structural advantage over 11x**: AuraSell's unified data model means its prospecting agents operate on the same context as deal management, forecasting, and CPQ. An AI SDR that writes emails without real-time deal context, conversation intelligence, or account relationship history will produce lower-quality outreach than one embedded in the full revenue lifecycle. This is AuraSell's core architectural bet and it directly counters point-solution AI SDRs.

**Net assessment**: 11x is a cautionary competitor, not a mortal threat. Its controversy, churn problems, and narrow product scope reduce the competitive pressure on AuraSell. The bigger lesson from 11x is category-wide: AI SDR tools struggle with retention because the output (personalized emails that book meetings) is easily measurable, and when results disappoint, customers churn fast. AuraSell's broader platform creates more switching cost surface area, which should produce better retention -- but only if the individual modules deliver sufficient depth.

---

## 2. Other Emerging Competitors

### Artisan AI (Ava)

- **Founded**: 2023 by Jaspar Carmichael-Jack and Sam Stallings
- **Total Raised**: ~$38.3M ($2.3M pre-seed + $11.5M seed + $25M Series A from Glade Brook Capital, HubSpot Ventures)
- **Product**: Ava, an AI BDR that discovers leads from 300M+ B2B contacts, researches them, writes personalized messages, and books meetings
- **Pricing**: $1,500-$2,000/month (annual contracts)
- **Y Combinator W24 cohort**
- **New CTO**: Ming Li (ex-VP Technology at Deel, ex-Rippling, TikTok, Google)

**Product quality concerns**: Multiple verified user reviews report bland/generic messaging, zero reply rates after 1,000+ emails sent, DNS errors, broken warm-up timers, and UI glitches. Ava lacks conversation memory across threads and cannot adjust tone based on replies. Users who succeed treat it as a productivity multiplier requiring weekly human oversight, not an autonomous replacement.

**Marketing controversy**: Artisan's "Stop Hiring Humans" billboard campaign in San Francisco generated backlash. LinkedIn accounts of team members faced restrictions for suspected spam/automation violations.

**AuraSell relevance**: Low-to-moderate. Artisan operates in the same "AI SDR" category as 11x but at a lower price point and earlier maturity. Not a direct CRM/platform competitor. The product quality issues reinforce the pattern that standalone AI SDR tools struggle with output quality.

### Relevance AI

- **Founded**: Australia-based
- **Total Raised**: $37M (including $24M Series B led by Bessemer Venture Partners, May 2025)
- **Product**: Low-code platform for building and managing AI agents, including sales workflows. Drag-and-drop interface for creating custom AI SDR workflows, lead scoring, CRM updates, and reporting
- **Traction**: 40,000 AI agents registered on platform in January 2025 alone
- **Customers**: Qualified, Activision, Safety Culture
- **Key feature**: "Workforce" -- visual multi-agent system builder for domain experts

**AuraSell relevance**: Moderate. Relevance AI is a horizontal AI agent platform, not a sales-specific tool. It competes with AuraSell's upcoming "no-code custom agent builder" capability. If Relevance AI captures the RevOps buyer who wants to build their own sales agents on a general platform rather than buy a pre-built CRM, it could erode AuraSell's platform ambition. However, Relevance AI lacks CRM, CPQ, forecasting, and conversation intelligence -- it is a building platform, not a complete solution.

### AiSDR

- **Founded**: 2023, San Francisco
- **Funding**: Seed-stage (amount undisclosed)
- **Product**: AI agent for outbound prospecting across email, phone, and LinkedIn. Live AI search for real-time prospect list building. Sends multimedia messages (videos, memes, voice notes). Handles objections and qualifies interest before booking meetings
- **Pricing**: Starting at $900/month (quarterly contracts) -- notably transparent and affordable compared to 11x
- **Differentiation**: Signal-based targeting (monitors job changes, funding events, competitor mentions in earnings calls)

**AuraSell relevance**: Low. AiSDR is an early-stage point solution in the AI SDR category. It is not a platform competitor and is unlikely to expand into CRM/GTM territory given its funding level.

### Regie.ai

- **Product**: Autonomous AI prospecting agents for multi-channel campaigns (email, phone, social). RegieOne positions as the "first AI Sales Engagement Platform"
- **Pricing**: Flat $35,000/year + $150/rep/month for AI dialer
- **Positioning**: More of a sales engagement platform (Outreach/Salesloft competitor) with AI layered on top

**AuraSell relevance**: Moderate. Regie.ai occupies a similar space to Outreach/Salesloft -- precisely the engagement tools AuraSell aims to replace. If Regie.ai successfully adds AI autonomy to traditional sales engagement, it could defend the engagement category against AuraSell's consolidation thesis.

### Landbase

- **Founded**: 2024 by Daniel Saks (former AppDirect co-CEO)
- **Traction**: 825% revenue growth in 2025, scaling from 10 to 150+ customers
- **Product**: AI-powered outbound platform
- **AuraSell relevance**: Low-moderate. Notable mainly for the rapid growth signal, which shows the AI SDR market is expanding fast despite quality concerns.

---

## 3. Competitive Comparison Table

| Dimension | AuraSell | 11x | Artisan (Ava) | Rox AI | Relevance AI |
|-----------|----------|-----|---------------|--------|-------------|
| **Category** | AI-native CRM/GTM OS | AI digital workers (SDR, phone) | AI BDR | AI GTM overlay | AI agent builder platform |
| **Founded** | 2023 (public Aug 2025) | 2022 | 2023 | 2024 | ~2021 |
| **Total Raised** | $30M (seed) | $76M (Series B) | $38M (Series A) | $50M (Series A) | $37M (Series B) |
| **Valuation** | ~$120-150M (est.) | $350M (Nov 2024) | Not disclosed | $1.2B (Mar 2026) | Not disclosed |
| **Revenue** | Not disclosed (est. <$1M) | $2-5M actual (disputed) | ~$5M (est.) | ~$8M (projected) | ~$2.9M (est.) |
| **Product Scope** | 15+ modules (CRM, CPQ, enrichment, forecasting, coaching, call intel) | 2 products (Alice SDR, Jordan/Mike phone) | 1 product (Ava BDR) | GTM overlay with agent swarm | Horizontal agent builder |
| **Pricing** | ~$20K+/year per user | ~$60K/year per worker | ~$18-24K/year | Not public | Tiered (free to enterprise) |
| **CRM Replacement** | Yes (standalone + overlay) | No | No | No (wrap-and-extend) | No |
| **Named Customers** | AVO Automation, MobiClocks | Pleo, Rho (confirmed) | Not disclosed | Ramp, MongoDB, New Relic | Qualified, Activision |
| **Key Risk** | No revenue, crowded market | Credibility damaged, high churn | Product quality | Narrow scope, high valuation | Not sales-specific |
| **Integrity Issues** | None disclosed | Fake customer claims, ARR manipulation (TechCrunch Mar 2025) | Marketing backlash, LinkedIn bans | None disclosed | None disclosed |

---

## 4. Implications for AuraSell Investment Thesis

### What 11x's Struggles Tell Us

**Positive signal for AuraSell's platform thesis**: 11x's 70-80% churn rate demonstrates that narrow AI SDR tools face a fundamental retention problem. When the only measurable output is "meetings booked," customers can quickly determine whether the tool delivers ROI and churn if it does not. AuraSell's broader platform -- spanning CRM, enrichment, CPQ, forecasting, and coaching -- creates more switching cost surface area and more dimensions of value that are harder to unbundle and evaluate in isolation.

**Negative signal for the AI sales agent category broadly**: 11x's fake customer claims, ARR manipulation, and the CEO ouster suggest the AI sales agent space is experiencing a credibility crisis. Investor diligence on all companies in this space should be heightened. AuraSell's "41M agent runs" metric, while not fabricated as far as we know, shares the same fundamental problem as 11x's inflated metrics: it is company self-reported, undefined, and unverifiable.

**AI SDR as a commodity wedge**: The proliferation of AI SDR tools (11x, Artisan, AiSDR, Regie, Landbase, and dozens of smaller players) at price points ranging from $900/month to $5,000/month suggests outbound email automation is commoditizing rapidly. AuraSell should not depend on prospecting as a differentiated feature -- it is table stakes. The defensible value lies in the unified data model, CPQ, forecasting, and conversation intelligence where fewer competitors operate.

### Updated Competitive Threat Ranking (for AuraSell)

1. **Salesforce Agentforce** (Critical): Unchanged. $800M ARR, 29K deals, AELA bundling. The primary threat.
2. **Rox AI** (High): Unchanged. $1.2B valuation, ~$8M ARR, wrap-and-extend from day one. Most direct competitor.
3. **11x** (Medium, declining): Credibility damage, high churn, narrow product scope. A cautionary peer, not a mortal threat. The bigger risk is the category dynamic 11x represents -- dozens of well-funded AI SDR tools fragmenting the buyer's attention.
4. **Artisan/AiSDR/Regie** (Low-Medium): Point solutions in the AI SDR space. Individually weak competitors to AuraSell's platform play. Collectively, they add to the "too many horses" noise.
5. **Relevance AI** (Low-Medium): Horizontal AI agent platform. Could become relevant if AuraSell's custom agent builder becomes a key differentiator.

### Bear Case Reinforcement

The 11x deep dive reinforces the existing bear case on several dimensions:

- **Category credibility risk**: 11x's scandal may cause enterprise buyers to be more skeptical of all AI sales startups, increasing AuraSell's sales cycle length and proof-of-concept requirements
- **AI SDR commoditization**: The feature AuraSell shares most directly with 11x (agentic prospecting) is becoming a commodity. This is not where AuraSell should try to differentiate.
- **Churn risk is real**: If 11x -- with $76M raised and Benchmark/a16z backing -- cannot retain customers, AuraSell must demonstrate its broader platform creates genuinely stronger retention mechanics. No data on this exists yet.

### Bull Case Support

- **Platform beats point solutions**: 11x's struggles validate the thesis that narrow AI tools face retention challenges that platforms can potentially avoid
- **Architectural advantage matters**: 11x's standard LangChain/LangGraph stack vs. AuraSell's claimed purpose-built data model represents a genuine technical differentiation if AuraSell's architecture delivers better AI agent performance
- **Market is expanding**: AI SDR market projected to reach $5.2B in 2026 (Fortune Business Insights), growing 30%+ annually. The adjacent categories AuraSell targets (CRM, engagement, intelligence) expand this to $100B+

---

## 5. Key Questions for AuraSell Management (Competitor-Focused)

1. **How does AuraSell's agentic prospecting differentiate from 11x/Artisan/AiSDR?** What is the measurable quality difference when emails are generated from a unified data model vs. a standalone AI SDR?
2. **What is AuraSell's customer retention rate?** Given 11x's 70-80% churn, what evidence exists that AuraSell's platform approach produces better retention?
3. **Has the 11x scandal affected enterprise buyer willingness to evaluate AI sales tools?** Are prospects citing credibility concerns about the AI sales agent category?
4. **How does AuraSell plan to avoid the AI SDR commoditization trap?** Is prospecting a wedge feature or a long-term differentiator?
5. **Which competitor has AuraSell encountered most in deals?** Win/loss data against 11x, Rox, and others?

---

## 6. Information Gaps

- **11x post-controversy metrics**: No reliable data on 11x's current ARR, customer count, or retention after the CEO transition and product re-platforming. The company may have recovered under Prabhav Jain's leadership but no evidence is available.
- **Artisan traction**: No disclosed ARR or customer count. Product quality concerns are based on user reviews, not verified data.
- **AuraSell head-to-head data**: No win/loss data exists for AuraSell vs. any competitor. AuraSell's sales motion was only stood up in February 2026.
- **11x investor response**: No public information on how Benchmark and a16z responded to the fake customer controversy. Down-round risk on next financing is probable but unconfirmed.

---

## Sources

See sources.yaml for full list. Key sources for this competitive analysis:
- [11x.ai -- fake customer claims (TechCrunch, Mar 2025)](https://techcrunch.com/2025/03/24/a16z-and-benchmark-backed-11x-has-been-claiming-customers-it-doesnt-have/)
- [11x CEO steps down (TechCrunch, May 2025)](https://techcrunch.com/2025/05/05/11x-ceo-hasan-sukkar-steps-down/)
- [11x Series B -- $50M led by a16z (TechCrunch, Sep 2024)](https://techcrunch.com/2024/09/30/11x-ai-a-developer-of-ai-sales-reps-has-raised-50m-series-b-led-by-a16z-sources-say/)
- [11x multi-agent architecture (ZenML case study)](https://www.zenml.io/llmops-database/rebuilding-an-ai-sdr-agent-with-multi-agent-architecture-for-enterprise-sales-automation)
- [11x Alice product page](https://www.11x.ai/worker/alice)
- [11x AI Review 2026 (Reply.io)](https://reply.io/blog/11x-ai-review/)
- [11x revenue data (Latka)](https://getlatka.com/companies/11x.ai)
- [AI SDR market controversy analysis (AiSDR blog)](https://aisdr.com/blog/11x-techcrunch/)
- [Artisan Series A announcement](https://www.artisan.co/blog/artisan-series-a)
- [Artisan AI Review 2026 (Coldreach)](https://coldreach.ai/blog/artisan-ai-review)
- [Relevance AI $24M raise (TechCrunch, May 2025)](https://techcrunch.com/2025/05/06/relevance-ai-raises-24m-series-b-to-help-anyone-build-teams-of-ai-agents/)
- [AI SDR market size (MarketsandMarkets)](https://www.marketsandmarkets.com/Market-Reports/ai-sdr-market-83561460.html)
- [AI SDR market report (Research and Markets)](https://www.researchandmarkets.com/reports/6225977/ai-sales-development-representative-sdr-market)
- [Wing VC -- 11x AI growth flywheel](https://www.wing.vc/content/ai-growth-flywheel-11x-scaling-automated-sales-rep)
- [11x pricing analysis (Vendr)](https://www.vendr.com/marketplace/11x)
- [User Insight -- 11x as AuraSell competitor](../../../aurasell/user-insights/20260317-11x-competitor.md) [User Insight]
