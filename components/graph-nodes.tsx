"use client";

import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Wallet, Code, Coins, Shield, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

// Wallet Node Component
export const WalletNode = memo(({ data }: NodeProps) => {
  const privacyColor =
    (data.privacyScore || 50) >= 70
      ? "green"
      : (data.privacyScore || 50) >= 40
        ? "yellow"
        : "red";

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <Handle type="target" position={Position.Top} className="!bg-green-500/50 !border-green-500" />
      
      <div className={`
        min-w-[180px] px-4 py-3 rounded-xl border-2 backdrop-blur-sm
        bg-black/80 shadow-lg transition-all duration-200
        hover:scale-105 hover:shadow-xl cursor-pointer
        ${data.isMain ? 'border-green-500 shadow-green-500/30' : 'border-green-500/30'}
      `}>
        <div className="flex items-start gap-3">
          <div className={`
            p-2 rounded-lg
            ${privacyColor === 'green' ? 'bg-green-500/20 border border-green-500/40' : ''}
            ${privacyColor === 'yellow' ? 'bg-yellow-500/20 border border-yellow-500/40' : ''}
            ${privacyColor === 'red' ? 'bg-red-500/20 border border-red-500/40' : ''}
          `}>
            <Wallet className={`h-5 w-5
              ${privacyColor === 'green' ? 'text-green-400' : ''}
              ${privacyColor === 'yellow' ? 'text-yellow-400' : ''}
              ${privacyColor === 'red' ? 'text-red-400' : ''}
            `} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold text-white truncate">
                {data.label}
              </span>
              {data.badge && (
                <span className="text-xs">{data.badge}</span>
              )}
            </div>
            
            <code className="text-xs text-gray-400 font-mono block truncate">
              {data.address}
            </code>
            
            {data.balance !== undefined && (
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">Balance:</span>
                <span className="text-xs text-green-400 font-mono font-bold">
                  {data.balance.toFixed(2)} SOL
                </span>
              </div>
            )}
            
            {data.privacyScore !== undefined && (
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">Privacy:</span>
                <span className={`text-xs font-mono font-bold
                  ${privacyColor === 'green' ? 'text-green-400' : ''}
                  ${privacyColor === 'yellow' ? 'text-yellow-400' : ''}
                  ${privacyColor === 'red' ? 'text-red-400' : ''}
                `}>
                  {data.privacyScore}/100
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Handle type="source" position={Position.Bottom} className="!bg-green-500/50 !border-green-500" />
    </motion.div>
  );
});

WalletNode.displayName = "WalletNode";

// Program Node Component
export const ProgramNode = memo(({ data }: NodeProps) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="relative"
    >
      <Handle type="target" position={Position.Top} className="!bg-blue-500/50 !border-blue-500" />
      
      <div className="min-w-[160px] px-4 py-3 rounded-xl border-2 border-blue-500/30 bg-black/80 backdrop-blur-sm shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl hover:border-blue-500/50 cursor-pointer">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/40">
            <Code className="h-5 w-5 text-blue-400" />
          </div>
          
          <div className="flex-1 min-w-0">
            <span className="text-sm font-bold text-white block truncate mb-1">
              {data.label}
            </span>
            
            <code className="text-xs text-gray-400 font-mono block truncate">
              {data.programId?.slice(0, 8)}...
            </code>
            
            {data.interactions && (
              <div className="mt-2 flex items-center gap-1">
                <span className="text-xs text-gray-500 font-mono">
                  {data.interactions} interactions
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Handle type="source" position={Position.Bottom} className="!bg-blue-500/50 !border-blue-500" />
    </motion.div>
  );
});

ProgramNode.displayName = "ProgramNode";

// Token Node Component
export const TokenNode = memo(({ data }: NodeProps) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="relative"
    >
      <Handle type="target" position={Position.Top} className="!bg-purple-500/50 !border-purple-500" />
      
      <div className="min-w-[150px] px-4 py-3 rounded-xl border-2 border-purple-500/30 bg-black/80 backdrop-blur-sm shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl hover:border-purple-500/50 cursor-pointer">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/40">
            <Coins className="h-5 w-5 text-purple-400" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold text-white">
                {data.symbol}
              </span>
            </div>
            
            <span className="text-xs text-gray-400 block truncate">
              {data.label}
            </span>
            
            {data.amount !== undefined && (
              <div className="mt-2">
                <span className="text-xs text-purple-400 font-mono font-bold">
                  {data.amount.toLocaleString()} {data.symbol}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Handle type="source" position={Position.Bottom} className="!bg-purple-500/50 !border-purple-500" />
    </motion.div>
  );
});

TokenNode.displayName = "TokenNode";

// Export node types configuration
export const nodeTypes = {
  wallet: WalletNode,
  program: ProgramNode,
  token: TokenNode,
};
