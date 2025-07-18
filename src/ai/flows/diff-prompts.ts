
'use server';
/**
 * @fileOverview Creates a structured diff between two prompts.
 *
 * - diffPrompts - A function that returns a structured diff array.
 * - DiffInput - The input type for the diffPrompts function.
 * - DiffOutput - The return type for the diffPrompts function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DiffInputSchema = z.object({
  originalPrompt: z.string().describe('The original user prompt.'),
  optimizedPrompt: z.string().describe('The new, optimized prompt.'),
});
export type DiffInput = z.infer<typeof DiffInputSchema>;

const DiffOutputSchema = z.object({
  diff: z.array(
    z.object({
      type: z.enum(['addition', 'deletion', 'unchanged']),
      value: z.string(),
    })
  ).describe('An array of objects representing the diff. "addition" for new text, "deletion" for removed text, "unchanged" for text that remains the same.'),
});
export type DiffOutput = z.infer<typeof DiffOutputSchema>;


export async function diffPrompts(input: DiffInput): Promise<DiffOutput> {
  return diffPromptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'diffPromptsPrompt',
  input: { schema: DiffInputSchema },
  output: { schema: DiffOutputSchema },
  prompt: `You are a diffing tool. Your task is to compare two versions of a text and provide a structured diff.
You must analyze the "Original Prompt" and the "Optimized Prompt" and identify all differences.

The entire original text must be accounted for in the output, split into 'unchanged' and 'deletion' parts.
The entire optimized text must be accounted for in the output, split into 'unchanged' and 'addition' parts.

The output must be an array of objects, where each object has a 'type' ('addition', 'deletion', 'unchanged') and a 'value' (the text content).

- For text present in both prompts, use 'unchanged'.
- For text present only in the original prompt, use 'deletion'.
- For text present only in the optimized prompt, use 'addition'.

Combine consecutive words of the same type into a single object. Preserve original spacing and line breaks.

**Original Prompt:**
\`\`\`
{{{originalPrompt}}}
\`\`\`

**Optimized Prompt:**
\`\`\`
{{{optimizedPrompt}}}
\`\`\`

Produce a JSON object that strictly adheres to the provided output schema.
`,
});

const diffPromptsFlow = ai.defineFlow(
  {
    name: 'diffPromptsFlow',
    inputSchema: DiffInputSchema,
    outputSchema: DiffOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
