/**
 * Gemini AI Client
 * Generate plain-language privacy summaries and explanations
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export interface PrivacySummary {
  summary: string;
  keyRisks: string[];
  recommendations: string[];
  privacyScore: number;
}

/**
 * Generate privacy summary for a wallet
 */
export async function generatePrivacySummary(walletData: {
  address: string;
  transactionCount: number;
  uniqueInteractions: number;
  risks: Array<{ title: string; severity: string }>;
  temporalPatterns?: { hasPatterns: boolean; commonHours: number[] };
  rangeRiskScore?: number;
}): Promise<PrivacySummary> {
  try {
    const prompt = `
You are a blockchain privacy expert. Analyze this Solana wallet's privacy:

**Wallet:** ${walletData.address}
**Transactions:** ${walletData.transactionCount}
**Unique Addresses Interacted With:** ${walletData.uniqueInteractions}
**Detected Risks:** ${walletData.risks.map((r) => `${r.severity} - ${r.title}`).join(", ")}
${walletData.temporalPatterns?.hasPatterns ? `**Temporal Patterns:** Transactions clustered at hours ${walletData.temporalPatterns.commonHours.join(", ")}` : ""}
${walletData.rangeRiskScore ? `**External Risk Score:** ${walletData.rangeRiskScore}/100` : ""}

Provide:
1. A 2-3 sentence plain-language summary of the wallet's privacy status
2. Top 3 privacy risks (bullet points)
3. Top 3 recommendations to improve privacy (bullet points)

Format your response as JSON:
{
  "summary": "...",
  "keyRisks": ["...", "...", "..."],
  "recommendations": ["...", "...", "..."]
}
`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    // Extract JSON from response (might be wrapped in markdown)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    return {
      summary: parsed.summary || "Privacy analysis complete.",
      keyRisks: parsed.keyRisks || [],
      recommendations: parsed.recommendations || [],
      privacyScore: calculatePrivacyScore(walletData),
    };
  } catch (error) {
    console.error("Gemini API error:", error);
    // Fallback to rule-based summary
    return generateFallbackSummary(walletData);
  }
}

/**
 * Calculate privacy score from wallet data
 */
function calculatePrivacyScore(walletData: {
  transactionCount: number;
  uniqueInteractions: number;
  risks: Array<{ severity: string }>;
  rangeRiskScore?: number;
}): number {
  let score = 100;

  // Deduct for risks
  const criticalRisks = walletData.risks.filter((r) => r.severity === "critical").length;
  const highRisks = walletData.risks.filter((r) => r.severity === "high").length;
  const mediumRisks = walletData.risks.filter((r) => r.severity === "medium").length;

  score -= criticalRisks * 20;
  score -= highRisks * 10;
  score -= mediumRisks * 5;

  // Deduct for high interaction count (more exposure)
  if (walletData.uniqueInteractions > 50) score -= 10;
  if (walletData.uniqueInteractions > 100) score -= 10;

  // Factor in Range risk score
  if (walletData.rangeRiskScore) {
    score -= walletData.rangeRiskScore * 0.3; // 30% weight to Range score
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Fallback summary if Gemini fails
 */
function generateFallbackSummary(walletData: {
  transactionCount: number;
  uniqueInteractions: number;
  risks: Array<{ title: string; severity: string }>;
}): PrivacySummary {
  const score = calculatePrivacyScore(walletData);

  let summary = `This wallet has made ${walletData.transactionCount} transactions with ${walletData.uniqueInteractions} unique addresses.`;

  if (score > 75) {
    summary += " Privacy appears strong with minimal exposure.";
  } else if (score > 50) {
    summary += " Privacy is moderate with some identifiable patterns.";
  } else {
    summary += " Privacy is weak with significant deanonymization risks.";
  }

  const keyRisks = walletData.risks.slice(0, 3).map((r) => r.title);
  const recommendations = [
    "Use privacy-preserving protocols like ShadowWire for future transfers",
    "Avoid transacting with KYC exchanges directly",
    "Randomize transaction timing to reduce temporal correlation",
  ];

  return { summary, keyRisks, recommendations, privacyScore: score };
}
