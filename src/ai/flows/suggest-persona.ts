'use server';
/**
 * @fileOverview Suggests an expert persona for an AI based on a user's prompt.
 *
 * - suggestPersona - A function that takes a prompt and returns a suggested persona.
 * - SuggestPersonaInput - The input type for the suggestPersona function.
 * - SuggestPersonaOutput - The return type for the suggestPersona function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestPersonaInputSchema = z.object({
  originalPrompt: z.string().describe('The user prompt to be analyzed.'),
});
export type SuggestPersonaInput = z.infer<typeof SuggestPersonaInputSchema>;

const SuggestPersonaOutputSchema = z.object({
  persona: z
    .string()
    .describe(
      'A concise expert persona for the AI to adopt, starting with "You are...".'
    ),
});
export type SuggestPersonaOutput = z.infer<typeof SuggestPersonaOutputSchema>;

export async function suggestPersona(
  input: SuggestPersonaInput
): Promise<SuggestPersonaOutput> {
  return suggestPersonaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPersonaPrompt',
  input: { schema: SuggestPersonaInputSchema },
  output: { schema: SuggestPersonaOutputSchema },
  prompt: `Based on the following user prompt, suggest a single, concise expert persona for an AI to adopt to generate the best possible response.

The persona should be specific and start with "You are...". For example: "You are a witty marketing expert specializing in social media campaigns" or "You are a senior software engineer with expertise in Python and cloud infrastructure."

User Prompt:
{{{originalPrompt}}}
`,
});

const suggestPersonaFlow = ai.defineFlow(
  {
    name: 'suggestPersonaFlow',
    inputSchema: SuggestPersonaInputSchema,
    outputSchema: SuggestPersonaOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
