"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  AlertTriangle, 
  Eye, 
  TrendingDown, 
  TrendingUp,
  Lock,
  Unlock,
  ChevronDown,
  ChevronUp,
  Info,
  Sparkles
} from "lucide-react";
import { generateMockGossipData } from "@/lib/mock-data";
import type { WalletAnalysis } from "@/lib/privacy-engine";

interface AnalysisSidebarProps {
  address: string;
  analysis?: WalletAnalysis | null;
}

export function AnalysisSidebar({ address, analysis }: AnalysisSidebarProps) {
  const mockData = useMemo(() => generateMockGossipData(address), [address]);
  const [expandedRisk, setExpandedRisk] = useState<string | null>(null);

  // Use real data if available, fallback to mock
  const privacyScore = analysis?.privacyScore ?? mockData.metrics.privacyScore;
  const transactionCount = analysis?.transactionCount ?? mockData.metrics.transactionCount;
  const uniqueInteractions = analysis?.uniqueInteractions ?? mockData.metrics.uniqueInteractions;
  const risks = analysis?.risks ?? [];
  const aiSummary = analysis?.aiSummary;
  const mevExposure = analysis?.mevExposure;

  const privacyColor =
    privacyScore >= 70
      ? "green"
      : privacyScore >= 40
        ? "yellow"
        : "red";

  return (
    <div className="h-full overflow-y-auto bg-black/40 backdrop-blur-sm border-2 border-green-500/20 rounded-2xl p-6 space-y-6 custom-scrollbar">
      {/* Privacy Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wider flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Privacy Score
        </h3>
        
        <div className="relative">
          <div className="flex items-end justify-between mb-2">
            <div className={`text-5xl font-bold font-mono
              ${privacyColor === 'green' ? 'text-green-400' : ''}
              ${privacyColor === 'yellow' ? 'text-yellow-400' : ''}
              ${privacyColor === 'red' ? 'text-red-400' : ''}
            `}>
              {privacyScore}
              <span className="text-2xl text-gray-500">/100</span>
            </div>
            
            <div className={`px-3 py-1 rounded-full text-xs font-mono uppercase
              ${privacyColor === 'green' ? 'bg-green-500/20 text-green-400 border border-green-500/40' : ''}
              ${privacyColor === 'yellow' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40' : ''}
              ${privacyColor === 'red' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : ''}
            `}>
              {privacyColor === 'green' ? '🛡️ Strong' : privacyColor === 'yellow' ? '⚠️ Moderate' : '🚨 Weak'}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${privacyScore}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className={`h-full rounded-full
                ${privacyColor === 'green' ? 'bg-gradient-to-r from-green-600 to-green-400' : ''}
                ${privacyColor === 'yellow' ? 'bg-gradient-to-r from-yellow-600 to-yellow-400' : ''}
                ${privacyColor === 'red' ? 'bg-gradient-to-r from-red-600 to-red-400' : ''}
              `}
            />
          </div>
        </div>
      </motion.div>

      {/* AI Summary */}
      {aiSummary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-4 space-y-2"
        >
          <h3 className="text-sm font-mono text-purple-400 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI Summary
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            {aiSummary.summary}
          </p>
        </motion.div>
      )}

      {/* Key Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-3"
      >
        <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
          <div className="text-xs text-gray-400 font-mono mb-1">Transactions</div>
          <div className="text-2xl font-bold text-green-400 font-mono">
            {transactionCount}
          </div>
        </div>
        
        <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
          <div className="text-xs text-gray-400 font-mono mb-1">Interactions</div>
          <div className="text-2xl font-bold text-blue-400 font-mono">
            {uniqueInteractions}
          </div>
        </div>
        
        <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-3">
          <div className="text-xs text-gray-400 font-mono mb-1">Risks Found</div>
          <div className="text-2xl font-bold text-purple-400 font-mono">
            {risks.length}
          </div>
        </div>
        
        <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-3">
          <div className="text-xs text-gray-400 font-mono mb-1">MEV Risk</div>
          <div className="text-2xl font-bold text-orange-400 font-mono">
            {mevExposure?.detected ? `${mevExposure.count}` : '0'}
          </div>
        </div>
      </motion.div>

      {/* Deanonymization Risks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-3"
      >
        <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Deanonymization Risks ({risks.length})
        </h3>
        
        <div className="space-y-2">
          {risks.length === 0 ? (
            <div className="text-sm text-gray-500 font-mono p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
              ✅ No significant risks detected
            </div>
          ) : (
            risks.map((risk) => {
              const isExpanded = expandedRisk === risk.id;
              const severityColor =
                risk.severity === "critical"
                  ? "red"
                  : risk.severity === "high"
                    ? "orange"
                    : risk.severity === "medium"
                      ? "yellow"
                      : "blue";

              return (
                <motion.div
                  key={risk.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`border rounded-lg overflow-hidden transition-all
                    ${severityColor === 'red' ? 'bg-red-500/5 border-red-500/30' : ''}
                    ${severityColor === 'orange' ? 'bg-orange-500/5 border-orange-500/30' : ''}
                    ${severityColor === 'yellow' ? 'bg-yellow-500/5 border-yellow-500/30' : ''}
                    ${severityColor === 'blue' ? 'bg-blue-500/5 border-blue-500/30' : ''}
                  `}
                >
                  <button
                    onClick={() => setExpandedRisk(isExpanded ? null : risk.id)}
                    className="w-full p-3 text-left hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded text-xs font-mono uppercase
                            ${severityColor === 'red' ? 'bg-red-500/20 text-red-400' : ''}
                            ${severityColor === 'orange' ? 'bg-orange-500/20 text-orange-400' : ''}
                            ${severityColor === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                            ${severityColor === 'blue' ? 'bg-blue-500/20 text-blue-400' : ''}
                          `}>
                            {risk.severity}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">
                            {risk.confidence}% confidence
                          </span>
                        </div>
                        
                        <div className="text-sm text-white font-mono">
                          {risk.title}
                        </div>
                      </div>
                      
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-white/10"
                      >
                        <div className="p-3 space-y-2">
                          <p className="text-xs text-gray-300 leading-relaxed">
                            {risk.description}
                          </p>
                          
                          {risk.recommendation && (
                            <div className="pt-2 border-t border-white/10">
                              <p className="text-xs text-green-400">
                                💡 {risk.recommendation}
                              </p>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-2 pt-2">
                            <Info className="h-3 w-3 text-gray-500" />
                            <span className="text-xs text-gray-500 font-mono">
                              Affects {risk.affectedTransactions} transaction{risk.affectedTransactions > 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>
      </motion.div>

      {/* Privacy Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-green-500/5 border border-green-500/20 rounded-lg p-4 space-y-3"
      >
        <h3 className="text-sm font-mono text-green-400 uppercase tracking-wider flex items-center gap-2">
          <Lock className="h-4 w-4" />
          Privacy Tips
        </h3>
        
        <ul className="space-y-2 text-xs text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">•</span>
            <span>Use multiple wallets to separate activities</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">•</span>
            <span>Avoid regular transaction patterns</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">•</span>
            <span>Consider using privacy-preserving protocols</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">•</span>
            <span>Batch transactions to reduce correlation</span>
          </li>
        </ul>
      </motion.div>

      {/* Badge/Gamification */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center py-4 border border-green-500/20 rounded-lg bg-black/40"
      >
        <div className="text-4xl mb-2">🕵️</div>
        <div className="text-sm font-mono text-green-400 font-bold">Shadow Operator</div>
        <div className="text-xs text-gray-500 mt-1">Good privacy practices detected</div>
      </motion.div>
    </div>
  );
}
