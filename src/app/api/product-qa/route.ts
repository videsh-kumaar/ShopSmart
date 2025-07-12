import { NextRequest, NextResponse } from "next/server";
import { aiProductQA } from "../../actions";

export async function POST(req: NextRequest) {
  try {
    const { productId, userQuestion, sessionId } = await req.json();
    
    // Comprehensive input validation
    if (!productId || !userQuestion) {
      return NextResponse.json(
        { error: "Missing productId or userQuestion" },
        { status: 400 }
      );
    }
    
    if (typeof productId !== 'string' || typeof userQuestion !== 'string') {
      return NextResponse.json(
        { error: "Invalid input types" },
        { status: 400 }
      );
    }
    
    if (userQuestion.trim().length === 0) {
      return NextResponse.json(
        { error: "Question cannot be empty" },
        { status: 400 }
      );
    }
    
    console.log('🔗 API Route: Processing request for', { 
      productId, 
      userQuestion: userQuestion.substring(0, 50) + '...', 
      sessionId,
      timestamp: new Date().toISOString()
    });
    
    const result = await aiProductQA(productId, userQuestion.trim(), sessionId);
    
    // Validate the result
    if (!result || !result.answer) {
      return NextResponse.json(
        { error: "Invalid response from AI service" },
        { status: 500 }
      );
    }
    
    console.log('✅ API Route: Successful response for product', productId, 'with answer length:', result.answer.length);
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('❌ API Route: Error processing request:', error);
    
    return NextResponse.json(
      { 
        error: "Internal server error", 
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
