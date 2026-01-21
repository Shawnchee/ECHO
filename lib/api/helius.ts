/**
 * Helius API Client
 * Fetches transaction history, token balances, and program interactions
 */

import { Helius } from "helius-sdk";

const helius = new Helius(process.env.HELIUS_API_KEY || "");

export interface HeliusTransaction {
  signature: string;
  timestamp: number;
  type: string;
  source: string;
  fee: number;
  feePayer: string;
  slot: number;
  nativeTransfers?: Array<{
    fromUserAccount: string;
    toUserAccount: string;
    amount: number;
  }>;
  tokenTransfers?: Array<{
    fromUserAccount: string;
    toUserAccount: string;
    mint: string;
    tokenAmount: number;
  }>;
}

export interface HeliusBalance {
  mint: string;
  amount: number;
  decimals: number;
  tokenAccount: string;
}

/**
 * Fetch transaction history for a wallet
 */
export async function getTransactionHistory(
  address: string,
  limit: number = 100
): Promise<HeliusTransaction[]> {
  try {
    const transactions = await helius.rpc.getSignaturesForAddress({
      address,
      limit,
    });

    const detailedTxs = await Promise.all(
      transactions.map(async (tx) => {
        const parsed = await helius.rpc.getParsedTransaction(tx.signature);
        return {
          signature: tx.signature,
          timestamp: tx.blockTime || 0,
          type: parsed?.type || "unknown",
          source: parsed?.source || "unknown",
          fee: parsed?.fee || 0,
          feePayer: parsed?.feePayer || address,
          slot: tx.slot,
          nativeTransfers: parsed?.nativeTransfers,
          tokenTransfers: parsed?.tokenTransfers,
        };
      })
    );

    return detailedTxs;
  } catch (error) {
    console.error("Helius API error:", error);
    throw new Error("Failed to fetch transaction history");
  }
}

/**
 * Get token balances for a wallet
 */
export async function getTokenBalances(
  address: string
): Promise<HeliusBalance[]> {
  try {
    const balances = await helius.rpc.getTokenAccounts({
      owner: address,
    });

    return balances.map((balance) => ({
      mint: balance.mint,
      amount: balance.amount,
      decimals: balance.decimals,
      tokenAccount: balance.address,
    }));
  } catch (error) {
    console.error("Helius balance error:", error);
    return [];
  }
}

/**
 * Get all unique addresses a wallet has interacted with
 */
export async function getConnectedAddresses(
  address: string,
  limit: number = 100
): Promise<Set<string>> {
  const transactions = await getTransactionHistory(address, limit);
  const addresses = new Set<string>();

  transactions.forEach((tx) => {
    tx.nativeTransfers?.forEach((transfer) => {
      if (transfer.fromUserAccount !== address) {
        addresses.add(transfer.fromUserAccount);
      }
      if (transfer.toUserAccount !== address) {
        addresses.add(transfer.toUserAccount);
      }
    });

    tx.tokenTransfers?.forEach((transfer) => {
      if (transfer.fromUserAccount !== address) {
        addresses.add(transfer.fromUserAccount);
      }
      if (transfer.toUserAccount !== address) {
        addresses.add(transfer.toUserAccount);
      }
    });
  });

  return addresses;
}

/**
 * Detect temporal patterns in transactions
 */
export function analyzeTemporalPatterns(
  transactions: HeliusTransaction[]
): {
  hasPatterns: boolean;
  confidence: number;
  commonHours: number[];
} {
  const hours = transactions.map((tx) => new Date(tx.timestamp * 1000).getHours());
  const hourCounts = new Map<number, number>();

  hours.forEach((hour) => {
    hourCounts.set(hour, (hourCounts.get(hour) || 0) + 1);
  });

  // Find hours with >20% of transactions
  const totalTxs = transactions.length;
  const commonHours = Array.from(hourCounts.entries())
    .filter(([_, count]) => count / totalTxs > 0.2)
    .map(([hour]) => hour);

  const hasPatterns = commonHours.length > 0;
  const confidence = hasPatterns
    ? Math.min(
        95,
        (Math.max(...Array.from(hourCounts.values())) / totalTxs) * 100
      )
    : 0;

  return { hasPatterns, confidence, commonHours };
}
