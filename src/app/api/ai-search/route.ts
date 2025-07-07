import { NextRequest, NextResponse } from "next/server";
import { aiProductSearch } from "../../actions";

export async function POST(req: NextRequest) {
  const { query } = await req.json();
  if (!query || typeof query !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid query" },
      { status: 400 }
    );
  }
  const products = await aiProductSearch(query);
  return NextResponse.json({ products });
}
