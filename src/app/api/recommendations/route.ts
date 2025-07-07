import { NextRequest, NextResponse } from "next/server";
import { aiSmartRecommendations } from "../../actions";

export async function POST(req: NextRequest) {
  const { cartProductIds } = await req.json();
  if (!Array.isArray(cartProductIds)) {
    return NextResponse.json(
      { error: "cartProductIds must be an array" },
      { status: 400 }
    );
  }
  const recommendations = await aiSmartRecommendations(cartProductIds);
  return NextResponse.json({ recommendations });
}
