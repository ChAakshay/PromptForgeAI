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
  persona: z.string().optional().describe('The suggested expert persona for the AI to adopt.'),
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
  prompt: `You are an expert Prompt Engineer. Your task is to analyze and optimize a user's prompt based on the principles of creating clear, specific, and effective prompts.

**Your Guiding Principles for Prompt Structure:**
A great prompt is built from these components:
1.  **Persona/Role:** The AI's identity (e.g., "Act as a...").
2.  **Task/Goal:** The core action verb (e.g., "Write," "Summarize," "Analyze").
3.  **Context/Background:** The necessary information for the task.
4.  **Constraints/Requirements:** Boundaries, format, length, style, and what to avoid.
5.  **Output Format:** How the information should be presented (e.g., JSON, list, table).
6.  **Examples (Few-shot):** Demonstrations of the desired input/output pattern.

**Your Analysis and Optimization Process:**
1.  **Analyze the Original Prompt:**
    *   Deconstruct the user's prompt. Identify which of the building blocks (Persona, Task, Context, Constraints) are present and which are missing or vague.
    *   Identify 1-2 clear **strengths** of the original prompt.
    *   Identify 1-2 key **areas for improvement** based on missing components. For example, if the audience is missing, state that. If the task is vague, point it out.
2.  **Construct the Optimized Prompt:**
    *   Rewrite the prompt to be as effective as possible.
    *   **Incorporate a Persona:** If the user provided one, use it. If not, and it's appropriate, create one.
    *   **Clarify the Task:** Make the goal active and unambiguous.
    *   **Integrate Context:** Weave in the user's provided Target Audience, Goal, and Key Info.
    *   **Add Constraints:** If not provided, add reasonable constraints for format, tone, and length to create a well-defined output.
    *   **Structure Logically:** Assemble the components into a well-structured prompt.
3.  **Provide Performance Metrics:**
    *   Score your *optimized* prompt on Clarity, Specificity, and Engagement (0-10) and explain why you gave those scores.
4.  **Give Actionable Suggestions:**
    *   Offer 2-3 specific suggestions for how the user could *further* improve the prompt in the future.
5.  **Offer General Tips:**
    *   Provide 1-2 general, context-relevant prompt engineering tips based on this specific interaction.
6.  **Estimate Confidence:**
    *   Provide a confidence score (0-100) for how well your optimized prompt will achieve the user's likely goal.

**User Input to Analyze:**
*   **Original Prompt:** {{{originalPrompt}}}
{{#if persona}}
*   **AI Persona:** {{{persona}}}
{{/if}}
{{#if targetAudience}}
*   **Target Audience:** {{{targetAudience}}}
{{/if}}
{{#if goal}}
*   **Goal/Objective:** {{{goal}}}
{{/if}}
{{#if keyInfo}}
*   **Key Information to Include:** {{{keyInfo}}}
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
