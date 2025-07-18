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
  targetAudience: z.string().optional().describe('The intended audience for the AI-generated response.'),
  goal: z.string().optional().describe('The primary objective or desired outcome of the prompt.'),
  keyInfo: z.string().optional().describe('Any key information, keywords, or constraints that must be included or considered.'),
});
export type OptimizePromptInput = z.infer<typeof OptimizePromptInputSchema>;

const OptimizePromptOutputSchema = z.object({
  optimizedPrompt: z
    .string()
    .describe('The refined, optimized prompt.'),
  optimizationDetails: z.object({
    confidenceScore: z.number().min(0).max(100).describe("A percentage score indicating the AI's confidence in the quality of the optimized prompt."),
    originalPromptAnalysis: z.object({
        strengths: z.array(z.string()).describe("A list of what was good about the user's original prompt."),
        areasForImprovement: z.array(z.string()).describe("A list of areas where the original prompt could be improved."),
    }).describe("An analysis of the user's original prompt."),
    performanceMetrics: z.object({
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
    }).describe("Metrics for the optimized prompt."),
    suggestions: z.array(z.string()).describe('A list of actionable suggestions for further improvement.'),
    generalTips: z.array(z.string()).describe("A list of 1-2 relevant, general prompt engineering principles based on this interaction.")
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
  prompt: `You are an expert Prompt Engineer. Your task is to analyze and optimize a user's prompt.
You must return a JSON object containing the optimized prompt and a detailed analysis.

**Analysis Steps:**
1.  **Optimize the Prompt:** Rewrite the original prompt to be clearer, more specific, and more effective based on the user's provided context (audience, goal, key info).
2.  **Analyze the Original Prompt:**
    *   Identify 1-2 strengths of the user's original prompt.
    *   Identify 1-2 key areas for improvement (e.g., missing information, vagueness).
3.  **Provide Performance Metrics for the *Optimized* Prompt:**
    *   Score the optimized prompt on Clarity, Specificity, and Engagement (0-10).
    *   Provide a brief explanation for each score.
4.  **Give Suggestions:** Offer a list of 2-3 actionable suggestions for how the user could *further* improve the prompt.
5.  **Estimate Confidence:** Provide a confidence score (0-100) for how well your optimized prompt meets the user's likely goals.
6.  **Offer General Tips:** Provide 1-2 general, context-relevant prompt engineering tips that the user can apply in the future.

**User Input:**
Original Prompt: {{{originalPrompt}}}

{{#if targetAudience}}
**Target Audience:** {{{targetAudience}}}
{{/if}}

{{#if goal}}
**Goal/Objective:** {{{goal}}}
{{/if}}

{{#if keyInfo}}
**Key Information to Include:** {{{keyInfo}}}
{{/if}}

Return a JSON object that strictly follows the output schema.
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
