"use server";

import { optimizePrompt } from "@/ai/flows/optimize-prompt";
import type { OptimizePromptInput, OptimizePromptOutput } from "@/ai/flows/optimize-prompt";
import { summarizeOptimizations } from "@/ai/flows/summarize-optimizations";
import type { SummarizeOptimizationsOutput } from "@/ai/flows/summarize-optimizations";
import { suggestPersona } from "@/ai/flows/suggest-persona";
import type { SuggestPersonaOutput } from "@/ai/flows/suggest-persona";

type OptimizeActionResult = (OptimizePromptOutput & SummarizeOptimizationsOutput & { error?: undefined }) | { error: string };

export async function handleOptimizePrompt(input: OptimizePromptInput): Promise<OptimizeActionResult> {
  try {
    const optimizationResult = await optimizePrompt(input);
    if (!optimizationResult || !optimizationResult.optimizedPrompt) {
        throw new Error("AI failed to return an optimized prompt.");
    }
    
    const summaryResult = await summarizeOptimizations({ 
        originalPrompt: input.originalPrompt, 
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


type SuggestPersonaResult = (SuggestPersonaOutput & { error?: undefined }) | { error:string };

export async function handleSuggestPersona(prompt: string): Promise<SuggestPersonaResult> {
    if (!prompt.trim()) {
        return { error: "Please enter a prompt to suggest a persona." };
    }
    try {
        const result = await suggestPersona({ originalPrompt: prompt });
        if (!result || !result.persona) {
            throw new Error("AI failed to suggest a persona.");
        }
        return result;
    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        return {
            error: `There was a problem suggesting a persona. Details: ${errorMessage}`,
        };
    }
}
