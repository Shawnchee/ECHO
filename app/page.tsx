"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TerminalHeader } from "@/components/terminal-header";
import { GlobeBackground } from "@/components/globe-background";
import { WalletInput } from "@/components/wallet-input";
import { Shield, Eye, Lock } from "lucide-react";

export default function Home() {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const handleAnalyze = (address: string) => {
    setSelectedWallet(address);
    console.log("Analyzing wallet:", address);
    // TODO: Navigate to analysis page
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Animated Background */}
      <GlobeBackground />

      {/* Terminal Header */}
      <TerminalHeader />

      {/* Main Content */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-24 pb-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center w-full">
          
          {/* Left Column - Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-block"
            >
              <div className="px-4 py-1.5 rounded-full border-2 border-green-500/30 bg-green-500/5 text-sm font-mono uppercase tracking-wider text-green-400 inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Devnet Privacy Analysis
              </div>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
              >
                Visualize your
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
                  privacy footprint
                </span>
                <br />
                on Solana
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-gray-400 max-w-xl leading-relaxed"
              >
                Discover hidden transaction patterns, deanonymization risks, and
                privacy leaks across the gossip chain. Built for developers,
                secured for founders.
              </motion.p>
            </div>

            {/* Wallet Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <WalletInput onAnalyze={handleAnalyze} />
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-4 pt-4"
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="h-12 w-12 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-green-400" />
                </div>
                <p className="text-xs text-gray-400 font-mono">
                  Deanonymization
                  <br />
                  Analysis
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="h-12 w-12 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-green-400" />
                </div>
                <p className="text-xs text-gray-400 font-mono">
                  MEV Risk
                  <br />
                  Detection
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="h-12 w-12 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                  <Lock className="h-6 w-6 text-green-400" />
                </div>
                <p className="text-xs text-gray-400 font-mono">
                  Privacy Cost
                  <br />
                  Metrics
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visualization Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square">
              {/* Glowing orb effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-transparent blur-3xl" />
              
              {/* Placeholder for graph visualization */}
              <div className="relative h-full w-full rounded-2xl border-2 border-green-500/20 bg-black/40 backdrop-blur-sm p-8 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="mx-auto h-32 w-32 rounded-full border-4 border-green-500/30 bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center"
                  >
                    <Lock className="h-16 w-16 text-green-400" />
                  </motion.div>
                  <p className="text-sm text-gray-500 font-mono">
                    Interactive graph visualization
                    <br />
                    coming in Feature 2
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-green-500/10 bg-black/80 backdrop-blur-sm px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm font-mono">
          <span className="text-gray-500">© 2026 ECHO</span>
          <span className="text-green-500/70">Powered by Solana</span>
        </div>
      </motion.footer>
    </div>
  );
}
              <div>
                <a
                  className="font-medium underline underline-offset-2"
                  href="https://www.anchor-lang.com/docs/introduction"
                  target="_blank"
                  rel="noreferrer"
                >
                  Anchor docs
                </a>{" "}
                — build and test programs with IDL, macros, and type-safe
                clients.
              </div>
            </li>
            <li className="flex gap-2">
              <span
                className="mt-1.5 h-2 w-2 rounded-full bg-foreground/60"
                aria-hidden
              />
              <div>
                <a
                  className="font-medium underline underline-offset-2"
                  href="https://faucet.solana.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Solana faucet (devnet)
                </a>{" "}
                — grab free devnet SOL to try transfers and transactions.
              </div>
            </li>
            <li className="flex gap-2">
              <span
                className="mt-1.5 h-2 w-2 rounded-full bg-foreground/60"
                aria-hidden
              />
              <div>
                <a
                  className="font-medium underline underline-offset-2"
                  href="https://github.com/solana-foundation/framework-kit/tree/main/packages/react-hooks"
                  target="_blank"
                  rel="noreferrer"
                >
                  @solana/react-hooks README
                </a>{" "}
                — how this starter wires the client, connectors, and hooks.
              </div>
            </li>
          </ul>
        </header>

        <section className="w-full max-w-3xl space-y-4 rounded-2xl border border-border-low bg-card p-6 shadow-[0_20px_80px_-50px_rgba(0,0,0,0.35)]">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-lg font-semibold">Wallet connection</p>
              <p className="text-sm text-muted">
                Pick any discovered connector and manage connect / disconnect in
                one spot.
              </p>
            </div>
            <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground/80">
              {status === "connected" ? "Connected" : "Not connected"}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => connect(connector.id)}
                disabled={status === "connecting"}
                className="group flex items-center justify-between rounded-xl border border-border-low bg-card px-4 py-3 text-left text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="flex flex-col">
                  <span className="text-base">{connector.name}</span>
                  <span className="text-xs text-muted">
                    {status === "connecting"
                      ? "Connecting…"
                      : status === "connected" &&
                          wallet?.connector.id === connector.id
                        ? "Active"
                        : "Tap to connect"}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="h-2.5 w-2.5 rounded-full bg-border-low transition group-hover:bg-primary/80"
                />
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-border-low pt-4 text-sm">
            <span className="rounded-lg border border-border-low bg-cream px-3 py-2 font-mono text-xs">
              {address ?? "No wallet connected"}
            </span>
            <button
              onClick={() => disconnect()}
              disabled={status !== "connected"}
              className="inline-flex items-center gap-2 rounded-lg border border-border-low bg-card px-3 py-2 font-medium transition hover:-translate-y-0.5 hover:shadow-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            >
              Disconnect
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
