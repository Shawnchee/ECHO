import { NextRequest, NextResponse } from "next/server";
import { analyzeWalletPrivacy } from "@/lib/privacy-engine";
import { PublicKey } from "@solana/web3.js";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address } = body;

    // Validate address
    if (!address || typeof address !== "string") {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Verify it's a valid Solana address
    try {
      new PublicKey(address);
    } catch {
      return NextResponse.json(
        { error: "Invalid Solana address" },
        { status: 400 }
      );
    }

    // Run privacy analysis
    console.log(`Analyzing wallet: ${address}`);
    const analysis = await analyzeWalletPrivacy(address);

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: error.message || "Analysis failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "POST wallet address to /api/analyze" },
    { status: 200 }
  );
}
