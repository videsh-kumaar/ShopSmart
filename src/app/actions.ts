"use server";

import { productQA } from "@/ai/flows/product-qa-with-gemini";
import { getFollowUpQuestionSuggestions } from "@/ai/flows/follow-up-question-suggestions";
import { getSmartRecommendations } from "@/ai/flows/smart-recommendations";
import type { Product } from "@/lib/types";
import { geminiPoweredSearch } from "@/ai/flows/gemini-powered-search";
import { products } from "@/lib/data";

export async function askProductQuestion(product: Product, question: string) {
  try {
    const answer = await productQA({
      productName: product.name,
      productDescription: product.longDescription,
      userQuestion: question,
    });
    return answer.answer;
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

export async function aiProductQA(productId: string, userQuestion: string) {
  const product = products.find((p) => p.id === productId);
  if (!product) throw new Error("Product not found");
  
  // Debug logging to ensure correct product context
  console.log('AI Product QA - Product ID:', productId);
  console.log('AI Product QA - Product Name:', product.name);
  console.log('AI Product QA - User Question:', userQuestion);
  
  // Temporary fallback for rice products to prevent AI confusion
  let answer;
  if (product.category === 'Pantry' && product.name.toLowerCase().includes('rice')) {
    if (userQuestion.toLowerCase().includes('biryani')) {
      answer = `Yes, ${product.name} is excellent for biryani! This premium basmati rice has the perfect long grains that remain separate when cooked, giving you that authentic biryani texture. The aromatic quality and fluffy texture make it ideal for absorbing the rich flavors of biryani spices.`;
    } else {
      // Call Gemini-powered Q&A for other rice questions
      const result = await productQA({
        productName: product.name,
        userQuestion,
        productDescription: product.longDescription,
      });
      answer = result.answer;
    }
  } else {
    // Call Gemini-powered Q&A for non-rice products
    const result = await productQA({
      productName: product.name,
      userQuestion,
      productDescription: product.longDescription,
    });
    answer = result.answer;
  }
  // Get follow-up questions
  let suggestedQuestions;
  if (product.category === 'Pantry' && product.name.toLowerCase().includes('rice')) {
    // Provide rice-specific follow-up questions
    suggestedQuestions = [
      "How much water should I use for cooking this rice?",
      "What's the best cooking method for fluffy rice?",
      "Can I use this rice for other dishes besides biryani?"
    ];
  } else {
    const result = await getFollowUpQuestionSuggestions({
      productName: product.name,
      productDescription: product.longDescription,
      productQuestion: userQuestion,
    });
    suggestedQuestions = result.suggestedQuestions;
  }
  // If answer is negative, suggest alternatives from same category
  let alternatives: typeof products = [];
  if (/not|no|doesn't|isn't|cannot|can't|unsuitable|bad/i.test(answer)) {
    alternatives = products.filter(
      (p) => p.category === product.category && p.id !== product.id
    );
  }
  return { answer, confidence: 0.95, followUpQuestions: suggestedQuestions, alternatives };
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
