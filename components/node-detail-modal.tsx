"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Wallet, Building2, Code, Shield, AlertTriangle, ExternalLink, Copy, Check, TrendingUp, Clock, Users, Zap, Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface NodeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  node: {
    address: string;
    type: "wallet" | "exchange" | "program" | "mev" | "stealth";
    riskLevel: "low" | "medium" | "high" | "critical";
    isMain?: boolean;
    label?: string;
    confidence?: number;
    transactionCount?: number;
    attackType?: string;
    profit?: number;
    loss?: number;
  } | null;
  mainAddress: string;
}

// Risk level explanations
const riskExplanations = {
  low: {
    title: "Low Risk",
    color: "green",
    icon: Shield,
    description: "This address shows minimal privacy concerns. Interactions with this address are unlikely to compromise your anonymity.",
    implications: [
      "Standard wallet activity detected",
      "No known associations with tracking services",
      "Low transaction correlation risk",
    ],
  },
  medium: {
    title: "Medium Risk",
    color: "yellow",
    icon: AlertTriangle,
    description: "This address has some privacy considerations. Regular interactions may create traceable patterns.",
    implications: [
      "Moderate transaction volume detected",
      "Some interactions may be traceable",
      "Consider using privacy-enhancing tools",
    ],
  },
  high: {
    title: "High Risk",
    color: "red",
    icon: AlertTriangle,
    description: "This address poses significant privacy risks. Interactions could expose your identity or transaction patterns.",
    implications: [
      "High correlation with identifiable addresses",
      "Possible KYC exchange or tracking service",
      "Transactions may be easily linked to your wallet",
    ],
  },
  critical: {
    title: "Critical Risk",
    color: "red",
    icon: AlertTriangle,
    description: "This address is strongly associated with identity exposure. Avoid further interactions if possible.",
    implications: [
      "Direct link to KYC/identity verification",
      "Known tracking or surveillance address",
      "High probability of deanonymization",
    ],
  },
};

// Node type explanations
const typeExplanations = {
  wallet: {
    title: "Wallet Address",
    icon: Wallet,
    description: "A standard Solana wallet address that may belong to an individual, organization, or automated service.",
  },
  exchange: {
    title: "Exchange Address",
    icon: Building2,
    description: "This address is associated with a cryptocurrency exchange. Exchanges typically require KYC verification, which can link transactions to real identities.",
  },
  program: {
    title: "Program Address",
    icon: Code,
    description: "A Solana program (smart contract) address. Programs execute on-chain logic and may be DeFi protocols, NFT marketplaces, or other dApps.",
  },
  mev: {
    title: "MEV Bot",
    icon: Zap,
    description: "A Maximum Extractable Value (MEV) bot that exploits transaction ordering. This bot has extracted value from your transactions through sandwich attacks, frontrunning, or arbitrage.",
  },
  stealth: {
    title: "Stealth Transfer",
    icon: Lock,
    description: "A privacy-enhanced transaction using stealth address technology. The recipient's identity is protected through cryptographic means.",
  },
};

export function NodeDetailModal({ isOpen, onClose, node, mainAddress }: NodeDetailModalProps) {
  const [copied, setCopied] = useState(false);

  if (!node) return null;

  const riskInfo = riskExplanations[node.riskLevel];
  const typeInfo = typeExplanations[node.type];
  const RiskIcon = riskInfo.icon;
  const TypeIcon = typeInfo.icon;

  const copyAddress = () => {
    navigator.clipboard.writeText(node.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openExplorer = () => {
    window.open(`https://explorer.solana.com/address/${node.address}?cluster=devnet`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-gray-900/95 border-2 border-blue-500/30 rounded-2xl shadow-2xl shadow-blue-500/10 overflow-hidden max-h-[80vh] flex flex-col">
              {/* Header */}
              <div className={`
                px-4 py-3 border-b border-blue-500/20 flex-shrink-0
                ${riskInfo.color === 'green' ? 'bg-green-500/10' : ''}
                ${riskInfo.color === 'yellow' ? 'bg-yellow-500/10' : ''}
                ${riskInfo.color === 'red' ? 'bg-red-500/10' : ''}
              `}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`
                      p-2 rounded-lg
                      ${riskInfo.color === 'green' ? 'bg-green-500/20' : ''}
                      ${riskInfo.color === 'yellow' ? 'bg-yellow-500/20' : ''}
                      ${riskInfo.color === 'red' ? 'bg-red-500/20' : ''}
                    `}>
                      <RiskIcon className={`h-5 w-5
                        ${riskInfo.color === 'green' ? 'text-green-400' : ''}
                        ${riskInfo.color === 'yellow' ? 'text-yellow-400' : ''}
                        ${riskInfo.color === 'red' ? 'text-red-400' : ''}
                      `} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{riskInfo.title}</h3>
                      <p className="text-sm text-gray-400">{typeInfo.title}</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4 overflow-y-auto flex-1">
                {/* Address */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-500 uppercase tracking-wider">Address</label>
                  <div className="flex items-center gap-2 bg-black/40 rounded-lg p-3 border border-blue-500/20">
                    <code className="flex-1 text-sm font-mono text-blue-400 break-all">
                      {node.address}
                    </code>
                    <div className="flex gap-1">
                      <button
                        onClick={copyAddress}
                        className="p-2 rounded hover:bg-white/10 transition-colors"
                        title="Copy address"
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-blue-400" />
                        ) : (
                          <Copy className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                      <button
                        onClick={openExplorer}
                        className="p-2 rounded hover:bg-white/10 transition-colors"
                        title="View on Solana Explorer"
                      >
                        <ExternalLink className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  {node.isMain && (
                    <span className="inline-block px-2 py-1 text-xs font-mono bg-blue-500/20 text-blue-400 rounded">
                      YOUR WALLET
                    </span>
                  )}
                </div>

                {/* Risk Explanation */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-500 uppercase tracking-wider">Risk Analysis</label>
                  <p className="text-sm text-gray-300">{riskInfo.description}</p>
                  
                  <div className="space-y-1">
                    {riskInfo.implications.map((implication, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className={`mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0
                          ${riskInfo.color === 'green' ? 'bg-green-400' : ''}
                          ${riskInfo.color === 'yellow' ? 'bg-yellow-400' : ''}
                          ${riskInfo.color === 'red' ? 'bg-red-400' : ''}
                        `} />
                        <span className="text-sm text-gray-400">{implication}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Type Explanation */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-500 uppercase tracking-wider">Address Type</label>
                  <div className="flex items-start gap-2 bg-black/40 rounded-lg p-3 border border-blue-500/20">
                    <TypeIcon className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-300">{typeInfo.description}</p>
                  </div>
                </div>

                {/* Connection Info */}
                {!node.isMain && (
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-500 uppercase tracking-wider">Connection Details</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-black/40 rounded-lg p-3 border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="h-4 w-4 text-blue-400" />
                          <span className="text-xs text-gray-500">Confidence</span>
                        </div>
                        <span className="text-lg font-bold text-white">{node.confidence || 60}%</span>
                      </div>
                      <div className="bg-black/40 rounded-lg p-3 border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="h-4 w-4 text-blue-400" />
                          <span className="text-xs text-gray-500">Relationship</span>
                        </div>
                        <span className="text-sm font-medium text-white">Direct Link</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-500 uppercase tracking-wider">Recommendations</label>
                  <div className={`rounded-lg p-3 border text-xs
                    ${riskInfo.color === 'green' ? 'bg-green-500/5 border-green-500/20' : ''}
                    ${riskInfo.color === 'yellow' ? 'bg-yellow-500/5 border-yellow-500/20' : ''}
                    ${riskInfo.color === 'red' ? 'bg-red-500/5 border-red-500/20' : ''}
                  `}>
                    {node.riskLevel === 'low' && (
                      <p className="text-sm text-gray-300">
                        ✅ This connection appears safe. Continue normal operations.
                      </p>
                    )}
                    {node.riskLevel === 'medium' && (
                      <p className="text-sm text-gray-300">
                        ⚠️ Consider using privacy tools like ShadowWire for future transactions with this address.
                      </p>
                    )}
                    {(node.riskLevel === 'high' || node.riskLevel === 'critical') && (
                      <p className="text-sm text-gray-300">
                        🚨 Minimize interactions with this address. Use tumbling services or stealth addresses for any necessary transactions.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-blue-500/20 bg-black/40 flex-shrink-0">
                <div className="flex gap-2">
                  <Button
                    onClick={openExplorer}
                    variant="outline"
                    className="flex-1 border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Explorer
                  </Button>
                  <Button
                    onClick={onClose}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
