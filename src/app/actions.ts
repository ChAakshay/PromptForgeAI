"use server";

import { optimizePrompt } from "@/ai/flows/optimize-prompt";
import type { OptimizePromptOutput } from "@/ai/flows/optimize-prompt";

type ActionResult = (OptimizePromptOutput & { error?: undefined }) | { error: string };

export async function handleOptimizePrompt(originalPrompt: string): Promise<ActionResult> {
  try {
    const result = await optimizePrompt({ originalPrompt });
    if (!result || !result.optimizedPrompt) {
        throw new Error("AI failed to return an optimized prompt.");
    }
    return result;
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return {
      error: `There was a problem optimizing your prompt. Details: ${errorMessage}`,
    };
  }
}
