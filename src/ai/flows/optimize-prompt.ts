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
    persona_added: z.boolean().optional().describe('Indicates if a persona was added to the prompt.'),
    format_specified: z.string().optional().describe('The format specified in the prompt, if any (e.g., list, paragraph).'),
    clarity_improvements: z.string().optional().describe('Details on how the clarity of the prompt was improved.'),
    specificity_enhancements: z.string().optional().describe('Details on how the specificity of the prompt was enhanced.'),
  }).describe('A summary of the changes made to the prompt during optimization.')
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

  Please analyze the prompt and refine it to get better results from other AI models. Return a JSON object containing the optimizedPrompt and optimizationDetails.

  Original Prompt: {{{originalPrompt}}}

  Specifically, the JSON object should contain:
  - optimizedPrompt (string): The refined prompt.
  - optimizationDetails (JSON object): A summary of the changes made, including:
    - persona_added (boolean, optional): Indicates if a persona was added to the prompt.
    - format_specified (string, optional): The format specified in the prompt (e.g., list, paragraph).
    - clarity_improvements (string, optional): Details on how the clarity of the prompt was improved.
    - specificity_enhancements (string, optional): Details on how the specificity of the prompt was enhanced.
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
