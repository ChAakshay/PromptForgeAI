import { History, RotateCcw, Trash2 } from "lucide-react";
import { useHistory, type HistoryItem } from "@/hooks/useHistory";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";

type HistorySidebarProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onRestore: (item: HistoryItem) => void;
};

export default function HistorySidebar({
  isOpen,
  onOpenChange,
  onRestore,
}: HistorySidebarProps) {
  const { history, clearHistory } = useHistory();

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:w-[540px] flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Optimization History
          </SheetTitle>
          <SheetDescription>
            Here are your recent prompt optimizations. Click one to restore it.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto">
          {history.length > 0 ? (
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4">
                {history.map((item) => (
                  <div key={item.id} className="border p-4 rounded-lg bg-secondary/50">
                    <p className="text-sm font-medium truncate">
                      {item.input.originalPrompt}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                        <Badge variant={item.result.optimizationDetails.confidenceScore > 75 ? "default" : "secondary"}>
                            Confidence: {item.result.optimizationDetails.confidenceScore}%
                        </Badge>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRestore(item)}
                        >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Restore
                        </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-muted-foreground">
                Your history is empty.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Optimized prompts will appear here.
              </p>
            </div>
          )}
        </div>
        {history.length > 0 && (
          <div className="border-t pt-4">
            <Button
              variant="destructive"
              className="w-full"
              onClick={clearHistory}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All History
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
