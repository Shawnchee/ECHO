import { NextRequest, NextResponse } from "next/server";
import { 
  getShadowWireBalance, 
  simulatePrivateTransfer,
  type ShadowWireToken 
} from "@/lib/api/shadowwire";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...params } = body;

    switch (action) {
      case "getBalance": {
        const { address, token = "SOL" } = params;
        if (!address) {
          return NextResponse.json(
            { error: "Address is required" },
            { status: 400 }
          );
        }
        
        const balance = await getShadowWireBalance(address, token as ShadowWireToken);
        return NextResponse.json(balance);
      }

      case "simulate": {
        const { sender, recipient, amount, token = "SOL" } = params;
        if (!sender || !recipient || !amount) {
          return NextResponse.json(
            { error: "Sender, recipient, and amount are required" },
            { status: 400 }
          );
        }
        
        const result = await simulatePrivateTransfer({
          sender,
          recipient,
          amount: parseFloat(amount),
          token: token as ShadowWireToken,
        });
        return NextResponse.json(result);
      }

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error("ShadowWire API error:", error);
    return NextResponse.json(
      { 
        error: error.message || "ShadowWire operation failed",
        details: error.toString()
      },
      { status: 500 }
    );
  }
}
