import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import type { OptimizePromptOutput } from "@/ai/flows/optimize-prompt";

type OptimizationInsightsProps = {
  details: OptimizePromptOutput["optimizationDetails"];
};

export default function OptimizationInsights({
  details,
}: OptimizationInsightsProps) {
  const insights = [
    {
      label: "Persona Added",
      value: details.persona_added ? "Yes" : "No",
      show: details.persona_added !== undefined,
    },
    {
      label: "Format Specified",
      value: details.format_specified,
      show: !!details.format_specified,
    },
    {
      label: "Clarity Improvements",
      value: details.clarity_improvements,
      show: !!details.clarity_improvements,
    },
    {
      label: "Specificity Enhancements",
      value: details.specificity_enhancements,
      show: !!details.specificity_enhancements,
    },
  ].filter((insight) => insight.show);

  if (insights.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="font-semibold mb-2">Optimization Insights</h3>
      <Accordion type="single" collapsible defaultValue="item-0">
        {insights.map((insight, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-sm">
              {insight.label}
              {insight.label === "Persona Added" && (
                <Badge variant="secondary" className="ml-2">
                  {insight.value}
                </Badge>
              )}
               {insight.label === "Format Specified" && (
                <Badge variant="secondary" className="ml-2">
                  {insight.value}
                </Badge>
              )}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              {insight.value}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
