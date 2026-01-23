# ECHO Gossip Chain

> **Solana Privacy Visualization & Deanonymization Analysis Tool**

A production-grade privacy analysis platform that visualizes transaction relationships on Solana Devnet, detects deanonymization risks, and provides actionable privacy recommendations through interactive graph exploration and AI-powered insights.

![Next.js](https://img.shields.io/badge/Next.js-14.0-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Solana](https://img.shields.io/badge/Solana-Devnet-14F195?logo=solana)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🎯 Overview

ECHO Gossip Chain is a comprehensive privacy analysis tool for Solana blockchain that:

- **Analyzes wallet privacy** by fetching transaction history and detecting 8+ types of deanonymization risks
- **Visualizes transaction graphs** with interactive nodes representing wallets, programs, exchanges, MEV bots, and tokens
- **Detects MEV exposure** including sandwich attacks, frontrunning, and JIT liquidity exploitation
- **Simulates privacy improvements** through techniques like stealth addresses, timing randomization, and transaction batching
- **Provides AI summaries** using Gemini 2.5 Flash for plain-language privacy recommendations


---

## 🏗️ Architecture

### **Tech Stack**

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 14 (App Router) | Server-side rendering, API routes |
| **Language** | TypeScript 5.0 | Type safety, developer experience |
| **Styling** | Tailwind CSS + shadcn/ui | Terminal-themed UI components |
| **Visualization** | React Flow | Interactive transaction graph |
| **Animation** | Framer Motion | Smooth transitions, loading states |
| **Blockchain** | Solana Web3.js | RPC calls, transaction parsing |
| **State** | React Hooks | Client-side state management |

### **System Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (Next.js)                      │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────────┐ │
│  │  Landing   │  │  Analysis  │  │   Graph Explorer       │ │
│  │   Page     │─▶│    Page    │─▶│  (React Flow)          │ │
│  └────────────┘  └────────────┘  └────────────────────────┘ │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┴────────────────┐
         │     API Routes (Next.js)        │
         │  ┌────────────┐ ┌─────────────┐│
         │  │ /analyze   │ │ /shadowwire ││
         │  └────────────┘ └─────────────┘│
         └───────────────┬─────────────────┘
                         │
         ┌───────────────┴────────────────┐
         │   Privacy Analysis Engine       │
         │  • Risk Detection               │
         │  • Path Building                │
         │  • Score Calculation            │
         └───────────────┬─────────────────┘
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
┌───▼───┐  ┌───▼───┐  ┌───▼───┐  ┌───▼───┐  ┌───▼───┐
│Helius │  │ Range │  │QuickN │  │Gemini │  │Shadow │
│  API  │  │  API  │  │ode RPC│  │  AI   │  │ Wire  │
└───────┘  └───────┘  └───────┘  └───────┘  └───────┘
```

---

## 🚀 Quick Start

### **Prerequisites**

- Node.js 18+ and npm
- API keys from sponsor platforms (see [Configuration](#configuration))

### **Installation**

```bash
# Clone repository
git clone https://github.com/yourusername/ECHO.git
cd ECHO

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your API keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the application.

### **Production Build**

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

---

## ⚙️ Configuration

### **Environment Variables**

Create a `.env` file in the project root:

```bash
# Helius - Transaction Data & Connected Addresses
NEXT_PUBLIC_HELIUS_API_KEY=your_helius_api_key_here

# Range Protocol - Risk Scoring & Compliance
RANGE_API_KEY=your_range_api_key_here

# QuickNode - High-Performance RPC & MEV Detection
NEXT_PUBLIC_QUICKNODE_RPC_URL=https://your-endpoint.quiknode.pro/YOUR_KEY/

# Gemini AI - Privacy Summaries (2.5 Flash)
GEMINI_API_KEY=your_gemini_api_key_here

# ShadowWire - Private Transfers
SHADOWWIRE_API_KEY=your_shadowwire_key_here  # Optional

# Solana Network Configuration
NEXT_PUBLIC_SOLANA_NETWORK=devnet
```

### **API Key Setup**

| Service | Sign Up | Free Tier | Usage |
|---------|---------|-----------|-------|
| [Helius](https://helius.dev) | ✅ | 100k credits/month | Transaction history |
| [Range](https://range.org) | ✅ | 1k requests/month | Risk scoring |
| [QuickNode](https://quicknode.com) | ✅ | Limited | RPC provider |
| [Gemini AI](https://ai.google.dev) | ✅ | 60 RPM | AI summaries |
| [ShadowWire](https://radr.network) | ⚠️ | Beta access | Stealth transfers |

---

## 📚 Core Features

### **1. Privacy Analysis Engine** (`lib/privacy-engine.ts`)

Detects 8 categories of deanonymization risks:

- **Identity Exposure** - Exchange links requiring KYC
- **Temporal Patterns** - Predictable transaction timing (timezone leaks)
- **Amount Correlation** - Recurring payment amounts
- **Network Analysis** - Repeat interactions with same addresses
- **MEV Exposure** - Sandwich attacks and frontrunning
- **Compliance Risks** - Sanctions, blacklists, high-risk tokens
- **Token Analysis** - Scam tokens, rugpulls
- **Transaction Clustering** - Common senders/receivers

**Algorithm Overview:**
```typescript
async function analyzeWalletPrivacy(address: string): Promise<WalletAnalysis> {
  // 1. Fetch transaction history (Helius)
  const transactions = await fetchTransactionHistory(address);
  
  // 2. Build relationship graph
  const connectedAddresses = extractConnectedAddresses(transactions);
  
  // 3. Detect risks (parallel API calls)
  const [risks, mevExposure, rangeScore] = await Promise.all([
    detectPrivacyRisks(transactions, connectedAddresses),
    detectMEVExposure(transactions),
    assessRangeRisk(address)
  ]);
  
  // 4. Calculate privacy score (0-100)
  const privacyScore = calculatePrivacyScore(risks, mevExposure, rangeScore);
  
  // 5. Generate AI summary (Gemini)
  const aiSummary = await generatePrivacySummary(address, risks);
  
  return { address, privacyScore, risks, mevExposure, aiSummary, ... };
}
```

### **2. Interactive Graph Visualization** (`components/gossip-graph.tsx`)

Built with React Flow featuring:

- **Custom Node Types**: Wallet, Program, Token, MEV Bot, Stealth Transfer
- **Risk-Based Coloring**: Green (low), Yellow (medium), Orange (high), Red (critical)
- **MEV Badges**: 🥪 Sandwich, 🏃 Frontrun, 🔙 Backrun, ⚡ JIT
- **Interactive**: Click nodes for detailed risk explanations
- **Zoom/Pan**: Explore large transaction graphs
- **Animated Edges**: Highlight high-risk connections

### **3. Privacy Simulation** (`components/simulation-panel.tsx`)

"What If?" simulator showing privacy score improvements:

| Technique | Impact | Implementation |
|-----------|--------|----------------|
| **ShadowWire Stealth Transfers** | +25 pts | Use stealth addresses for recipient privacy |
| **Timing Randomization** | +15 pts | Add 0-24hr delays between transactions |
| **Batch Transactions** | +12 pts | Combine multiple transfers |
| **Address Rotation** | +20 pts | Generate new addresses per transaction |
| **Decoy Transactions** | +10 pts | Add noise to transaction graph |

### **4. Stealth Transfer Demo** (`components/stealth-demo.tsx`)

ShadowWire integration for demonstrating private transfers:

```typescript
// Check balance in ShadowWire pool
const balance = await getShadowWireBalance(address, "SOL");

// Generate stealth address
const stealthAddress = generateStealthAddress(recipientPublicKey);

// Simulate private transfer
const result = await simulatePrivateTransfer({
  sender: address,
  recipient: stealthAddress,
  amount: 1.5,
  token: "SOL"
});
```

### **5. Gamification System** (`components/gamification-badges.tsx`)

Dynamic badges based on real analysis data:

- **Privacy Badges**: Shadow Master (90+ score), Privacy Pro (70+)
- **Activity Badges**: Whale Watcher (100+ txs), Minimalist (≤10 interactions)
- **Risk Badges**: Ghost Mode (no critical risks), Risk Taker (3+ high risks)
- **MEV Badges**: MEV Immune (no exposure), Sandwich Survivor (1-3 incidents)
- **Temporal Badges**: Night Owl (late hours), Unpredictable (no patterns)

### **6. Compliance Heatmap** (`components/compliance-heatmap.tsx`)

6-category risk breakdown:

1. **Identity Exposure** - Exchange interactions
2. **Temporal Patterns** - Timezone/schedule leaks
3. **MEV Exposure** - Bot exploitation risk
4. **Regulatory Risk** - Sanctions/compliance issues
5. **Amount Correlation** - Recurring payment patterns
6. **Network Analysis** - Graph clustering vulnerabilities

---

## 📂 Project Structure

```
ECHO/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles
│   ├── analysis/
│   │   └── [address]/
│   │       └── page.tsx            # Analysis page (dynamic route)
│   └── api/
│       ├── analyze/
│       │   └── route.ts            # Privacy analysis API
│       └── shadowwire/
│           └── route.ts            # Stealth transfer API
├── components/
│   ├── ui/                         # shadcn/ui components
│   ├── analysis-sidebar.tsx        # Tabbed analysis panel
│   ├── gossip-graph.tsx            # React Flow graph
│   ├── graph-nodes.tsx             # Custom node components
│   ├── node-detail-modal.tsx       # Node click modal
│   ├── simulation-panel.tsx        # Privacy simulator
│   ├── stealth-demo.tsx            # ShadowWire demo
│   ├── compliance-heatmap.tsx      # Risk breakdown
│   ├── export-panel.tsx            # JSON/Markdown export
│   ├── gamification-badges.tsx     # Badge system
│   ├── terminal-header.tsx         # Animated header
│   ├── wallet-input.tsx            # Address input
│   └── globe-background.tsx        # Particle animation
├── lib/
│   ├── privacy-engine.ts           # Core analysis logic
│   ├── api/
│   │   ├── helius.ts               # Transaction fetcher
│   │   ├── range.ts                # Risk scoring
│   │   ├── quicknode.ts            # MEV detection
│   │   ├── gemini.ts               # AI summaries
│   │   └── shadowwire.ts           # Stealth transfers
│   ├── solana.ts                   # Solana utilities
│   └── utils.ts                    # Helper functions
├── public/                         # Static assets
├── .env                            # Environment variables
├── .env.example                    # Template
├── next.config.ts                  # Next.js config
├── tailwind.config.ts              # Tailwind config
├── tsconfig.json                   # TypeScript config
└── package.json                    # Dependencies
```

---

## 🔌 API Integrations

### **Helius API** - Transaction Data

```typescript
// Fetch transaction history
const txs = await fetchTransactionHistory(address);

// Get connected addresses
const connections = await getConnectedAddresses(address);

// Analyze temporal patterns
const patterns = analyzeTemporalPatterns(txs);
```

### **Range Protocol** - Risk Assessment

```typescript
// Address risk scoring (0-10 scale)
const addressRisk = await assessAddressRisk(address);

// Sanctions/blacklist check
const sanctions = await checkSanctions(address);

// Token risk assessment
const tokenRisk = await assessTokenRisk(tokenMint);
```

### **QuickNode** - MEV Detection

```typescript
// Detect sandwich attacks
const mev = await detectMEV(transactionSignature);

// Get account balance
const balance = await getBalance(address);
```

### **Gemini AI** - Privacy Summaries

```typescript
// Generate plain-language summary
const summary = await generatePrivacySummary(address, risks);

// Returns: { summary, recommendations, keyFindings }
```

### **ShadowWire** - Stealth Transfers

```typescript
// Check balance in privacy pool
const balance = await getShadowWireBalance(address, token);

// Simulate private transfer
const result = await simulatePrivateTransfer({
  sender, recipient, amount, token
});
```

---

## 🧪 Testing

### **Test with Devnet Wallets**

```bash
# Example wallets with transaction history:
- 6f7znmBfioj11fMmRTEnSC8xGgv2WTeHN9UpXo8fD3FY
- 2uPBEnDHPTdYbDsGtJbKqZmGiNAcgEKk7K8pNpRgLe9Q
```

### **Manual Testing Checklist**

- [ ] Landing page loads with animations
- [ ] Wallet input validates Solana addresses
- [ ] Analysis fetches real transaction data
- [ ] Graph renders nodes and edges
- [ ] Clicking nodes opens detail modal
- [ ] Sidebar tabs switch correctly
- [ ] Simulation panel calculates scores
- [ ] Stealth demo checks balances
- [ ] Export downloads JSON/Markdown
- [ ] Badges appear based on analysis

### **Run Production Build**

```bash
npm run build
npm start
```

Check for console errors and verify all API calls succeed.

---

## 🐛 Troubleshooting

### **API Rate Limiting**

**Symptom**: `⚠️ Range API rate limited`

**Solution**: 
- Range API uses 60-second cache to reduce calls
- If rate limited, wait 1 hour or upgrade plan
- Check `.env` has correct `RANGE_API_KEY`

### **Gemini API 404 Error**

**Symptom**: `Gemini API error: 404`

**Solution**:
- Verify API key: https://aistudio.google.com/app/apikey
- Ensure model name is `gemini-2.0-flash-exp` or `gemini-1.5-flash`
- Check quota: 60 requests/minute (free tier)

### **ShadowWire Module Error**

**Symptom**: `Module not found: Can't resolve 'fs'`

**Solution**:
- ShadowWire must run server-side only
- Use `/api/shadowwire` route, not direct imports
- Check `components/stealth-demo.tsx` uses fetch, not SDK imports

### **Graph Not Rendering**

**Symptom**: Empty graph or no nodes

**Solution**:
- Check browser console for errors
- Verify wallet has transaction history on Devnet
- Try a different wallet address
- Check Helius API key in `.env`

---

## 🚢 Deployment

### **Vercel (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### **Docker**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

```bash
docker build -t echo-gossip-chain .
docker run -p 3000:3000 --env-file .env echo-gossip-chain
```

---

## 📊 Performance Optimizations

- **API Call Reduction**: Reduced Range API calls by 90% (20 → 2 per analysis)
- **Caching**: 60-second TTL for Range sanctions/risk data
- **Parallel Fetching**: Concurrent API calls with `Promise.all()`
- **Graph Optimization**: React Flow lazy rendering for large graphs
- **Image Optimization**: Next.js automatic image optimization
- **SSR**: Server-side rendering for faster initial load

---

## 🔒 Security Considerations

- **Devnet Only**: All transactions are on Solana Devnet (test network)
- **No Private Keys**: Application never handles or stores private keys
- **API Keys**: Stored in `.env`, never committed to version control
- **Rate Limiting**: Built-in rate limit handling for all APIs
- **Input Validation**: Solana address format validation (base58, 32-44 chars)
- **Error Handling**: Graceful degradation when APIs fail

---

## 🛣️ Roadmap

- [ ] **Mainnet Support** - Add mainnet-beta analysis (with warnings)
- [ ] **Historical Tracking** - Store analysis results over time
- [ ] **Multi-Wallet Comparison** - Compare privacy scores across wallets
- [ ] **Advanced MEV Detection** - Real QuickNode block analysis
- [ ] **Telegram Bot** - Get privacy reports via Telegram
- [ ] **Privacy Score API** - Public API for developers
- [ ] **Browser Extension** - Real-time privacy warnings

---

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

### **Development Workflow**

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open pull request

### **Code Style**

- Use TypeScript strict mode
- Follow ESLint configuration
- Write meaningful commit messages (Conventional Commits)
- Add JSDoc comments for complex functions

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with support from:

- **Helius** - Transaction indexing and Devnet data
- **Range Protocol** - Risk scoring and compliance APIs
- **QuickNode** - High-performance Solana RPC
- **Google Gemini AI** - AI-powered privacy insights
- **Radr Labs** - ShadowWire private transfer SDK

Special thanks to the Solana developer community.

---

**Built with ❤️ for Solana Devnet**
