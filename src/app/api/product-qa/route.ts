import { NextRequest, NextResponse } from "next/server";
import { aiProductQA } from "../../actions";

export async function POST(req: NextRequest) {
  const { productId, userQuestion } = await req.json();
  if (!productId || !userQuestion) {
    return NextResponse.json(
      { error: "Missing productId or userQuestion" },
      { status: 400 }
    );
  }
  const result = await aiProductQA(productId, userQuestion);
  return NextResponse.json(result);
}
