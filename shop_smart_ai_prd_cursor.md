# Product Requirements Document (PRD) for ShopSmart AI

## Project Title:

ShopSmart AI – Intelligent E-Commerce Experience for Walmart (Cursor-Compatible PRD)

## Problem Statement:

Walmart has a vast catalog across multiple categories such as groceries, apparel, personal care, and electronics. However, customers often find it difficult to locate what they truly need, especially when searching by use-case or context (e.g., "I want to cook Fried Rice" or "Show me jackets for snow"). The traditional keyword search lacks intent recognition and does not personalize the shopping journey.

## Objective:

To develop an AI-powered shopping assistant that enhances user interaction with Walmart's product ecosystem. The assistant should understand natural queries, provide smart recommendations, suggest contextual items (e.g., recipe-based needs), and display real-time insights using real-world product data across various categories.

## Functional Goals:

1. Build an AI assistant capable of:
   - Understanding natural language shopping queries
   - Parsing intent such as health needs, cooking goals, or style preferences
   - Recommending complete product lists based on context (e.g., meal prep, skincare routines)
2. Display high-quality product cards with actual product metadata
3. Integrate sentiment insights derived from Walmart customer reviews
4. Trigger recommendations and follow-up questions based on user behavior

## Product Scope:

- Categories covered:
  - Footwear (e.g., running shoes)
  - Jackets and outerwear
  - Skincare (e.g., sunscreens, moisturizers)
  - Groceries (vegetables, spices, rice, oils)
  - Apparel (casual wear, formal wear)

## MVP Features:

### 1. AI Search Engine:

- Accepts natural queries (e.g., "Show me water-resistant jackets under ₹3000")
- Uses Gemini API to extract intent and map it to product data in `data.ts`
- Returns filtered products with ranked relevancy

### 2. Product Q&A:

- Each product card has a "Know Me" button
- Uses Gemini to answer questions like "Is this good for oily skin?" or "Will this last in snow?"
- Follow-up prompts are also generated

### 3. Recipe-Based Recommendations:

- Accepts cooking-based queries ("I want to make Fried Rice")
- Lists ingredients and recommends products across groceries
- Option to "Add All to Cart"

### 4. Smart Recommendations:

- Triggers on search or add-to-cart events
- Combines Gemini + product metadata + customer preferences
- Uses sentiment and tag-based filtering

### 5. Sentiment Summary:

- Visual summary of positive and negative reviews
- Extracted from:
  - Kaggle Walmart Reviews Dataset
  - Additional reviews from Google (if needed)

### 6. Checkout Animation:

- Smooth animation and interaction at the checkout page
- Includes progress bar and confirmation effects

## Technical Architecture:

### Stack:

- Frontend: React, Tailwind CSS, Framer Motion
- Backend: Local functions or APIs consuming data from `data.ts`
- AI Layer: Google Gemini API (via Vertex AI)

### Data Handling:

- All product and review data will be stored and queried via `data.ts`
- Datasets will be imported or linked directly via CSV parsing or static objects
- Cursor will determine dataset selection and logic on demand

## Data Requirements:

### 1. Product Data:

- Real-world product entries should follow this structure:

```ts
{
  id: string,
  name: string,
  description: string,
  longDescription: string,
  price: number,
  image: string,
  category: string,
  sentiment: {
    positive: number,
    negative: number,
    aspects: {
      comfort?: number,
      fit?: number,
      quality?: number,
      freshness?: number,
      flavor?: number,
      durability?: number
    }
  },
  dataAiHint: string,
  tags?: string[] // for ingredients etc. (used for vegetables, sunscreen)
}
```

- Categories include:
  - Jackets (e.g., winter, waterproof, windbreaker)
  - Sunscreen and skincare (e.g., SPF creams, aloe gels)
  - Vegetables (e.g., carrots, cabbage, onions)
  - Basic pantry items (e.g., rice, soy sauce, oil)

### 2. Review Sentiment Data:

- Source:
  - Walmart Reviews Dataset (Kaggle)
- Additional scraping allowed from Google Shopping reviews if needed

## Smart Logic Example:

- Query: "I want to cook fried rice"
- Gemini processes:
  - Maps intent to ingredients: rice, soy sauce, oil, onion, carrot, egg (optional)
  - Queries `data.ts` and returns real product entries
  - Adds option: "Add All to Cart"

## User Benefits:

- Easier shopping through conversational queries
- Confidence in purchasing via intelligent Q&A
- Faster checkout and curated recommendations
- Context-aware bundles for groceries, skincare, or fashion

## Unique Selling Point:

A unified shopping assistant that moves beyond filters by using real-time AI to understand context, recommend tailored product bundles, and deliver high-end UX with animation—all driven by real-world product data and trained sentiment insights.

## Data Generation Task:

As part of the backend pipeline, generate real product entries:

- Use Google or Walmart APIs to fetch real products (if allowed)
- Include working images, detailed metadata
- Expand into underserved product categories beyond shoes
- Store in `data.ts` in expected structure

## Next Steps:

- Replace existing placeholder dataset with curated, categorized, and image-rich real data
- Finalize `data.ts` schema with additional fields for multi-category support
- Begin fine-tuning Gemini prompt templates using review and product context
- Use generated dataset as dummy corpus for AI testing until fully automated pipeline is ready

