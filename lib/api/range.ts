/**
 * Range API Client
 * Privacy risk assessment, sanctions checks, and transaction simulation
 */

const RANGE_API_URL = "https://api.range.org/v1";
const RANGE_API_KEY = process.env.RANGE_API_KEY;

export interface RangeRiskScore {
  address: string;
  riskScore: number; // 0-100 (higher = more risky)
  riskLevel: "low" | "medium" | "high" | "critical";
  flags: string[];
  sanctioned: boolean;
  blacklisted: boolean;
}

export interface TokenRiskAssessment {
  mint: string;
  riskScore: number;
  isScam: boolean;
  hasLiquidity: boolean;
  rugPullRisk: number;
  metadata: {
    name: string;
    symbol: string;
  };
}

export interface PaymentRisk {
  from: string;
  to: string;
  amount: number;
  overallRisk: number;
  risks: Array<{
    type: string;
    severity: "low" | "medium" | "high";
    description: string;
  }>;
}

/**
 * Get address risk score
 */
export async function getAddressRiskScore(
  address: string
): Promise<RangeRiskScore> {
  try {
    const response = await fetch(
      `${RANGE_API_URL}/solana/address-risk/${address}`,
      {
        headers: {
          Authorization: `Bearer ${RANGE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Range API error: ${response.status}`);
    }

    const data = await response.json();

    // Normalize response
    return {
      address,
      riskScore: data.risk_score || data.riskScore || 0,
      riskLevel: determineRiskLevel(data.risk_score || data.riskScore || 0),
      flags: data.flags || [],
      sanctioned: data.sanctioned || false,
      blacklisted: data.blacklisted || false,
    };
  } catch (error) {
    console.error("Range risk score error:", error);
    // Return safe defaults if API fails
    return {
      address,
      riskScore: 50,
      riskLevel: "medium",
      flags: [],
      sanctioned: false,
      blacklisted: false,
    };
  }
}

/**
 * Assess token risk (detect scams, rug pulls)
 */
export async function assessTokenRisk(
  mint: string
): Promise<TokenRiskAssessment> {
  try {
    const response = await fetch(
      `${RANGE_API_URL}/solana/token-risk/${mint}`,
      {
        headers: {
          Authorization: `Bearer ${RANGE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Range token API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      mint,
      riskScore: data.risk_score || 0,
      isScam: data.is_scam || false,
      hasLiquidity: data.has_liquidity !== false,
      rugPullRisk: data.rug_pull_risk || 0,
      metadata: {
        name: data.name || "Unknown Token",
        symbol: data.symbol || "???",
      },
    };
  } catch (error) {
    console.error("Range token risk error:", error);
    return {
      mint,
      riskScore: 50,
      isScam: false,
      hasLiquidity: true,
      rugPullRisk: 0,
      metadata: { name: "Unknown", symbol: "???" },
    };
  }
}

/**
 * Assess payment risk between two addresses
 */
export async function assessPaymentRisk(
  from: string,
  to: string,
  amount: number
): Promise<PaymentRisk> {
  try {
    const response = await fetch(`${RANGE_API_URL}/solana/payment-risk`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RANGE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, amount }),
    });

    if (!response.ok) {
      throw new Error(`Range payment API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      from,
      to,
      amount,
      overallRisk: data.overall_risk || 0,
      risks: data.risks || [],
    };
  } catch (error) {
    console.error("Range payment risk error:", error);
    return {
      from,
      to,
      amount,
      overallRisk: 0,
      risks: [],
    };
  }
}

/**
 * Check sanctions and blacklists
 */
export async function checkSanctions(address: string): Promise<{
  sanctioned: boolean;
  blacklisted: boolean;
  reasons: string[];
}> {
  try {
    const response = await fetch(
      `${RANGE_API_URL}/solana/sanctions/${address}`,
      {
        headers: {
          Authorization: `Bearer ${RANGE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return { sanctioned: false, blacklisted: false, reasons: [] };
    }

    const data = await response.json();

    return {
      sanctioned: data.sanctioned || false,
      blacklisted: data.blacklisted || false,
      reasons: data.reasons || [],
    };
  } catch (error) {
    console.error("Range sanctions error:", error);
    return { sanctioned: false, blacklisted: false, reasons: [] };
  }
}

/**
 * Simulate a Solana transaction
 */
export async function simulateTransaction(params: {
  from: string;
  to: string;
  amount: number;
  token?: string;
}): Promise<{
  success: boolean;
  privacyScore: number;
  exposureRisks: string[];
  recommendations: string[];
}> {
  try {
    const response = await fetch(`${RANGE_API_URL}/solana/simulate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RANGE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`Range simulation error: ${response.status}`);
    }

    const data = await response.json();

    return {
      success: data.success !== false,
      privacyScore: data.privacy_score || 50,
      exposureRisks: data.exposure_risks || [],
      recommendations: data.recommendations || [],
    };
  } catch (error) {
    console.error("Range simulation error:", error);
    return {
      success: false,
      privacyScore: 50,
      exposureRisks: ["Simulation failed"],
      recommendations: ["Try again later"],
    };
  }
}

/**
 * Helper: Determine risk level from score
 */
function determineRiskLevel(
  score: number
): "low" | "medium" | "high" | "critical" {
  if (score < 25) return "low";
  if (score < 50) return "medium";
  if (score < 75) return "high";
  return "critical";
}
