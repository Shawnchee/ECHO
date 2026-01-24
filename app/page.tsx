"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TerminalHeader } from "@/components/terminal-header";
import { GlobeBackground } from "@/components/globe-background";
import { WalletInput } from "@/components/wallet-input";
import Orb from "@/components/Orb";
import { Shield, Eye, Lock } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const handleAnalyze = (address: string) => {
    setSelectedWallet(address);
    // Navigate to analysis page
    router.push(`/analysis/${address}`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Animated Background */}
      <GlobeBackground />

      {/* Terminal Header */}
      <TerminalHeader />

      {/* Main Content */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-30 pb-24">
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
              <div className="px-4 py-1.5 rounded-full border-2 border-blue-500/30 bg-blue-500/5 text-sm font-mono uppercase tracking-wider text-blue-400 inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
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
                <div className="h-12 w-12 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-blue-400" />
                </div>
                <p className="text-xs text-gray-400 font-mono">
                  Deanonymization
                  <br />
                  Analysis
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="h-12 w-12 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-400" />
                </div>
                <p className="text-xs text-gray-400 font-mono">
                  MEV Risk
                  <br />
                  Detection
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="h-12 w-12 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                  <Lock className="h-6 w-6 text-blue-400" />
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
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent blur-3xl" />
              
              {/* Animated Orb Visualization */}
              <div className="relative h-full w-full rounded-2xl border-2 border-blue-500/20 bg-black/40 backdrop-blur-sm overflow-hidden">
                <Orb
                  hue={180}
                  hoverIntensity={1.5}
                  rotateOnHover
                  forceHoverState={false}
                  backgroundColor="#000000"
                />
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
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-blue-500/10 bg-black/80 backdrop-blur-sm px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm font-mono">
          <span className="text-gray-500">© 2026 ECHO</span>
          <span className="text-blue-500/70">Powered by Solana</span>
        </div>
      </motion.footer>
    </div>
  );
}
