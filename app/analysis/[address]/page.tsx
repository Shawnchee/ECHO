"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { TerminalHeader } from "@/components/terminal-header";
import { GossipGraph } from "@/components/gossip-graph";
import { AnalysisSidebar } from "@/components/analysis-sidebar";
import { Button } from "@/components/ui/button";
import type { WalletAnalysis } from "@/lib/privacy-engine";

interface AnalysisPageProps {
  params: Promise<{ address: string }>;
}

export default function AnalysisPage({ params }: AnalysisPageProps) {
  const { address } = use(params);
  const router = useRouter();
  const [analysis, setAnalysis] = useState<WalletAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalysis() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Analysis failed");
        }

        const data = await response.json();
        setAnalysis(data);
      } catch (err: any) {
        console.error("Analysis error:", err);
        setError(err.message || "Failed to analyze wallet");
      } finally {
        setLoading(false);
      }
    }

    fetchAnalysis();
  }, [address]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Terminal Header */}
      <TerminalHeader />

      {/* Back Button */}
      <div className="fixed top-20 left-6 z-50">
        <Button
          onClick={() => router.push("/")}
          variant="outline"
          className="bg-black/80 backdrop-blur-sm border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-green-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="text-center space-y-4">
            <Loader2 className="h-16 w-16 animate-spin text-green-400 mx-auto" />
            <div className="space-y-2">
              <p className="text-xl font-mono text-green-400">Analyzing wallet...</p>
              <div className="text-sm font-mono text-gray-400 space-y-1">
                <p>▸ Fetching transactions from Helius...</p>
                <p>▸ Detecting deanonymization risks...</p>
                <p>▸ Analyzing temporal patterns...</p>
                <p>▸ Checking sanctions & blacklists (Range)...</p>
                <p>▸ Generating AI summary (Gemini)...</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="max-w-md p-8 bg-red-900/20 border-2 border-red-500/30 rounded-2xl text-center space-y-4">
            <div className="text-red-400 text-5xl">⚠️</div>
            <h2 className="text-2xl font-bold text-red-400 font-mono">Analysis Failed</h2>
            <p className="text-gray-300">{error}</p>
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Search
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      {analysis && !loading && !error && (
        <main className="relative z-10 pt-32 pb-8 px-6">
          <div className="max-w-[1800px] mx-auto">
            {/* Analysis Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2 font-mono">
                    <span className="text-green-400">$</span> Wallet Analysis Complete
                  </h1>
                  <div className="flex items-center gap-3">
                    <code className="px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-md text-sm text-green-400 font-mono">
                      {address}
                    </code>
                    <span className="px-2 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded text-xs text-yellow-400 font-mono uppercase">
                      Devnet
                    </span>
                  </div>
                </div>

                {/* Quick Stats - Real Data */}
                <div className="flex gap-4">
                  <div className="px-4 py-2 bg-black/60 border border-green-500/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-400 font-mono">
                      {analysis.privacyScore}
                    </div>
                    <div className="text-xs text-gray-400 font-mono">Privacy Score</div>
                  </div>
                  <div className="px-4 py-2 bg-black/60 border border-orange-500/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-orange-400 font-mono">
                      {analysis.risks.length}
                    </div>
                    <div className="text-xs text-gray-400 font-mono">Risks Found</div>
                  </div>
                  <div className="px-4 py-2 bg-black/60 border border-blue-500/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-400 font-mono">
                      {analysis.transactionCount}
                    </div>
                    <div className="text-xs text-gray-400 font-mono">Transactions</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Graph + Sidebar Layout */}
            <div className="grid lg:grid-cols-[1fr,400px] gap-6">
              {/* Graph Canvas */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-[calc(100vh-280px)] min-h-[600px] rounded-2xl border-2 border-green-500/20 bg-black/40 backdrop-blur-sm overflow-hidden"
              >
                <GossipGraph address={address} analysis={analysis} />
              </motion.div>

              {/* Analysis Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="h-[calc(100vh-280px)] min-h-[600px]"
              >
                <AnalysisSidebar address={address} analysis={analysis} />
              </motion.div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
