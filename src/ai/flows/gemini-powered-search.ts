// src/ai/flows/gemini-powered-search.ts
'use server';

/**
 * @fileOverview An AI agent that uses natural language to search for products.
 *
 * - geminiPoweredSearch - A function that handles the product search process.
 * - GeminiPoweredSearchInput - The input type for the geminiPoweredSearch function.
 * - GeminiPoweredSearchOutput - The return type for the geminiPoweredSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeminiPoweredSearchInputSchema = z.object({
  query: z.string().describe('The user query to search for products.'),
});
export type GeminiPoweredSearchInput = z.infer<typeof GeminiPoweredSearchInputSchema>;

const GeminiPoweredSearchOutputSchema = z.object({
  products: z
    .array(z.string())
    .describe('A list of product names that match the user query.'),
});
export type GeminiPoweredSearchOutput = z.infer<typeof GeminiPoweredSearchOutputSchema>;

export async function geminiPoweredSearch(input: GeminiPoweredSearchInput): Promise<GeminiPoweredSearchOutput> {
  return geminiPoweredSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'geminiPoweredSearchPrompt',
  input: {schema: GeminiPoweredSearchInputSchema},
  output: {schema: GeminiPoweredSearchOutputSchema},
  prompt: `You are a product search assistant. The user will provide a
query, and you should return a list of product names that match the user
query. The product names should be as specific as possible.

User Query: {{{query}}}`,
});

const geminiPoweredSearchFlow = ai.defineFlow(
  {
    name: 'geminiPoweredSearchFlow',
    inputSchema: GeminiPoweredSearchInputSchema,
    outputSchema: GeminiPoweredSearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
