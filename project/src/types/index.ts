export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  image: string;
  modelSrc?: string; // Add this line for the 3D model
  category: string;
  sentiment: {
    positive: number;
    negative: number;
    aspects: {
      comfort?: number;
      fit?: number;
      quality?: number;
      freshness?: number;
      flavor?: number;
      durability?: number;
      waterproof?: number;
      userExperience?: number;
      aroma?: number;
      texture?: number;
    };
  };
  dataAiHint: string;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface SearchIntent {
  type: 'product' | 'recipe' | 'skincare' | 'clothing';
  keywords: string[];
  budget?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  category?: string;
  ingredients?: string[];
  skinType?: string;
  preferences?: string[];
}

export interface RecommendationContext {
  currentCart: CartItem[];
  searchHistory: string[];
  category?: string;
  budget?: number;
}