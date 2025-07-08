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
    // Mock implementation with product-specific responses
    const { products } = await import('../data/products');
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      throw new Error('Product not found');
    }

    console.log('Mock AI answering for product:', product.name, 'Question:', userQuestion);
    
    // Generate product-specific responses based on category and question
    let answer = '';
    let followUpQuestions: string[] = [];
    
    const questionLower = userQuestion.toLowerCase();
    const productName = product.name.toLowerCase();
    const category = product.category.toLowerCase();
    
    // Rice/Pantry products
    if (category.includes('pantry') || productName.includes('rice')) {
      if (questionLower.includes('biryani')) {
        answer = `Yes, ${product.name} is excellent for biryani! This premium basmati rice has the perfect long grains that remain separate when cooked, giving you that authentic biryani texture. The aromatic quality and fluffy texture make it ideal for absorbing the rich flavors of biryani spices.`;
        followUpQuestions = [
          "How much water should I use for cooking this rice?",
          "What's the best cooking method for fluffy rice?",
          "Can I use this rice for other dishes besides biryani?"
        ];
      } else if (questionLower.includes('cook')) {
        answer = `To cook ${product.name}, use a 1:1.5 ratio of rice to water. Rinse the rice until the water runs clear, then bring to a boil, reduce heat, and simmer covered for 18-20 minutes. Let it rest for 5 minutes before fluffing with a fork.`;
        followUpQuestions = [
          "Can I add spices while cooking?",
          "How do I prevent the rice from sticking?",
          "What dishes pair well with this rice?"
        ];
      } else {
        answer = `${product.name} is a premium quality rice known for its exceptional aroma and texture. ${product.longDescription}`;
        followUpQuestions = [
          "What's the best way to cook this rice?",
          "How much water should I use?",
          "Is this good for biryani?"
        ];
      }
    }
    // Running shoes
    else if (category.includes('running') || category.includes('shoes')) {
      if (questionLower.includes('running') || questionLower.includes('distance')) {
        answer = `${product.name} are designed for running with features like breathable mesh upper, responsive foam midsole, and durable rubber outsole for traction. They provide excellent energy return and comfort for daily runs.`;
        followUpQuestions = [
          "Are these suitable for long-distance running?",
          "How does the cushioning compare to other shoes?",
          "What's the durability like?"
        ];
      } else {
        answer = `${product.name} are high-quality running shoes. ${product.longDescription}`;
        followUpQuestions = [
          "Are these good for daily runs?",
          "How do these fit?",
          "Are they suitable for different terrains?"
        ];
      }
    }
    // Sunscreen/skincare
    else if (category.includes('sunscreen') || category.includes('cream')) {
      answer = `${product.name} provides excellent sun protection. ${product.longDescription}`;
      followUpQuestions = [
        "Is this good for sensitive skin?",
        "How often should I reapply?",
        "Does it leave a white residue?"
      ];
    }
    // Generic fallback
    else {
      answer = `${product.name} is a quality product in our ${product.category} category. ${product.longDescription}`;
      followUpQuestions = [
        "What are the main features?",
        "How does this compare to similar products?",
        "What do other customers say about this?"
      ];
    }
    
    return {
      answer,
      confidence: 0.95,
      followUpQuestions
    };
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
