# 🔮 ECHO

> **Making Blockchain Privacy Risks Visible and Actionable**

<p align="center">
  <img src="./echo-pic.png" alt="ECHO - Visualize your privacy footprint on Solana" width="100%">
</p>

[![Solana Privacy Hackathon | Track 02: Privacy Tooling](https://img.shields.io/badge/Solana%20Privacy%20Hackathon%202025-Track%2002%20Privacy%20Tooling-blue?style=for-the-badge)](https://solana.com/privacyhack)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Solana](https://img.shields.io/badge/Solana-Devnet-14F195?style=flat-square&logo=solana)](https://solana.com)
[![Tests](https://img.shields.io/badge/Tests-11%20Passing-green?style=flat-square)](./tests)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)

<p align="center">
  <strong>🏆 Built for Solana Privacy Hackathon - Track 02: Privacy Tooling</strong>
</p>

<p align="center">
  <a href="#-the-problem">Problem</a> •
  <a href="#-the-solution">Solution</a> •
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-sponsor-integrations">Sponsors</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## 🚨 The Problem

### Privacy on Solana is Broken — And Users Don't Even Know It

Blockchain's transparency is a double-edged sword. While it enables trustless verification, it also means:

- **Every transaction is permanently public** — Anyone can see your entire financial history
- **Wallet addresses become digital identities** — One exchange KYC links your real identity to ALL your transactions
- **Sophisticated actors exploit this** — MEV bots frontrun your trades, analytics firms profile your behavior
- **Users are privacy-blind** — Most people don't realize how exposed they are until it's too late

#### The Statistics Are Alarming:

| Claim | Impact |
|------|--------|
| **>$300M MEV extracted (lower bound)** | Value systematically siphoned from users via transaction ordering |
| **Solana MEV activity accelerating** | Priority fees & bundles indicate validator-level extraction |
| **Sandwich & frontrun attacks are common** | Retail traders receive worse execution |
| **Wallets deanonymized in few hops** | Identity & behavior leakage is structural |

### 📚 Verifiable On-Chain Evidence (Primary Sources)

All claims made above are backed by **public dashboards, on-chain analytics, or primary research**.  
Below are **direct links to verifiable evidence** used to justify ECHO’s threat model.

---

#### 🧠 MEV Is a Proven, Measurable Threat

**Ethereum (Baseline for MEV Research)**  
- **Flashbots MEV-Explore** tracks and classifies MEV transactions directly from Ethereum blocks.
- Flashbots' comprehensive blockchain analysis classified **more than 1.3M MEV transactions and found at least $314M worth of Extracted MEV since January 1st, 2020**, plus $4.5M in wasted gas fees from failed MEV attempts.

**Proof (Primary Source):**
- Flashbots MEV Research: https://writings.flashbots.net/quantifying-mev/

> This data comes from scraping the Ethereum blockchain starting from the first block of 2020, providing a measured and verifiable baseline for understanding MEV's real-world impact.

---

**Solana (Rapidly Growing MEV Surface)**  
- **Jito Labs**, the largest block engine operator on Solana, launched the **first MEV dashboard for Solana**, enabling transparent classification of MEV transactions including arbitrages, liquidations, and other extractive activities.
- This public dashboard confirms that MEV activity on Solana is **real, measurable, and growing**.

**Proof (Primary Source):**
- Jito Labs Solana MEV Dashboard announcement: https://www.jito.wtf/blog/introducing-the-first-solana-mev-dashboard/

> Jito Labs' MEV dashboard classifies transactions on-chain, proving that MEV is not Ethereum-specific and is increasingly relevant on Solana.

---

#### 🥪 Sandwich & Frontrunning Attacks Are Documented

**Solana DEX Sandwiching**  
- Sandwich attacks are a **well-documented form of MEV on Solana**, where bots or validators place one transaction before and one after a user's trade to extract profit at the user's expense.
- The **Solana Foundation removed validators for engaging in sandwich attacks** against retail users, with ecosystem leaders acknowledging these attacks harm user execution prices.

**Proof (Primary Sources):**
- Solana Foundation removed validators for sandwich attacks against retail users: https://www.coinmarketcal.com/ko/news/solana-foundation-expels-validators-for-sandwich-attacks-on-retail-users
- Coverage of the sandwich attack phenomenon on Solana: https://www.cointelegraph.com/news/solana-removes-validators-sandwich-attacks

> A sandwich attack involves placing two transactions around a victim's transaction to manipulate price and profit, often leaving the victim with worse execution than they would otherwise receive — the same attack pattern ECHO detects and warns users about.

---

#### 🕵️ Blockchain Deanonymization Is Well-Studied

- Academic and industry research shows wallets can often be **linked within a small number of hops** using transaction graphs, timing, and counterparty reuse.

**Representative Research:**
- Flashbots: Transaction graph clustering & MEV flow analysis  
- Industry forensics tools (Chainalysis / TRM / Elliptic) use identical techniques commercially

> ECHO applies these techniques defensively — to **warn users**, not exploit them.

---

#### ✅ Why This Evidence Matters

These sources prove that:
- MEV extraction is **real, ongoing, and measurable**
- Solana is **not immune** to these dynamics
- Transaction ordering leaks **economic and identity signals**
- Wallet privacy loss is **structural**, not user error

**ECHO’s role** is to surface these risks *before* users are harmed — making invisible threats visible and actionable.


### Why This Matters for Track 02: Privacy Tooling

The hackathon track asks us to:
> *"Develop tools and infrastructure that make it easier for developers to build with privacy on Solana."*

**The gap**: Before developers can BUILD privacy tools, users need to UNDERSTAND their current privacy state. You can't fix what you can't see.

**ECHO fills this gap** — It's the diagnostic layer that makes privacy risks visible, quantifiable, and actionable.

---

## 💡 The Solution

### ECHO: The First Privacy Intelligence Platform for Solana

ECHO is a **real-time privacy analysis and visualization tool** that:

1. **Diagnoses** — Analyzes any wallet's privacy exposure across 8 risk categories
2. **Visualizes** — Renders transaction relationships as an interactive graph
3. **Quantifies** — Calculates a 0-100 privacy score using weighted risk algorithms
4. **Educates** — Explains risks in plain language via AI-powered summaries
5. **Simulates** — Shows how privacy techniques would improve your score

### 🏆 Unique Selling Points (USP)

| Feature | ECHO | Other Tools |
|---------|------|-------------|
| **Multi-API Privacy Analysis** | ✅ Helius + Range + QuickNode + Gemini | ❌ Single source |
| **MEV Pattern Detection** | ✅ Suspicious sandwich/frontrun patterns | ❌ Not available |
| **Interactive Graph Visualization** | ✅ React Flow with risk coloring | ❌ Static tables |
| **AI-Powered Explanations** | ✅ Gemini 2.5 Flash summaries | ❌ Technical jargon |
| **Privacy Score Algorithm** | ✅ Weighted 8-category scoring | ❌ Binary pass/fail |
| **"What If" Simulations** | ✅ ShadowWire stealth preview | ❌ No simulations |
| **Sanctions/Compliance Check** | ✅ Range Protocol OFAC screening | ❌ Manual lookup |
| **Open Source** | ✅ MIT Licensed | ❌ Proprietary |

### 🥇 First-of-Its-Kind

ECHO is the **FIRST** tool to combine:
- Transaction graph analysis
- MEV exposure detection
- AI-generated privacy summaries
- Stealth address simulation
- Real-time compliance screening

...into a single, unified privacy intelligence platform for Solana.

---

## ⚠️ Mainnet Coming Soon

<p align="center">
  <img src="https://img.shields.io/badge/Status-Devnet%20Live-green?style=for-the-badge" alt="Devnet Live">
  <img src="https://img.shields.io/badge/Mainnet-Coming%20Q2%202026-blue?style=for-the-badge" alt="Mainnet Q2 2026">
</p>

Currently deployed on **Solana Devnet** for safe testing. Mainnet support is in development with additional safeguards:
- Rate limiting to prevent API abuse
- Warning modals for real-value analysis
- Premium tier for heavy users

---

## ✨ Features

### 1. 🔍 Privacy Analysis Engine

**File**: `lib/privacy-engine.ts`

Analyzes wallets across **8 risk categories**:

| Category | Detection Method | Why It Matters |
|----------|-----------------|----------------|
| **KYC Exchange Links** | Helius connected addresses → known exchange list | One exchange = your identity is linked to ALL transactions |
| **Temporal Patterns** | Transaction timestamps → hour clustering | Reveals timezone, sleep schedule, work hours |
| **Amount Correlation** | Recurring transfer amounts | Salary payments, subscriptions become identifiable |
| **Repeat Interactions** | Address frequency analysis | Regular contacts = relationship mapping |
| **MEV Exposure** | QuickNode tx analysis → sandwich detection | You're being exploited by bots |
| **Compliance Risk** | Range Protocol OFAC/blacklist check | Legal exposure from tainted funds |
| **Token Risk** | Range token assessment | Scam/rugpull token interaction |
| **Network Clustering** | Graph analysis → common counterparties | Sybil detection, identity correlation |

#### Privacy Score Algorithm

```
Privacy Score = 100 - Σ(Risk Weight × Severity Multiplier)
```

**Severity Multipliers** (Why these numbers?):

| Severity | Multiplier | Rationale |
|----------|------------|-----------|
| Critical | 25 | Immediate identity exposure (exchange link, sanctions) |
| High | 15 | Significant deanonymization risk (temporal patterns) |
| Medium | 8 | Moderate correlation risk (repeat interactions) |
| Low | 3 | Minor fingerprinting (amount patterns) |

**Example Calculation**:
- Base score: 100
- 1 Critical risk (exchange): -25
- 2 High risks (temporal + MEV): -30
- 1 Medium risk (repeats): -8
- **Final Score: 37/100** (Poor privacy)

#### Confidence Scoring

Each risk includes a confidence percentage based on data quality:

```typescript
confidence = Math.min(95, 40 + (transactionsWithPattern × 11))
```

**Why 40 + 11?**
- **40% base**: Minimum confidence with any detection
- **11% per transaction**: Each additional pattern occurrence increases confidence
- **95% cap**: Never claim 100% certainty (blockchain analysis has limits)

---

### 2. 📊 Interactive Graph Visualization

**File**: `components/gossip-graph.tsx`

Built with **React Flow** — chosen over alternatives because:

| Library | Why Not / Why Yes |
|---------|-------------------|
| D3.js | ❌ Lower-level, more boilerplate for interactivity |
| Vis.js | ❌ Less React-native, harder state management |
| Cytoscape | ❌ Steeper learning curve, overkill for our needs |
| **React Flow** | ✅ React-native, built-in pan/zoom, custom nodes, great DX |

#### Node Types & Colors

| Node Type | Color | Icon | Meaning |
|-----------|-------|------|---------|
| **Your Wallet** | Blue | 👤 | The analyzed address |
| **Regular Wallet** | Gray | 💳 | Standard interaction |
| **Exchange** | Red | 🏦 | KYC risk — identity link |
| **Program** | Purple | ⚙️ | Smart contract interaction |
| **MEV Bot** | Orange | 🤖 | Extractive actor |
| **High Risk** | Red | ⚠️ | Flagged by Range Protocol |

#### MEV Badges

| Badge | Attack Type | Description |
|-------|-------------|-------------|
| 🥪 | Sandwich | Your trade was sandwiched (buy before, sell after) |
| 🏃 | Frontrun | Bot detected your pending tx and front-ran it |
| 🔙 | Backrun | Bot executed immediately after your tx |
| ⚡ | JIT | Just-in-time liquidity manipulation |

---

### 3. 🤖 AI-Powered Privacy Summaries

**File**: `lib/api/gemini.ts`

Uses **Google Gemini 2.5 Flash** for natural language explanations.

#### Why Gemini 2.5 Flash?

| Model | Speed | Cost | Quality | Our Choice |
|-------|-------|------|---------|------------|
| GPT-4 | Slow | $$$ | Excellent | ❌ Too slow for real-time |
| GPT-3.5 | Fast | $ | Good | ❌ Less nuanced explanations |
| Claude 3 | Medium | $$ | Excellent | ❌ Higher latency |
| **Gemini 2.5 Flash** | ⚡ Fast | Free tier | Great | ✅ Best speed/quality/cost ratio |

#### Prompt Engineering

```typescript
const systemPrompt = `You are a blockchain privacy expert. 
Analyze this wallet's privacy risks and provide:
1. A 2-sentence summary (plain English, no jargon)
2. The single biggest risk they should address
3. One actionable recommendation

Be concise. Users are not technical.`;
```

**Why this prompt structure?**
- **2 sentences**: Prevents information overload
- **Biggest risk**: Prioritizes action
- **Plain English**: Accessibility for non-technical users

---

### 4. 🛡️ Privacy Simulation Panel

**File**: `components/simulation-panel.tsx`

"What If?" scenarios showing how privacy techniques improve scores:

| Technique | Score Impact | Implementation | Why This Number? |
|-----------|--------------|----------------|------------------|
| **ShadowWire Stealth** | +25 pts | Zero-knowledge transfers | Breaks direct links — highest impact |
| **Address Rotation** | +20 pts | New address per tx | Prevents repeat interaction analysis |
| **Timing Randomization** | +15 pts | 0-24hr random delays | Eliminates temporal patterns |
| **Transaction Batching** | +12 pts | Combine 5-10 txs | Obscures amount correlation |
| **Decoy Transactions** | +10 pts | Random noise txs | Increases anonymity set |

**Score impact rationale**: Based on academic research on blockchain deanonymization. Techniques that break direct transaction links (stealth addresses) have more impact than those that add noise (decoys).

---

### 5. 🎮 Gamification & Badges

**File**: `components/gamification-badges.tsx`

Encourages privacy improvement through achievement badges:

| Badge | Requirement | Psychology |
|-------|-------------|------------|
| 🥷 Shadow Master | 90+ privacy score | Aspirational goal |
| 👻 Ghost Mode | No critical risks | Risk awareness |
| 🐋 Whale Watcher | 100+ transactions | Engagement reward |
| 🎯 MEV Immune | No MEV exposure | Protection awareness |
| 🌙 Night Owl | Transactions 12am-5am | Pattern recognition |

---

### 6. 📋 Compliance Heatmap

**File**: `components/compliance-heatmap.tsx`

Visual breakdown of risk distribution:

```
Identity    ████████░░  80%  ← Highest risk
Temporal    ██████░░░░  60%
MEV         ████░░░░░░  40%
Regulatory  ██░░░░░░░░  20%
Amount      █░░░░░░░░░  10%
Network     █░░░░░░░░░  10%
```

---

## 🔌 Sponsor Integrations

### Why We Chose Each Sponsor

ECHO strategically integrates **5 sponsor technologies** to create a comprehensive privacy solution:

---

### 1. 📡 Helius — Transaction Intelligence

**Website**: [helius.dev](https://helius.dev)

**What it provides**:
- `getTransactionHistory()` — Full transaction history for any wallet
- `getConnectedAddresses()` — All addresses that have interacted with a wallet
- Enhanced transaction parsing with human-readable descriptions

**Why Helius over alternatives?**

| Provider | Transactions/sec | Parsed Data | Price | Our Choice |
|----------|------------------|-------------|-------|------------|
| Solana RPC | Limited | Raw only | Free | ❌ No parsing |
| QuickNode | Good | Basic | $$ | ❌ Limited history |
| **Helius** | Excellent | Enhanced | Free tier | ✅ Best for analysis |

**Code Example**:
```typescript
// lib/api/helius.ts
const transactions = await helius.getTransactionHistory({
  address: walletAddress,
  limit: 100
});

// Returns enriched data:
// - Human-readable descriptions
// - Token transfer details
// - Program interactions
// - Timestamps with timezone
```

**Integration Points**:
- Privacy Engine: Fetches all transactions for risk analysis
- Graph Builder: Extracts counterparty addresses for visualization
- Temporal Analysis: Uses timestamps for pattern detection

---

### 2. 🛡️ Range Protocol — Risk & Compliance

**Website**: [range.org](https://range.org)

**What it provides**:
- `getAddressRiskScore()` — 0-10 risk score with reasoning
- `checkSanctions()` — OFAC sanctions list + token blacklist check
- `assessTokenRisk()` — Scam/rugpull token detection

**Why Range is critical**:

| Capability | Without Range | With Range |
|------------|--------------|------------|
| Sanctions screening | Manual OFAC lookup | Real-time API check |
| Risk reasoning | "High risk" (no context) | "Connected to mixer within 3 hops" |
| Token safety | Unknown | Scam probability score |

**Code Example**:
```typescript
// lib/api/range.ts
const riskScore = await getAddressRiskScore(address);
// Returns:
// {
//   riskScore: 7.2,
//   riskLevel: "HIGH",
//   numHops: 2,
//   maliciousAddressesFound: [{ address, category: "mixer" }],
//   reasoning: "2 hops from known Tornado Cash deposit"
// }

const sanctions = await checkSanctions(address);
// Returns:
// {
//   isOfacSanctioned: false,
//   isTokenBlacklisted: false,
//   attribution: { name: "Binance Hot Wallet", category: "exchange" }
// }
```

**Why these numbers matter**:
- Risk score 0-3: Low risk (green in UI)
- Risk score 4-6: Medium risk (yellow)
- Risk score 7-10: High risk (red, triggers critical alert)

---

### 3. ⚡ QuickNode — High-Performance RPC & MEV Detection

**Website**: [quicknode.com](https://quicknode.com)

**What it provides**:
- High-performance Solana RPC endpoint
- Transaction-level MEV pattern detection
- Real-time balance queries

**Why QuickNode for MEV?**

MEV detection requires analyzing transaction ordering within blocks:

```typescript
// lib/api/quicknode.ts
function analyzeMEVPattern(tx: ParsedTransaction): MEVDetection {
  const preBalances = tx.meta?.preBalances || [];
  const postBalances = tx.meta?.postBalances || [];
  
  // Sandwich detection: Same address profits at start AND end
  const firstChange = postBalances[0] - preBalances[0];
  const lastChange = postBalances[n] - preBalances[n];
  
  if (firstChange > 0 && lastChange > 0 && sameAddress) {
    return { isMEV: true, type: "sandwich", extractedValue: firstChange + lastChange };
  }
  
  // Frontrun detection: Large balance gain before target tx
  const largeGains = balanceChanges.filter(bc => bc.change > 1e9); // >1 SOL
  if (largeGains.length > 0) {
    return { isMEV: true, type: "frontrun", extractedValue: maxGain };
  }
}
```

**MEV Detection Thresholds**:
- Sandwich confidence: 85% (strong pattern match)
- Frontrun confidence: 70% (requires >1 SOL gain)
- Why 1 SOL threshold? Filters noise from small arbitrage

---

### 4. 🧠 Google Gemini AI — Privacy Explanations

**Website**: [ai.google.dev](https://ai.google.dev)

**What it provides**:
- Natural language privacy risk explanations
- Personalized recommendations
- Technical → Plain English translation

**Why Gemini 2.5 Flash?**
- **Speed**: ~500ms response time (critical for UX)
- **Cost**: Free tier = 60 requests/minute
- **Quality**: Understands blockchain context well

**Prompt Engineering**:
```typescript
// lib/api/gemini.ts
const prompt = `Analyze this Solana wallet's privacy:
- Address: ${address}
- Transactions: ${transactionCount}
- Risks: ${risks.map(r => r.title).join(', ')}
- Range Risk Score: ${rangeScore}/10

Provide a brief, non-technical summary and one actionable recommendation.`;
```

---

### 5. 👻 Radr Labs ShadowWire — Stealth Transfers

**Website**: [radr.network](https://radr.network)

**What it provides**:
- Zero-knowledge private transfers
- Stealth address generation
- Privacy pool balance checking

**Integration Status**: 
- ✅ Balance checking (server-side)
- ✅ Transfer simulation
- ⚠️ Full transfers require wallet connection (demo mode)

**Code Example**:
```typescript
// lib/api/shadowwire.ts
const balance = await getShadowWireBalance(address, "SOL");
// Returns: { available: 1.5, poolAddress: "..." }

const simulation = await simulatePrivateTransfer({
  sender: address,
  recipient: stealthAddress,
  amount: 1.0,
  token: "SOL"
});
// Returns: { possible: true, estimatedFee: 0.01 }
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           ECHO Privacy Intelligence                      │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │   Landing   │  │  Analysis   │  │    Graph    │  │     Sidebar     │ │
│  │    Page     │→ │    Page     │→ │  (React     │← │  (Tabs: Risks,  │ │
│  │  (Orb.tsx)  │  │ [address]   │  │    Flow)    │  │   AI, Simulate) │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────┘ │
└───────────────────────────┬─────────────────────────────────────────────┘
                            │
                   ┌────────▼────────┐
                   │  API Routes     │
                   │  /api/analyze   │
                   │  /api/shadowwire│
                   └────────┬────────┘
                            │
              ┌─────────────▼─────────────┐
              │   Privacy Analysis Engine  │
              │   lib/privacy-engine.ts    │
              │   • Risk Detection         │
              │   • Score Calculation      │
              │   • Path Building          │
              └─────────────┬──────────────┘
                            │
    ┌───────────┬───────────┼───────────┬───────────┐
    │           │           │           │           │
┌───▼───┐  ┌────▼────┐  ┌───▼───┐  ┌────▼────┐  ┌───▼────┐
│HELIUS │  │  RANGE  │  │QUICK  │  │ GEMINI  │  │SHADOW  │
│       │  │PROTOCOL │  │ NODE  │  │   AI    │  │ WIRE   │
│ Txs   │  │  Risk   │  │  MEV  │  │Summary  │  │Stealth │
└───────┘  └─────────┘  └───────┘  └─────────┘  └────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** and npm
- **API Keys** from sponsors (free tiers available)

### Installation

```bash
# Clone the repository
git clone https://github.com/Shawnchee/ECHO.git
cd ECHO

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

### Configure API Keys

Edit `.env` with your API keys:

```bash
# Helius - Transaction Data (Required)
HELIUS_API_KEY=your_helius_api_key

# Range Protocol - Risk Scoring (Required)
RANGE_API_KEY=your_range_api_key

# QuickNode - MEV Detection (Optional, falls back to public RPC)
QUICKNODE_API_URL=https://your-endpoint.quiknode.pro/YOUR_KEY/

# Gemini AI - Privacy Summaries (Required)
GEMINI_API_KEY=your_gemini_api_key

# Network Configuration
NEXT_PUBLIC_SOLANA_NETWORK=devnet
```

### Get Free API Keys

| Service | Sign Up | Free Tier |
|---------|---------|-----------|
| [Helius](https://helius.dev) | ✅ Easy | 100k credits/month |
| [Range](https://range.org) | ✅ Easy | 1k requests/month |
| [QuickNode](https://quicknode.com) | ✅ Easy | Limited RPC |
| [Gemini AI](https://ai.google.dev) | ✅ Easy | 60 RPM |

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Run Tests

```bash
# Install test dependencies
pip install -r tests/requirements.txt

# Run all tests (11 tests)
pytest tests/test_api.py -v
```

### Production Build

```bash
npm run build
npm start
```

---

## 🧪 Testing

### Test Suite Overview

| Test Class | Tests | Coverage |
|------------|-------|----------|
| `TestAnalyzeEndpoint` | 4 | API validation, response structure |
| `TestShadowWireEndpoint` | 3 | Balance, simulation, errors |
| `TestHealthCheck` | 2 | Endpoint availability |
| `TestDataValidation` | 2 | Score ranges, severity values |

**Total: 11 tests passing** ✅

### Run Tests

```bash
# All tests
pytest tests/test_api.py -v

# Specific test class
pytest tests/test_api.py::TestAnalyzeEndpoint -v
```

### Test Wallets (Devnet)

```
# Active wallet with transaction history
DRpbCBMxVnDK7maPM5tGv6MvB3v1sRMC86PZ8okm21hy

# System program (edge case testing)
11111111111111111111111111111111
```

---

## 📁 Project Structure

```
ECHO/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing page with Orb
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Tailwind styles
│   ├── analysis/
│   │   └── [address]/
│   │       └── page.tsx          # Analysis results page
│   ├── api/
│   │   ├── analyze/route.ts      # Privacy analysis endpoint
│   │   └── shadowwire/route.ts   # Stealth transfer endpoint
│   └── components/
│       └── providers.tsx         # React context providers
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── Orb.tsx                   # WebGL animated orb
│   ├── analysis-sidebar.tsx      # Tabbed results panel
│   ├── gossip-graph.tsx          # React Flow visualization
│   ├── graph-nodes.tsx           # Custom node types
│   ├── node-detail-modal.tsx     # Node click details
│   ├── simulation-panel.tsx      # "What If?" simulator
│   ├── stealth-demo.tsx          # ShadowWire demo
│   ├── compliance-heatmap.tsx    # Risk breakdown
│   ├── gamification-badges.tsx   # Achievement badges
│   ├── terminal-header.tsx       # Floating status bar
│   ├── wallet-input.tsx          # Address input form
│   └── export-panel.tsx          # JSON/Markdown export
├── lib/
│   ├── privacy-engine.ts         # Core analysis logic
│   ├── api/
│   │   ├── helius.ts             # Transaction fetching
│   │   ├── range.ts              # Risk & sanctions
│   │   ├── quicknode.ts          # MEV detection
│   │   ├── gemini.ts             # AI summaries
│   │   └── shadowwire.ts         # Stealth transfers
│   ├── solana.ts                 # Solana utilities
│   └── utils.ts                  # Helper functions
├── tests/
│   ├── test_api.py               # Pytest integration tests
│   └── requirements.txt          # Test dependencies
├── public/                       # Static assets
├── .env.example                  # Environment template
├── pytest.ini                    # Test configuration
├── next.config.ts                # Next.js configuration
└── package.json                  # Dependencies
```

---

## 🛠️ Troubleshooting

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| `Range API rate limited` | >1000 requests/month | Uses built-in 60s cache |
| `Gemini 404 error` | Invalid API key | Regenerate at ai.google.dev |
| `ShadowWire module error` | Client-side import | Use `/api/shadowwire` route |
| `Empty graph` | Wallet has no history | Try different Devnet wallet |
| `Duplicate API calls` | React Strict Mode | Fixed with AbortController |

---

## 🗺️ Roadmap

### Phase 1: Hackathon (Current) ✅
- [x] Privacy analysis engine
- [x] Graph visualization
- [x] AI summaries
- [x] MEV detection
- [x] Stealth demo
- [x] 11 passing tests

### Phase 2: Post-Hackathon (Q1 2026)
- [ ] Mainnet support (with safeguards)
- [ ] Wallet adapter integration
- [ ] Real ShadowWire transfers
- [ ] Historical tracking

### Phase 3: Growth (Q2-Q3 2026)
- [ ] Public API for developers
- [ ] Browser extension
- [ ] Telegram/Discord bot
- [ ] Multi-chain support

---

## 🤝 Contributing

We welcome contributions! ECHO is fully open source under the MIT license.

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Quick Start

```bash
# Fork and clone
git clone https://github.com/Shawnchee/ECHO.git

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and test
npm run dev
pytest tests/test_api.py -v

# Commit with conventional commits
git commit -m "feat: add amazing feature"

# Push and create PR
git push origin feature/amazing-feature
```

---

## 👨‍💻 Author

**Shawn Chee**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Shawn%20Chee-blue?style=flat-square&logo=linkedin)](https://linkedin.com/in/shawnchee)
[![GitHub](https://img.shields.io/badge/GitHub-shawnchee-black?style=flat-square&logo=github)](https://github.com/shawnchee)

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

Built with support from hackathon sponsors:

| Sponsor | Contribution |
|---------|--------------|
| **Helius** | Transaction indexing & connected addresses API |
| **Range Protocol** | Risk scoring & compliance screening |
| **QuickNode** | High-performance RPC & MEV detection |
| **Google Gemini** | AI-powered privacy explanations |
| **Radr Labs** | ShadowWire stealth transfer SDK |

Special thanks to **Solana Privacy Hackathon** for organizing this hackathon.

---

<p align="center">
  <strong>Making blockchain privacy risks visible and actionable.</strong>
</p>

<p align="center">
  Built with 💙 for Solana | Track 02: Privacy Tooling
</p>
