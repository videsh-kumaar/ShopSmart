import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Ensure API key is available
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
if (!apiKey) {
  throw new Error('Missing GEMINI_API_KEY or GOOGLE_API_KEY environment variable');
}

export const ai = genkit({
  plugins: [googleAI({
    apiKey: apiKey
  })],
  model: 'googleai/gemini-2.0-flash',
});
