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

export async function suggestFollowUpQuestions(question: string) {
  try {
    const suggestions = await getFollowUpQuestionSuggestions({
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
  // Call Gemini-powered Q&A
  const { answer } = await productQA({
    productName: product.name,
    userQuestion,
    productDescription: product.longDescription,
  });
  // Get follow-up questions
  const { suggestedQuestions } = await getFollowUpQuestionSuggestions({
    productQuestion: userQuestion,
  });
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
