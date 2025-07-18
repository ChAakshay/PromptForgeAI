import { cn } from "@/lib/utils";
import type { DiffOutput } from "@/ai/flows/diff-prompts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

type PromptDiffViewerProps = {
  diff: DiffOutput["diff"];
};

export default function PromptDiffViewer({ diff }: PromptDiffViewerProps) {
  return (
    <Card className="h-full bg-secondary/30">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex justify-between items-center">
          <span>Comparison</span>
          <div className="flex gap-2 text-xs font-normal">
             <Badge variant="outline" className="bg-red-100/50 text-red-700 border-red-200">Removed</Badge>
             <Badge variant="outline" className="bg-green-100/50 text-green-800 border-green-200">Added</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4 rounded-md bg-background/50 border whitespace-pre-wrap text-sm">
          {diff.map((part, index) => (
            <span
              key={index}
              className={cn({
                "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 line-through decoration-red-400": part.type === "deletion",
                "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400": part.type === "addition",
                "text-muted-foreground": part.type === "unchanged",
              })}
            >
              {part.value}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
