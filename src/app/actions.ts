"use server";

import { productQA } from "@/ai/flows/product-qa-with-gemini";
import { getFollowUpQuestionSuggestions } from "@/ai/flows/follow-up-question-suggestions";
import { getSmartRecommendations } from "@/ai/flows/smart-recommendations";
import type { Product } from "@/lib/types";
import { geminiPoweredSearch } from "@/ai/flows/gemini-powered-search";
import { products } from "@/lib/data";

export async function askProductQuestion(product: Product, question: string) {
  try {
    const result = await productQA({
      productName: product.name,
      productDescription: product.longDescription,
      userQuestion: question,
    });
    
    // Log relevance for debugging
    console.log('🔍 Question Relevance:', {
      productName: product.name,
      question: question,
      isRelevant: result.isRelevant,
      timestamp: new Date().toISOString()
    });
    
    return result.answer;
  } catch (error) {
    console.error(error);
    return "I'm sorry, I encountered an error while trying to answer your question. Please try again.";
  }
}

export async function suggestFollowUpQuestions(product: Product, question: string) {
  try {
    const suggestions = await getFollowUpQuestionSuggestions({
      productName: product.name,
      productDescription: product.longDescription,
      productQuestion: question,
    });
    return suggestions.suggestedQuestions;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchSmartRecommendations(product: Product) {
  try {
    const recommendations = await getSmartRecommendations({
      userBehavior: `Viewing product: ${product.name}`,
      productAttributes: `Category: ${product.category}, Price: ${product.price}`,
    });
    return recommendations.recommendations;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function aiProductSearch(query: string) {
  // Call Gemini-powered search to get relevant product names
  const { products: productNames } = await geminiPoweredSearch({ query });
  // Map product names to full product objects
  const matchedProducts = products.filter((p) => productNames.includes(p.name));
  return matchedProducts;
}

// In-memory conversation context storage (in production, use Redis or similar)
const conversationContexts = new Map<string, { 
  previousQuestions: string[], 
  responses: string[], 
  usedVariationSeeds: string[],
  lastActivity: number 
}>();

export async function aiProductQA(productId: string, userQuestion: string, sessionId?: string) {
  const product = products.find((p) => p.id === productId);
  if (!product) throw new Error("Product not found");
  
  // Create session key for conversation tracking
  const contextKey = sessionId || `${productId}-${Date.now()}`;
  
  // Get or initialize conversation context
  let context = conversationContexts.get(contextKey) || { 
    previousQuestions: [], 
    responses: [], 
    usedVariationSeeds: [], 
    lastActivity: Date.now() 
  };
  
  // Debug logging to ensure correct product context
  console.log('🔍 AI Product QA - Starting:', {
    productId,
    productName: product.name,
    productCategory: product.category,
    userQuestion,
    previousQuestionsCount: context.previousQuestions.length,
    timestamp: new Date().toISOString()
  });
  
  // CRITICAL: Validate that we have the right product context
  if (!product.name || !product.longDescription) {
    throw new Error(`Invalid product data for ID: ${productId}`);
  }
  
  try {
    // Always use the AI flow for dynamic responses
    const result = await productQA({
      productName: product.name,
      userQuestion,
      productDescription: product.longDescription,
      previousQuestions: context.previousQuestions,
      conversationContext: context.responses.slice(-2).join(' | ') // Last 2 responses
    });
    
    const answer = result.answer;
    
    // Update conversation context
    context.previousQuestions.push(userQuestion);
    context.responses.push(answer);
    
    // Keep only last 5 interactions to prevent memory bloat
    if (context.previousQuestions.length > 5) {
      context.previousQuestions = context.previousQuestions.slice(-5);
      context.responses = context.responses.slice(-5);
    }
    
    conversationContexts.set(contextKey, context);
    
    // Get AI-generated follow-up questions with context
    const followUpResult = await getFollowUpQuestionSuggestions({
      productName: product.name,
      productDescription: product.longDescription,
      productQuestion: userQuestion,
      previousQuestions: context.previousQuestions,
    });
    
    // If answer is negative, suggest alternatives from same category
    let alternatives: typeof products = [];
    if (/not|no|doesn't|isn't|cannot|can't|unsuitable|bad/i.test(answer)) {
      alternatives = products.filter(
        (p) => p.category === product.category && p.id !== product.id
      );
    }
    
    console.log('✅ AI Product QA - Success:', {
      productName: product.name,
      answerLength: answer.length,
      followUpCount: followUpResult.suggestedQuestions.length,
      alternativesCount: alternatives.length
    });
    
    return { 
      answer, 
      confidence: 0.95, 
      followUpQuestions: followUpResult.suggestedQuestions, 
      alternatives 
    };
  } catch (error) {
    console.error('❌ AI Product QA - Error:', error);
    throw error;
  }
}

export async function aiSmartRecommendations(cartProductIds: string[]) {
  // Get cart products and build user behavior string
  const cartProducts = products.filter((p) => cartProductIds.includes(p.id));
  const userBehavior = `Cart contains: ${cartProducts
    .map((p) => p.name)
    .join(", ")}`;
  const productAttributes = cartProducts
    .map((p) => `${p.category}, ${p.price}`)
    .join("; ");
  // Call Gemini-powered recommendations
  const { recommendations } = await getSmartRecommendations({
    userBehavior,
    productAttributes,
  });
  // Map recommended product names to full product objects
  const recommendedProducts = products.filter((p) =>
    recommendations.some((r) => r.productName === p.name)
  );
  return recommendedProducts;
}

export async function aiProductSentiment(productId: string) {
  const product = products.find((p) => p.id === productId);
  if (!product) throw new Error("Product not found");
  // Return sentiment stats and highlights from product data
  const { sentiment } = product;
  // Optionally, add review highlights if available (future enhancement)
  return {
    positive: sentiment.positive,
    negative: sentiment.negative,
    aspects: sentiment.aspects,
    highlights: [], // Placeholder for future review highlights
  };
}
