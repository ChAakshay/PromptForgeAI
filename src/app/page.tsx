"use client";

import { useState } from "react";
import Header from "@/components/Header";
import HistorySidebar from "@/components/HistorySidebar";
import PromptOptimizer from "@/components/PromptOptimizer";
import type { HistoryItem } from "@/hooks/useHistory";

export default function Home() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [activeHistoryItem, setActiveHistoryItem] = useState<HistoryItem | null>(null);

  const handleRestoreItem = (item: HistoryItem) => {
    setActiveHistoryItem(item);
    setIsHistoryOpen(false); // Close sidebar after restoring
  };
  
  // Clear the active item after it has been used
  const onActiveHistoryItemUsed = () => {
    setActiveHistoryItem(null);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header onHistoryClick={() => setIsHistoryOpen(true)} />
      <HistorySidebar
        isOpen={isHistoryOpen}
        onOpenChange={setIsHistoryOpen}
        onRestore={handleRestoreItem}
      />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <PromptOptimizer
          activeHistoryItem={activeHistoryItem}
          onActiveHistoryItemUsed={onActiveHistoryItemUsed}
        />
      </main>
    </div>
  );
}
