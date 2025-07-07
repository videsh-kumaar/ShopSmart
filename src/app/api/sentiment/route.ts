import { NextRequest, NextResponse } from "next/server";
import { aiProductSentiment } from "../../actions";

export async function POST(req: NextRequest) {
  const { productId } = await req.json();
  if (!productId) {
    return NextResponse.json({ error: "Missing productId" }, { status: 400 });
  }
  const sentiment = await aiProductSentiment(productId);
  return NextResponse.json(sentiment);
}
