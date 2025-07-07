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
  prompt: `You are a helpful AI assistant for Walmart.
Your task is to answer the user's question.

First, check if the question is about the product they are looking at.
- If it is, use the product's description to answer. If the description isn't enough, use your general knowledge.
- If the question is NOT about the product, you MUST still answer their question. Acknowledge that the question is off-topic for the product, and then provide a helpful answer using your general knowledge.

Example for an off-topic question:
Product: Hiking Boots
Question: What's the best rice for fried rice?
Your Answer: "That's a great question! While we're looking at hiking boots right now, I can definitely help with that. For fried rice, it's best to use medium to long-grain rice like Jasmine or Basmati. Using day-old, refrigerated rice is also a key trick to prevent it from getting mushy."

Now, answer the following:

Product Name: {{{productName}}}
Product Description: {{{productDescription}}}
User Question: {{{userQuestion}}}

Answer:`,
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
