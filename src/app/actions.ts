"use server";

import { optimizePrompt } from "@/ai/flows/optimize-prompt";
import type { OptimizePromptOutput } from "@/ai/flows/optimize-prompt";
import { summarizeOptimizations } from "@/ai/flows/summarize-optimizations";
import type { SummarizeOptimizationsOutput } from "@/ai/flows/summarize-optimizations";

type ActionResult = (OptimizePromptOutput & SummarizeOptimizationsOutput & { error?: undefined }) | { error: string };

export async function handleOptimizePrompt(originalPrompt: string): Promise<ActionResult> {
  try {
    const optimizationResult = await optimizePrompt({ originalPrompt });
    if (!optimizationResult || !optimizationResult.optimizedPrompt) {
        throw new Error("AI failed to return an optimized prompt.");
    }
    
    const summaryResult = await summarizeOptimizations({ 
        originalPrompt, 
        optimizedPrompt: optimizationResult.optimizedPrompt 
    });

    if(!summaryResult || !summaryResult.summary) {
        throw new Error("AI failed to return a summary.");
    }

    return { ...optimizationResult, ...summaryResult };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return {
      error: `There was a problem optimizing your prompt. Details: ${errorMessage}`,
    };
  }
}
