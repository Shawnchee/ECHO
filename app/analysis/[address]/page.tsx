"use client";

import { use, useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, RefreshCw } from "lucide-react";
import { GossipGraph } from "@/components/gossip-graph";
import { AnalysisSidebar } from "@/components/analysis-sidebar";
import { Button } from "@/components/ui/button";
import type { WalletAnalysis } from "@/lib/privacy-engine";

interface AnalysisPageProps {
  params: Promise<{ address: string }>;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1500;

export default function AnalysisPage({ params }: AnalysisPageProps) {
  const { address } = use(params);
  const router = useRouter();
  const [analysis, setAnalysis] = useState<WalletAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const hasFetchedRef = useRef(false);

  const fetchAnalysis = useCallback(async (retry = 0) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);
      setError(null);
      setLoadingStep(0);

      const stepInterval = setInterval(() => {
        setLoadingStep(prev => Math.min(prev + 1, 4));
      }, 800);

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
        signal: abortControllerRef.current.signal,
      });

      clearInterval(stepInterval);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Analysis failed");
      }

      const data = await response.json();
      setAnalysis(data);
      setRetryCount(0);
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      
      console.error("Analysis error:", err);
      
      if (retry < MAX_RETRIES) {
        setRetryCount(retry + 1);
        setTimeout(() => fetchAnalysis(retry + 1), RETRY_DELAY);
      } else {
        setError(err.message || "Failed to analyze wallet");
      }
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    
    fetchAnalysis();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchAnalysis]);

  const handleRetry = () => {
    hasFetchedRef.current = false;
    setRetryCount(0);
    fetchAnalysis();
  };

  const loadingSteps = [
    { text: "Fetching transactions from Helius...", active: loadingStep >= 0 },
    { text: "Detecting deanonymization risks...", active: loadingStep >= 1 },
    { text: "Analyzing temporal patterns...", active: loadingStep >= 2 },
    { text: "Checking sanctions & blacklists (Range)...", active: loadingStep >= 3 },
    { text: "Generating AI summary (Gemini)...", active: loadingStep >= 4 },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Button
          onClick={() => router.push("/")}
          variant="outline"
          className="bg-black/80 backdrop-blur-sm border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="text-center space-y-4">
            <Loader2 className="h-16 w-16 animate-spin text-blue-400 mx-auto" />
            <div className="space-y-2">
              <p className="text-xl font-mono text-blue-400">
                {retryCount > 0 ? `Retrying... (${retryCount}/${MAX_RETRIES})` : "Analyzing wallet..."}
              </p>
              <div className="text-sm font-mono text-gray-400 space-y-1">
                {loadingSteps.map((step, i) => (
                  <p key={i} className={step.active ? "text-blue-400" : "text-gray-600"}>
                    {step.active ? "▸" : "○"} {step.text}
                  </p>
                ))}
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
            <div className="flex gap-3 justify-center">
              <Button
                onClick={handleRetry}
                variant="outline"
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
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
        </div>
      )}

      {/* Skeleton Loading State */}
      {!analysis && !loading && !error && (
        <main className="relative z-10 pt-32 pb-8 px-6">
          <div className="max-w-[1800px] mx-auto">
            <div className="mb-6 space-y-4">
              <div className="h-10 w-96 bg-blue-500/10 rounded animate-pulse" />
              <div className="h-6 w-64 bg-blue-500/10 rounded animate-pulse" />
            </div>
            <div className="grid lg:grid-cols-[1fr,400px] gap-6">
              <div className="h-[calc(100vh-280px)] min-h-[600px] rounded-2xl border-2 border-blue-500/20 bg-black/40 animate-pulse" />
              <div className="h-[calc(100vh-280px)] min-h-[600px] rounded-2xl border-2 border-blue-500/20 bg-black/40 animate-pulse" />
            </div>
          </div>
        </main>
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
                    <span className="text-blue-400">$</span> Wallet Analysis Complete
                  </h1>
                  <div className="flex items-center gap-3">
                    <code className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-md text-sm text-blue-400 font-mono">
                      {address}
                    </code>
                    <span className="px-2 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded text-xs text-yellow-400 font-mono uppercase">
                      Devnet
                    </span>
                  </div>
                </div>

                {/* Quick Stats - Real Data */}
                <div className="flex gap-4">
                  <div className="px-4 py-2 bg-black/60 border border-blue-500/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-400 font-mono">
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
                className="relative h-[calc(100vh-280px)] min-h-[600px] rounded-2xl border-2 border-blue-500/20 bg-black/40 backdrop-blur-sm overflow-hidden"
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
