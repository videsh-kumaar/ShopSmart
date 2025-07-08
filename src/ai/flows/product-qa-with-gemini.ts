// use server'

/**
 * @fileOverview Implements a Genkit flow for product question answering using Gemini.
 *
 * - productQA - A function that answers user questions about a specific product.
 * - ProductQAInput - The input type for the productQA function.
 * - ProductQAOutput - The return type for the productQA function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductQAInputSchema = z.object({
  productName: z.string().describe('The name of the product the user is asking about.'),
  userQuestion: z.string().describe('The specific question the user has about the product.'),
  productDescription: z.string().describe('The product description.'),
});
export type ProductQAInput = z.infer<typeof ProductQAInputSchema>;

const ProductQAOutputSchema = z.object({
  answer: z.string().describe('A human-like answer to the user question about the product.'),
});
export type ProductQAOutput = z.infer<typeof ProductQAOutputSchema>;

const prompt = ai.definePrompt({
  name: 'productQAPrompt',
  input: {schema: ProductQAInputSchema},
  output: {schema: ProductQAOutputSchema},
  prompt: `You are a helpful AI assistant for a shopping website.

THE CURRENTLY SELECTED PRODUCT IS: {{{productName}}}

PRODUCT INFORMATION:
Name: {{{productName}}}
Description: {{{productDescription}}}

User Question: {{{userQuestion}}}

CRITICAL INSTRUCTIONS:
- You must ONLY discuss the product: "{{{productName}}}"
- Do NOT mention any other products by name; always focus on the selected product
- Use ONLY the provided product description and your knowledge about THIS SPECIFIC PRODUCT
- If asked about something unrelated, redirect back to {{{productName}}}

For the product "{{{productName}}}", provide a helpful answer about this specific product:`,
});

const productQAFlow = ai.defineFlow(
  {
    name: 'productQAFlow',
    inputSchema: ProductQAInputSchema,
    outputSchema: ProductQAOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

export async function productQA(input: ProductQAInput): Promise<ProductQAOutput> {
  return productQAFlow(input);
}
