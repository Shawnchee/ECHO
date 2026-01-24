"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { WalletAnalysis } from "@/lib/privacy-engine";

interface GamificationBadgesProps {
  analysis: WalletAnalysis | null;
}

interface Badge {
  id: string;
  emoji: string;
  name: string;
  description: string;
  earned: boolean;
  rarity: "common" | "rare" | "epic" | "legendary";
  condition: string;
}

export function GamificationBadges({ analysis }: GamificationBadgesProps) {
  const badges = useMemo((): Badge[] => {
    if (!analysis) return [];

    const privacyScore = analysis.privacyScore;
    const txCount = analysis.transactionCount;
    const uniqueInteractions = analysis.uniqueInteractions;
    const risks = analysis.risks;
    const mevExposure = analysis.mevExposure;
    const temporalPatterns = analysis.temporalAnalysis.hasPatterns;

    return [
      // Privacy Score Badges
      {
        id: "shadow-master",
        emoji: "🕵️",
        name: "Shadow Master",
        description: "Achieved 90+ privacy score",
        earned: privacyScore >= 90,
        rarity: "legendary",
        condition: "Privacy Score ≥ 90",
      },
      {
        id: "privacy-pro",
        emoji: "🛡️",
        name: "Privacy Pro",
        description: "Maintained strong privacy practices",
        earned: privacyScore >= 70,
        rarity: "epic",
        condition: "Privacy Score ≥ 70",
      },
      {
        id: "cautious-trader",
        emoji: "👀",
        name: "Cautious Trader",
        description: "Moderate privacy awareness",
        earned: privacyScore >= 50 && privacyScore < 70,
        rarity: "rare",
        condition: "Privacy Score 50-69",
      },
      
      // Activity Badges
      {
        id: "whale-watcher",
        emoji: "🐋",
        name: "Whale Watcher",
        description: "High transaction volume",
        earned: txCount >= 100,
        rarity: "epic",
        condition: "100+ transactions",
      },
      {
        id: "social-butterfly",
        emoji: "🦋",
        name: "Social Butterfly",
        description: "Many unique interactions",
        earned: uniqueInteractions >= 50,
        rarity: "rare",
        condition: "50+ unique addresses",
      },
      {
        id: "minimalist",
        emoji: "🎯",
        name: "Minimalist",
        description: "Few, focused interactions",
        earned: uniqueInteractions <= 10 && txCount >= 5,
        rarity: "rare",
        condition: "≤10 interactions with 5+ txs",
      },

      // Risk Badges
      {
        id: "ghost-mode",
        emoji: "👻",
        name: "Ghost Mode",
        description: "No critical risks detected",
        earned: !risks.some(r => r.severity === "critical"),
        rarity: "epic",
        condition: "Zero critical risks",
      },
      {
        id: "clean-slate",
        emoji: "✨",
        name: "Clean Slate",
        description: "No risks detected at all",
        earned: risks.length === 0,
        rarity: "legendary",
        condition: "Zero risks",
      },
      {
        id: "risk-taker",
        emoji: "🎰",
        name: "Risk Taker",
        description: "Multiple high-severity risks",
        earned: risks.filter(r => r.severity === "critical" || r.severity === "high").length >= 3,
        rarity: "common",
        condition: "3+ high/critical risks",
      },

      // MEV Badges
      {
        id: "mev-immune",
        emoji: "🛡️",
        name: "MEV Immune",
        description: "No MEV exposure detected",
        earned: !mevExposure.detected,
        rarity: "rare",
        condition: "Zero MEV incidents",
      },
      {
        id: "sandwich-survivor",
        emoji: "🥪",
        name: "Sandwich Survivor",
        description: "Survived MEV attacks",
        earned: mevExposure.detected && mevExposure.count <= 3,
        rarity: "common",
        condition: "1-3 MEV incidents",
      },

      // Temporal Badges
      {
        id: "night-owl",
        emoji: "🦉",
        name: "Night Owl",
        description: "Transactions in late hours",
        earned: analysis.temporalAnalysis.commonHours.some(h => h >= 22 || h <= 4),
        rarity: "common",
        condition: "Active 10PM-4AM",
      },
      {
        id: "unpredictable",
        emoji: "🎲",
        name: "Unpredictable",
        description: "No temporal patterns",
        earned: !temporalPatterns,
        rarity: "rare",
        condition: "No timing patterns",
      },
      {
        id: "routine-robot",
        emoji: "🤖",
        name: "Routine Robot",
        description: "Highly predictable timing",
        earned: temporalPatterns && analysis.temporalAnalysis.confidence >= 50,
        rarity: "common",
        condition: "50%+ timing correlation",
      },

      // Special Badges
      {
        id: "devnet-explorer",
        emoji: "🧪",
        name: "Devnet Explorer",
        description: "Using the safe testing environment",
        earned: true, // Always earned on devnet
        rarity: "common",
        condition: "Using Devnet",
      },
    ];
  }, [analysis]);

  const earnedBadges = badges.filter(b => b.earned);
  const unearnedBadges = badges.filter(b => !b.earned);

  const rarityColors = {
    common: "from-gray-500 to-gray-600",
    rare: "from-blue-500 to-blue-600",
    epic: "from-purple-500 to-purple-600",
    legendary: "from-yellow-500 to-orange-500",
  };

  const rarityBorders = {
    common: "border-gray-500/30",
    rare: "border-blue-500/30",
    epic: "border-purple-500/30",
    legendary: "border-yellow-500/30 animate-pulse",
  };

  if (!analysis) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Earned Badges */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono text-blue-400">
            🏆 Earned Badges ({earnedBadges.length})
          </h3>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {earnedBadges.slice(0, 6).map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`relative group p-3 rounded-xl border bg-gradient-to-br ${rarityColors[badge.rarity]} bg-opacity-10 ${rarityBorders[badge.rarity]} hover:scale-105 transition-transform cursor-pointer`}
            >
              <div className="text-center">
                <span className="text-2xl">{badge.emoji}</span>
                <div className="text-xs font-mono text-white mt-1 truncate">
                  {badge.name}
                </div>
                <div className={`text-[10px] uppercase tracking-wider mt-0.5 ${
                  badge.rarity === 'legendary' ? 'text-yellow-400' :
                  badge.rarity === 'epic' ? 'text-purple-400' :
                  badge.rarity === 'rare' ? 'text-blue-400' : 'text-gray-400'
                }`}>
                  {badge.rarity}
                </div>
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-black/95 rounded-lg border border-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <p className="text-xs text-white font-bold">{badge.name}</p>
                <p className="text-xs text-gray-400 mt-1">{badge.description}</p>
                <p className="text-xs text-blue-400 mt-1 font-mono">{badge.condition}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {earnedBadges.length > 6 && (
          <div className="text-center">
            <span className="text-xs text-gray-500">+{earnedBadges.length - 6} more badges</span>
          </div>
        )}
      </div>

      {/* Locked Badges */}
      <div className="space-y-2">
        <h3 className="text-sm font-mono text-gray-500">
          🔒 Locked Badges ({unearnedBadges.length})
        </h3>
        
        <div className="grid grid-cols-4 gap-1">
          {unearnedBadges.slice(0, 8).map((badge) => (
            <div
              key={badge.id}
              className="group relative p-2 rounded-lg bg-black/40 border border-gray-700 opacity-50 hover:opacity-80 transition-opacity cursor-help"
            >
              <div className="text-center">
                <span className="text-lg grayscale">{badge.emoji}</span>
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 p-2 bg-black/95 rounded-lg border border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <p className="text-xs text-white font-bold">{badge.name}</p>
                <p className="text-xs text-gray-400 mt-1">{badge.description}</p>
                <p className="text-xs text-yellow-400 mt-1 font-mono">🔓 {badge.condition}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Badge */}
      {earnedBadges.length > 0 && (
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-4 border border-blue-500/30">
          <div className="flex items-center gap-4">
            <div className="text-4xl">
              {earnedBadges.find(b => b.rarity === 'legendary')?.emoji ||
               earnedBadges.find(b => b.rarity === 'epic')?.emoji ||
               earnedBadges[0].emoji}
            </div>
            <div>
              <div className="text-sm font-mono text-white font-bold">
                {earnedBadges.find(b => b.rarity === 'legendary')?.name ||
                 earnedBadges.find(b => b.rarity === 'epic')?.name ||
                 earnedBadges[0].name}
              </div>
              <div className="text-xs text-gray-400">
                {earnedBadges.find(b => b.rarity === 'legendary')?.description ||
                 earnedBadges.find(b => b.rarity === 'epic')?.description ||
                 earnedBadges[0].description}
              </div>
              <div className="text-xs text-blue-400 mt-1 font-mono">
                Featured Achievement
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
