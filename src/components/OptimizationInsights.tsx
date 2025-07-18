import { CheckCircle, Lightbulb } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { OptimizePromptOutput } from "@/ai/flows/optimize-prompt";

type OptimizationInsightsProps = {
  details: OptimizePromptOutput["optimizationDetails"];
};

type MetricCardProps = {
  title: string;
  score: number;
  explanation: string;
};

function MetricCard({ title, score, explanation }: MetricCardProps) {
  return (
    <Card className="bg-secondary/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center justify-between">
          <span>{title}</span>
          <span className="text-lg font-bold text-primary">{score}/10</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={score * 10} className="h-2 mb-2" />
        <p className="text-xs text-muted-foreground">{explanation}</p>
      </CardContent>
    </Card>
  );
}

export default function OptimizationInsights({
  details,
}: OptimizationInsightsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3 text-lg">Performance Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MetricCard
            title="Clarity"
            score={details.clarity.score}
            explanation={details.clarity.explanation}
          />
          <MetricCard
            title="Specificity"
            score={details.specificity.score}
            explanation={details.specificity.explanation}
          />
          <MetricCard
            title="Engagement"
            score={details.engagement.score}
            explanation={details.engagement.explanation}
          />
        </div>
      </div>

      {details.suggestions && details.suggestions.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3 text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-accent" />
            Suggestions for Improvement
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {details.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
