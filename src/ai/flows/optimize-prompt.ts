'use server';

/**
 * @fileOverview Optimizes a given prompt for clarity, specificity, and effectiveness using AI.
 *
 * - optimizePrompt - A function that takes a general prompt as input and returns an optimized prompt.
 * - OptimizePromptInput - The input type for the optimizePrompt function.
 * - OptimizePromptOutput - The return type for the optimizePrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizePromptInputSchema = z.object({
  originalPrompt: z
    .string()
    .describe('The original prompt to be optimized.'),
});
export type OptimizePromptInput = z.infer<typeof OptimizePromptInputSchema>;

const OptimizePromptOutputSchema = z.object({
  optimizedPrompt: z
    .string()
    .describe('The refined, optimized prompt.'),
  optimizationDetails: z.object({
    clarity: z.object({
      score: z.number().min(0).max(10).describe('A score from 0-10 for prompt clarity.'),
      explanation: z.string().describe('Explanation for the clarity score.'),
    }),
    specificity: z.object({
      score: z.number().min(0).max(10).describe('A score from 0-10 for prompt specificity.'),
      explanation: z.string().describe('Explanation for the specificity score.'),
    }),
    engagement: z.object({
      score: z.number().min(0).max(10).describe('A score from 0-10 for how engaging the prompt is likely to be for an AI.'),
      explanation: z.string().describe('Explanation for the engagement score.'),
    }),
    suggestions: z.array(z.string()).describe('A list of actionable suggestions for further improvement.'),
  }).describe('A detailed analysis of the prompt optimization.')
});
export type OptimizePromptOutput = z.infer<typeof OptimizePromptOutputSchema>;

export async function optimizePrompt(input: OptimizePromptInput): Promise<OptimizePromptOutput> {
  return optimizePromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizePromptPrompt',
  input: {schema: OptimizePromptInputSchema},
  output: {schema: OptimizePromptOutputSchema},
  prompt: `You are an expert Prompt Engineer. Your task is to optimize a given prompt for clarity, specificity, and effectiveness.
Then, you must provide a detailed analysis of your optimization.

Analyze the original prompt and the optimized version to generate scores and explanations for clarity, specificity, and engagement.
The scores should be on a scale of 0 to 10, where 10 is best, and reflect the quality of the *optimized* prompt.
Also, provide a list of actionable suggestions that the user could apply to make the prompt even better.

Original Prompt: {{{originalPrompt}}}

Return a JSON object with the optimized prompt and the detailed analysis.
`,
});

const optimizePromptFlow = ai.defineFlow(
  {
    name: 'optimizePromptFlow',
    inputSchema: OptimizePromptInputSchema,
    outputSchema: OptimizePromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
