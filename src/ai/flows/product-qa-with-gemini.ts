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
});
export type ProductQAOutput = z.infer<typeof ProductQAOutputSchema>;

const prompt = ai.definePrompt({
  name: 'productQAPrompt',
  input: {schema: ProductQAInputSchema},
  output: {schema: ProductQAOutputSchema},
  prompt: `You are a helpful product expert. Answer the user's specific question with practical advice.

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

🚨 ABSOLUTE RULES:
1. DIRECTLY answer the user's question - NO product marketing
2. For HOW-TO questions: Give step-by-step instructions
3. For comfort/quality questions: Explain specific features that provide that benefit
4. For care/maintenance: Provide practical care instructions
5. For suitability: Explain why it works for that use case
6. NEVER start with product descriptions like "Premium grade" or "engineered for"
7. Start with the answer to their question immediately
8. Use the response style: "{{{responseVariationSeed}}}"

📋 APPROACH:
- Answer the question FIRST
- Then explain why, using product features
- Give actionable advice
- Be specific and practical
- Avoid marketing language

💡 The user asked: "{{{userQuestion}}}" - answer it directly:`,
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
    
    const {output} = await prompt(input);
    
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
    variationSeed
  });
  
  return productQAFlow(enhancedInput);
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
