// Mock Gemini AI Service - In production, this would integrate with actual Google Gemini API
export class GeminiService {
  private static instance: GeminiService;

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  async searchProducts(query: string) {
    const response = await fetch("/api/ai-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    if (!response.ok) throw new Error("Failed to search products");
    const data = await response.json();
    return data.products;
  }

  async answerProductQuestion(productId: string, userQuestion: string) {
    const response = await fetch("/api/product-qa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, userQuestion }),
    });
    if (!response.ok) throw new Error("Failed to get product Q&A");
    return await response.json();
  }

  async generateRecommendations(cartProductIds: string[]) {
    const response = await fetch("/api/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartProductIds }),
    });
    if (!response.ok) throw new Error("Failed to get recommendations");
    const data = await response.json();
    return data.recommendations;
  }

  async getProductSentiment(productId: string) {
    const response = await fetch("/api/sentiment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    if (!response.ok) throw new Error("Failed to get sentiment");
    return await response.json();
  }

  async extractSearchIntent(query: string) {
    // Mock implementation - in production, this would call Gemini API
    const lowerQuery = query.toLowerCase();

    // Recipe detection
    if (
      lowerQuery.includes("cook") ||
      lowerQuery.includes("recipe") ||
      lowerQuery.includes("make")
    ) {
      const recipeKeywords = this.extractRecipeKeywords(lowerQuery);
      return {
        type: "recipe" as const,
        keywords: recipeKeywords,
        ingredients: this.mapToIngredients(recipeKeywords),
        category: "Groceries",
      };
    }

    // Skincare detection
    if (
      lowerQuery.includes("skin") ||
      lowerQuery.includes("face") ||
      lowerQuery.includes("sunscreen") ||
      lowerQuery.includes("oily") ||
      lowerQuery.includes("dry") ||
      lowerQuery.includes("acne")
    ) {
      return {
        type: "skincare" as const,
        keywords: this.extractSkincareKeywords(lowerQuery),
        skinType: this.detectSkinType(lowerQuery),
        category: "Skincare",
      };
    }

    // Clothing detection
    if (
      lowerQuery.includes("jacket") ||
      lowerQuery.includes("shirt") ||
      lowerQuery.includes("wear") ||
      lowerQuery.includes("clothing") ||
      (lowerQuery.includes("under") && lowerQuery.includes("₹"))
    ) {
      return {
        type: "clothing" as const,
        keywords: this.extractClothingKeywords(lowerQuery),
        budget: this.extractBudget(lowerQuery),
        category: "Clothing",
      };
    }

    // Default product search
    return {
      type: "product" as const,
      keywords: lowerQuery.split(" ").filter((word) => word.length > 2),
      budget: this.extractBudget(lowerQuery),
    };
  }

  private extractRecipeKeywords(query: string): string[] {
    const recipeWords = [
      "fried rice",
      "biryani",
      "stir fry",
      "pasta",
      "curry",
      "soup",
    ];
    return recipeWords.filter((word) => query.includes(word));
  }

  private mapToIngredients(recipeKeywords: string[]): string[] {
    const ingredientMap: Record<string, string[]> = {
      "fried rice": [
        "rice",
        "soy sauce",
        "onions",
        "oil",
        "eggs",
        "vegetables",
      ],
      biryani: ["basmati rice", "spices", "onions", "meat", "yogurt"],
      "stir fry": ["vegetables", "soy sauce", "oil", "garlic", "ginger"],
    };

    return recipeKeywords.flatMap((keyword) => ingredientMap[keyword] || []);
  }

  private extractSkincareKeywords(query: string): string[] {
    const keywords = [];
    if (query.includes("sunscreen") || query.includes("spf"))
      keywords.push("sunscreen");
    if (query.includes("cleanser") || query.includes("face wash"))
      keywords.push("cleanser");
    if (query.includes("moisturizer")) keywords.push("moisturizer");
    return keywords;
  }

  private detectSkinType(query: string): string | undefined {
    if (query.includes("oily")) return "oily";
    if (query.includes("dry")) return "dry";
    if (query.includes("sensitive")) return "sensitive";
    if (query.includes("combination")) return "combination";
    return undefined;
  }

  private extractClothingKeywords(query: string): string[] {
    const keywords = [];
    if (query.includes("jacket")) keywords.push("jacket");
    if (query.includes("shirt")) keywords.push("shirt");
    if (query.includes("winter")) keywords.push("winter");
    if (query.includes("casual")) keywords.push("casual");
    return keywords;
  }

  private extractBudget(query: string): number | undefined {
    const budgetMatch = query.match(/₹(\d+)/);
    if (budgetMatch) {
      return parseInt(budgetMatch[1]);
    }
    return undefined;
  }
}
