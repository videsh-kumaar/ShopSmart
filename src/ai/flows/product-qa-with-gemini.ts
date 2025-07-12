// use server'

/**
 * @fileOverview Implements a Genkit flow for product question answering using Gemini.
 *
 * - productQA - A function that answers user questions about a specific product.
 * - ProductQAInput - The input type for the productQA function.
 * - ProductQAOutput - The return type for the productQA function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductQAInputSchema = z.object({
  productName: z.string().describe('The name of the product the user is asking about.'),
  userQuestion: z.string().describe('The specific question the user has about the product.'),
  productDescription: z.string().describe('The product description.'),
  conversationContext: z.string().optional().describe('Previous conversation context to avoid repetition.'),
  questionType: z.string().optional().describe('Type of question: general, technical, comparison, etc.'),
  previousQuestions: z.array(z.string()).optional().describe('List of previous questions asked about this product.'),
  responseVariationSeed: z.string().optional().describe('Random seed to ensure response variation.'),
});
export type ProductQAInput = z.infer<typeof ProductQAInputSchema>;

const ProductQAOutputSchema = z.object({
  answer: z.string().describe('A human-like answer to the user question about the product.'),
  isRelevant: z.boolean().describe('Whether the question is relevant to the product.'),
});
export type ProductQAOutput = z.infer<typeof ProductQAOutputSchema>;

const prompt = ai.definePrompt({
  name: 'productQAPrompt',
  input: {schema: ProductQAInputSchema},
  output: {schema: ProductQAOutputSchema},
  prompt: `You are a helpful product expert. First, determine if the user's question is related to the product. Then provide an appropriate response.

🎯 CONTEXT:
- Product: "{{{productName}}}"
- User's Question: "{{{userQuestion}}}"
- Product Details: "{{{productDescription}}}"
- Style: {{{responseVariationSeed}}}

{{#conversationContext}}
💬 Previous: {{{conversationContext}}}
{{/conversationContext}}
{{#previousQuestions}}
📝 Asked before: {{{previousQuestions}}}
{{/previousQuestions}}

🔍 RELEVANCE CHECK:
First, analyze if the question is related to:
- The product itself (features, usage, specifications, quality, etc.)
- Purchasing decisions about this product
- Product comparisons or alternatives
- Product care, maintenance, or troubleshooting
- Product compatibility or suitability

🚨 RESPONSE RULES:

IF THE QUESTION IS PRODUCT-RELATED (isRelevant: true):
1. DIRECTLY answer the user's question - NO product marketing
2. For HOW-TO questions: Give step-by-step instructions
3. For comfort/quality questions: Explain specific features that provide that benefit
4. For care/maintenance: Provide practical care instructions
5. For suitability: Explain why it works for that use case
6. NEVER start with product descriptions like "Premium grade" or "engineered for"
7. Start with the answer to their question immediately
8. Use the response style: "{{{responseVariationSeed}}}"

IF THE QUESTION IS NOT PRODUCT-RELATED (isRelevant: false):
1. Politely acknowledge that the question is not related to the product
2. Explain that you're designed to help with product-related questions
3. Suggest they ask questions about the product features, usage, or specifications
4. Be helpful and redirect them back to product-related topics

📋 APPROACH:
- First determine relevance (isRelevant: true/false)
- If relevant: Answer the question FIRST, then explain why using product features
- If not relevant: Politely redirect to product-related questions
- Be specific and practical
- Avoid marketing language

💡 Analyze: Is "{{{userQuestion}}}" related to the product "{{{productName}}}"?`,
});

const productQAFlow = ai.defineFlow(
  {
    name: 'productQAFlow',
    inputSchema: ProductQAInputSchema,
    outputSchema: ProductQAOutputSchema,
  },
  async input => {
    // Enhanced logging for debugging
    console.log('🤖 ProductQA Flow - Input:', {
      productName: input.productName,
      userQuestion: input.userQuestion,
      hasContext: !!input.conversationContext,
      questionType: input.questionType,
      timestamp: new Date().toISOString()
    });
    
let output = await prompt(input);

// Check for relevance and provide fallback for irrelevant questions
if (!output.isRelevant) {
  output.answer = "I'm here to help with product-related questions. Please ask about product features, usage, or specifications.";
}

// Log the response for debugging
console.log('🤖 ProductQA Flow - Output:', {
  productName: input.productName,
  answerLength: output?.answer?.length || 0,
  timestamp: new Date().toISOString()
});
    
    return output!;
  }
);

export async function productQA(input: ProductQAInput): Promise<ProductQAOutput> {
  console.log('🚀 ProductQA: Starting with input:', {
    productName: input.productName,
    userQuestion: input.userQuestion,
    timestamp: new Date().toISOString()
  });
  
  // Pre-check for irrelevant questions
  const isRelevant = isQuestionRelevant(input.userQuestion, input.productName);
  
  console.log('🔍 ProductQA: Relevance check result:', {
    userQuestion: input.userQuestion,
    productName: input.productName,
    isRelevant,
    timestamp: new Date().toISOString()
  });
  
  if (!isRelevant) {
    console.log('❌ ProductQA: Question detected as irrelevant:', {
      productName: input.productName,
      userQuestion: input.userQuestion,
      timestamp: new Date().toISOString()
    });
    
    const irrelevantResponse = {
      answer: `I'm here to help with questions about ${input.productName}. Please ask about the product's features, usage, specifications, or how it might work for your needs. For example, you could ask about its quality, how to use it, or whether it's suitable for a specific purpose.`,
      isRelevant: false
    };
    
    console.log('🔄 ProductQA: Returning irrelevant response:', irrelevantResponse);
    return irrelevantResponse;
  }
  
  // Add question type classification
  const questionType = classifyQuestionType(input.userQuestion);
  
  // Generate variation seed to ensure different responses
  const variationSeed = generateVariationSeed(input.userQuestion, input.productName);
  
  // Enhanced input with question type and variation seed
  const enhancedInput = {
    ...input,
    questionType: input.questionType || questionType,
    responseVariationSeed: input.responseVariationSeed || variationSeed
  };
  
  console.log('🔍 ProductQA Entry:', {
    productName: input.productName,
    questionType,
    userQuestion: input.userQuestion,
    variationSeed,
    isRelevant
  });
  
  const result = await productQAFlow(enhancedInput);
  // Ensure isRelevant is set to true for processed questions
  result.isRelevant = true;
  return result;
}

// Helper function to classify question types
function classifyQuestionType(question: string): string {
  const q = question.toLowerCase();
  
  if (q.includes('how') || q.includes('cook') || q.includes('use') || q.includes('install')) {
    return 'usage';
  }
  if (q.includes('compare') || q.includes('vs') || q.includes('better') || q.includes('difference')) {
    return 'comparison';
  }
  if (q.includes('price') || q.includes('cost') || q.includes('cheap') || q.includes('expensive')) {
    return 'pricing';
  }
  if (q.includes('warranty') || q.includes('guarantee') || q.includes('return') || q.includes('policy')) {
    return 'policy';
  }
  if (q.includes('size') || q.includes('dimensions') || q.includes('weight') || q.includes('fit')) {
    return 'specifications';
  }
  if (q.includes('delivery') || q.includes('shipping') || q.includes('when') || q.includes('arrive')) {
    return 'logistics';
  }
  
  return 'general';
}

// Function to detect if a question is relevant to the product
function isQuestionRelevant(question: string, productName: string): boolean {
  const q = question.toLowerCase();
  const productWords = productName.toLowerCase().split(' ');
  
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
  for (const pattern of irrelevantPatterns) {
    if (pattern.test(q)) {
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
      return true;
    }
  }
  
  // Check if question contains product-related keywords
  for (const keyword of productKeywords) {
    if (q.includes(keyword)) {
      return true;
    }
  }
  
  // Check for question words that might be product-related
  const questionWords = ['how', 'what', 'when', 'where', 'why', 'which', 'can', 'will', 'does', 'is', 'are'];
  const hasQuestionWord = questionWords.some(word => q.includes(word));
  
  // If it has a question word but no clear irrelevant patterns and no product keywords,
  // it might be a borderline case - let's be conservative and allow it
  if (hasQuestionWord && q.length < 50) {
    return true;
  }
  
  // Default to irrelevant for very generic questions
  return false;
}

// Generate variation seed to ensure different responses
function generateVariationSeed(question: string, productName: string): string {
  const timestamp = Date.now();
  const microseconds = performance.now(); // Add microsecond precision
  const questionHash = question.split('').reduce((hash, char) => hash + char.charCodeAt(0), 0);
  const productHash = productName.split('').reduce((hash, char) => hash + char.charCodeAt(0), 0);
  
  const styles = [
    'Focus on technical details and specifications with precise measurements',
    'Emphasize practical benefits and real-world usage scenarios',
    'Highlight unique features and competitive advantages',
    'Use conversational tone with examples and analogies',
    'Provide step-by-step guidance and instructions',
    'Compare with similar products indirectly',
    'Focus on user experience and comfort aspects',
    'Emphasize quality and durability aspects with longevity focus',
    'Discuss value proposition and cost-effectiveness',
    'Address common concerns and misconceptions',
    'Highlight expert opinions and professional insights',
    'Focus on environmental impact and sustainability',
    'Emphasize customer testimonials and social proof',
    'Focus on ease of use and simplicity',
    'Highlight innovation and cutting-edge technology',
    'Discuss maintenance and care requirements'
  ];
  
  // Apply multiple random factors for better entropy
  const randomFactor1 = Math.floor(Math.random() * 10000);
  const randomFactor2 = Math.floor(Math.random() * 10000);
  const entropyFactor = Math.floor(microseconds * 1000) % 10000;
  
  const combinedHash = questionHash + productHash + timestamp + randomFactor1 + randomFactor2 + entropyFactor;
  const styleIndex = Math.abs(combinedHash) % styles.length;
  
  return styles[styleIndex];
}
