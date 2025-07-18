import { Layers } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type OptimizationSummaryProps = {
  summary: string;
};

export default function OptimizationSummary({ summary }: OptimizationSummaryProps) {
  return (
    <Card className="h-full bg-secondary/30">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <Layers className="h-5 w-5 text-primary" />
                Summary of Changes
            </CardTitle>
        </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {summary}
        </p>
      </CardContent>
    </Card>
  );
}
