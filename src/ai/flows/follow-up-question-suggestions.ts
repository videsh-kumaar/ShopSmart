// src/ai/flows/follow-up-question-suggestions.ts
'use server';
/**
 * @fileOverview Provides follow-up question suggestions for a given product question.
 *
 * This file exports:
 * - `getFollowUpQuestionSuggestions`: An async function that takes a product question as input and returns suggested follow-up questions.
 * - `FollowUpQuestionSuggestionsInput`: The input type for the `getFollowUpQuestionSuggestions` function.
 * - `FollowUpQuestionSuggestionsOutput`: The output type for the `getFollowUpQuestionSuggestions` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FollowUpQuestionSuggestionsInputSchema = z.object({
  productName: z.string().describe('The name of the product the user is asking about.'),
  productDescription: z.string().describe('The product description.'),
  productQuestion: z.string().describe('The question asked about the product.'),
});
export type FollowUpQuestionSuggestionsInput = z.infer<typeof FollowUpQuestionSuggestionsInputSchema>;

const FollowUpQuestionSuggestionsOutputSchema = z.object({
  suggestedQuestions: z.array(z.string()).describe('An array of suggested follow-up questions related to the product question.'),
});
export type FollowUpQuestionSuggestionsOutput = z.infer<typeof FollowUpQuestionSuggestionsOutputSchema>;

export async function getFollowUpQuestionSuggestions(input: FollowUpQuestionSuggestionsInput): Promise<FollowUpQuestionSuggestionsOutput> {
  // Ensure we have the right product context
  console.log('Follow-up suggestions for:', input.productName, 'with question:', input.productQuestion);
  return followUpQuestionSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'followUpQuestionSuggestionsPrompt',
  input: {schema: FollowUpQuestionSuggestionsInputSchema},
  output: {schema: FollowUpQuestionSuggestionsOutputSchema},
  prompt: `You are an AI assistant designed to suggest follow-up questions for user inquiries about products.

You MUST ONLY suggest questions about the CURRENT product they are viewing:
Product Name: {{{productName}}}
Product Description: {{{productDescription}}}

User's question: {{{productQuestion}}}

IMPORTANT: 
- Generate 3 follow-up questions that are SPECIFICALLY about "{{{productName}}}" 
- DO NOT suggest questions about other products
- Focus on the actual product the user is looking at
- Questions should be related to the product's specific features, uses, or characteristics

For example, if the product is "Basmati Rice Premium Grade", suggest questions about rice cooking, storage, recipes, etc.
If the product is "Running Shoes", suggest questions about running, fit, performance, etc.

Provide exactly 3 relevant follow-up questions about {{{productName}}}.`,
});

const followUpQuestionSuggestionsFlow = ai.defineFlow(
  {
    name: 'followUpQuestionSuggestionsFlow',
    inputSchema: FollowUpQuestionSuggestionsInputSchema,
    outputSchema: FollowUpQuestionSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
