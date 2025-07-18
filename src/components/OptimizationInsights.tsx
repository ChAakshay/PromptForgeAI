import { CheckCircle, Lightbulb, TrendingUp, BarChart, Check, AlertTriangle } from "lucide-react";
import { PerformanceChart } from "@/components/PerformanceChart";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { OptimizePromptOutput } from "@/ai/flows/optimize-prompt";
import { Badge } from "./ui/badge";

type OptimizationInsightsProps = {
  details: OptimizePromptOutput["optimizationDetails"];
};

export default function OptimizationInsights({
  details,
}: OptimizationInsightsProps) {
  return (
    <div className="space-y-6">
       {/* Visual Metrics */}
      <div>
        <h3 className="font-semibold mb-3 text-lg flex items-center gap-2">
            <BarChart className="h-5 w-5 text-primary" />
            Visual Metrics
        </h3>
        <PerformanceChart metrics={details.performanceMetrics} />
      </div>
      
       {/* Original Prompt Analysis */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-green-800 dark:text-green-300">
                    <Check className="h-5 w-5" />
                    Original Prompt: Strengths
                </CardTitle>
            </CardHeader>
            <CardContent>
                 <ul className="space-y-2 text-sm text-green-700 dark:text-green-400">
                    {details.originalPromptAnalysis.strengths.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                 </ul>
            </CardContent>
        </Card>
         <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-yellow-800 dark:text-yellow-300">
                    <AlertTriangle className="h-5 w-5" />
                    Original Prompt: Improvements
                </CardTitle>
            </CardHeader>
            <CardContent>
                 <ul className="space-y-2 text-sm text-yellow-700 dark:text-yellow-400">
                    {details.originalPromptAnalysis.areasForImprovement.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                 </ul>
            </CardContent>
        </Card>
       </div>

      {/* Suggestions */}
      {details.suggestions && details.suggestions.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3 text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Actionable Suggestions
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
      
       {/* General Tips */}
      {details.generalTips && details.generalTips.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3 text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Prompting Tips
          </h3>
          <div className="space-y-2">
            {details.generalTips.map((tip, index) => (
              <p key={index} className="text-sm p-3 bg-secondary/50 rounded-md border text-secondary-foreground">{tip}</p>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end items-center gap-2 text-sm text-muted-foreground">
        <span>AI Confidence:</span>
        <Badge variant={details.confidenceScore > 75 ? "default" : "secondary"}>
            {details.confidenceScore}%
        </Badge>
      </div>

    </div>
  );
}
