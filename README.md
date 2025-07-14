# WalSmart AI – Intelligent E-Commerce Experience for Walmart

## Overview

WalSmart AI is a next-generation, AI-powered shopping assistant for Walmart, built for Sparkathon 2025. It features natural language search, smart recommendations, real-time Q&A, sentiment analysis, and a beautiful glassmorphic UI with Apple-style animations.

## Features

- **AI Search Bar:** Natural language product and recipe search (Gemini-powered)
- **Product Q&A:** "Know Me" button for product-specific AI answers and follow-ups
- **Smart Cart Recommendations:** Real-time, context-aware suggestions
- **Sentiment Analysis Viewer:** Visual summary of product reviews and aspects
- **Animated Checkout:** Apple-style, glassmorphic checkout and confirmation
- **Glassmorphic UI:** Modern, animated, and responsive design

## Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion
- **Backend:** Next.js API routes, local functions
- **AI Layer:** Google Gemini API (via Vertex AI)
- **Data:** Real product and review data in `src/lib/data.ts` and CSVs

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd Walmart
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Environment Variables:**

   - Copy `.env.example` to `.env` and add your Gemini API key and any other required secrets.

4. **Run the app locally:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Environment Variables

- `GEMINI_API_KEY` – Your Google Gemini API key (required for all AI features)

## Deployment

- Deploy on Vercel, Netlify, or your preferred platform.
- Ensure environment variables are set in your deployment dashboard.

## Hackathon-Ready

- All AI features are live and use real Gemini API calls (no stubs or mocks)
- Real product data, reviews, and sentiment
- Fully animated, glassmorphic, and mobile-friendly UI

## License

MIT
