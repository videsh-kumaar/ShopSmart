import { NextRequest, NextResponse } from "next/server";

// Copy the isQuestionRelevant function for testing
function isQuestionRelevant(question: string, productName: string): boolean {
  const q = question.toLowerCase();
  const productWords = productName.toLowerCase().split(' ');
  
  console.log('🧪 Testing relevance for:', { question, productName, normalizedQuestion: q });
  
  // Define patterns for clearly irrelevant questions
  const irrelevantPatterns = [
    // Political questions
    /\b(president|prime minister|government|politics|election|minister|parliament|congress|senate)\b/i,
    // General knowledge questions
    /\b(who is|what is|when did|where is|why did|how many|capital of|currency of)\b.*\b(country|nation|state|city|world|universe|planet|earth|history|war|battle)\b/i,
    // Science/academic questions not related to products
    /\b(formula|equation|theory|law of|scientific|chemistry|physics|biology|mathematics|calculate|solve)\b/i,
    // Sports/entertainment
    /\b(football|cricket|basketball|movie|actor|actress|singer|music|song|album|film|celebrity)\b/i,
    // Weather/time
    /\b(weather|temperature|rain|snow|today|tomorrow|yesterday|time|date|calendar)\b/i,
    // Personal questions
    /\b(my name|your name|who are you|where do you live|how old|birthday|age)\b/i,
  ];
  
  // Check if question matches any irrelevant pattern
  for (let i = 0; i < irrelevantPatterns.length; i++) {
    const pattern = irrelevantPatterns[i];
    if (pattern.test(q)) {
      console.log(`❌ Question matches irrelevant pattern ${i}: ${pattern}`);
      return false;
    }
  }
  
  // Define product-related keywords
  const productKeywords = [
    'product', 'item', 'buy', 'purchase', 'price', 'cost', 'quality', 'features',
    'specifications', 'size', 'weight', 'color', 'material', 'brand', 'model',
    'warranty', 'guarantee', 'return', 'shipping', 'delivery', 'installation',
    'usage', 'use', 'how to', 'instructions', 'manual', 'guide', 'setup',
    'maintenance', 'care', 'clean', 'store', 'compatible', 'works with',
    'suitable', 'good for', 'best for', 'recommended', 'reviews', 'rating',
    'comparison', 'vs', 'versus', 'better', 'difference', 'alternative',
    'similar', 'like this', 'durability', 'lasting', 'lifespan', 'performance'
  ];
  
  // Check if question contains product name words
  for (const word of productWords) {
    if (word.length > 2 && q.includes(word)) {
      console.log(`✅ Question contains product word: ${word}`);
      return true;
    }
  }
  
  // Check if question contains product-related keywords
  for (const keyword of productKeywords) {
    if (q.includes(keyword)) {
      console.log(`✅ Question contains product keyword: ${keyword}`);
      return true;
    }
  }
  
  // Check for question words that might be product-related
  const questionWords = ['how', 'what', 'when', 'where', 'why', 'which', 'can', 'will', 'does', 'is', 'are'];
  const hasQuestionWord = questionWords.some(word => q.includes(word));
  
  // If it has a question word but no clear irrelevant patterns and no product keywords,
  // it might be a borderline case - let's be conservative and allow it
  if (hasQuestionWord && q.length < 50) {
    console.log(`⚠️ Borderline case - has question word but no clear classification`);
    return true;
  }
  
  console.log(`❌ Defaulting to irrelevant`);
  // Default to irrelevant for very generic questions
  return false;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const question = searchParams.get('question') || 'president of india';
  const productName = searchParams.get('product') || 'Rice Cooker';
  
  console.log('🔍 Testing question relevance via API:', { question, productName });
  
  const isRelevant = isQuestionRelevant(question, productName);
  
  return NextResponse.json({
    question,
    productName,
    isRelevant,
    timestamp: new Date().toISOString()
  });
}

export async function POST(req: NextRequest) {
  try {
    const { question, productName } = await req.json();
    
    console.log('🔍 Testing question relevance via POST API:', { question, productName });
    
    const isRelevant = isQuestionRelevant(question, productName);
    
    return NextResponse.json({
      question,
      productName,
      isRelevant,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error in test endpoint:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
