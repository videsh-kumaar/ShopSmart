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
  productQuestion: z.string().describe('The question asked about the product.'),
});
export type FollowUpQuestionSuggestionsInput = z.infer<typeof FollowUpQuestionSuggestionsInputSchema>;

const FollowUpQuestionSuggestionsOutputSchema = z.object({
  suggestedQuestions: z.array(z.string()).describe('An array of suggested follow-up questions related to the product question.'),
});
export type FollowUpQuestionSuggestionsOutput = z.infer<typeof FollowUpQuestionSuggestionsOutputSchema>;

export async function getFollowUpQuestionSuggestions(input: FollowUpQuestionSuggestionsInput): Promise<FollowUpQuestionSuggestionsOutput> {
  return followUpQuestionSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'followUpQuestionSuggestionsPrompt',
  input: {schema: FollowUpQuestionSuggestionsInputSchema},
  output: {schema: FollowUpQuestionSuggestionsOutputSchema},
  prompt: `You are an AI assistant designed to suggest follow-up questions for user inquiries about products.

  Given the following question about a product:
  {{productQuestion}}

  Suggest three follow-up questions that the user might find helpful to further explore the product. The questions should be concise and directly related to the original question.

  Format your response as a JSON array of strings, where each string is a follow-up question.
  `,
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
