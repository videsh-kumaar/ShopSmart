// types.ts

// Define a flexible type for all possible sentiment aspect keys
export type SentimentAspects = {
  comfort?: number;
  fit?: number;
  quality?: number;
  freshness?: number;
  flavor?: number;
  durability?: number;
  waterproof?: number;
  userExperience?: number;
  warmth?: number;
  style?: number;
  protection?: number;
  texture?: number;
  effectiveness?: number;
  sensitivity?: number;
  convenience?: number;
  non_greasy?: number;
  hydration?: number;
  smell?: number;
  ease_of_application?: number;
  windproof?: number;
  soothing?:number;
  gentleness?:number;
  taste?:number;
  sweetness?:number;
};

// Main product type
export type Product = {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  image: string;
  category: string;
  sentiment: {
    positive: number;
    negative: number;
    aspects: SentimentAspects;
  };
  dataAiHint: string;
  tags?: string[];         // for ingredients etc. (used for vegetables, sunscreen)
};