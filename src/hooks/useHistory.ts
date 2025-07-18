"use client";

import { useState, useEffect, useCallback } from "react";
import type { OptimizePromptInput } from "@/ai/flows/optimize-prompt";
import type { SummarizeOptimizationsOutput } from "@/ai/flows/summarize-optimizations";
import type { OptimizePromptOutput } from "@/ai/flows/optimize-prompt";

const HISTORY_KEY = "promptforge_history";
const MAX_HISTORY_ITEMS = 50;

type OptimizationResult = OptimizePromptOutput & SummarizeOptimizationsOutput;

export type HistoryItem = {
  id: string;
  timestamp: number;
  input: OptimizePromptInput;
  result: OptimizationResult;
};

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load history from localStorage:", error);
      setHistory([]);
    }
  }, []);

  const saveHistory = useCallback((newHistory: HistoryItem[]) => {
    try {
      const slicedHistory = newHistory.slice(0, MAX_HISTORY_ITEMS);
      setHistory(slicedHistory);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(slicedHistory));
    } catch (error) {
      console.error("Failed to save history to localStorage:", error);
    }
  }, []);

  const addHistory = useCallback(
    (item: Omit<HistoryItem, "id" | "timestamp">) => {
      const newItem: HistoryItem = {
        ...item,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
      };
      
      const updatedHistory = [newItem, ...history];
      saveHistory(updatedHistory);
    },
    [history, saveHistory]
  );

  const clearHistory = useCallback(() => {
    saveHistory([]);
  }, [saveHistory]);

  return { history, addHistory, clearHistory };
}
