"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { OptimizePromptOutput } from "@/ai/flows/optimize-prompt";

type PerformanceChartProps = {
  metrics: OptimizePromptOutput["optimizationDetails"]["performanceMetrics"];
};

export function PerformanceChart({ metrics }: PerformanceChartProps) {
  const chartData = [
    {
      metric: "Clarity",
      score: metrics.clarity.score,
      fullMark: 10,
    },
    {
      metric: "Specificity",
      score: metrics.specificity.score,
      fullMark: 10,
    },
    {
      metric: "Engagement",
      score: metrics.engagement.score,
      fullMark: 10,
    },
  ];

  const chartConfig = {
    score: {
      label: "Score",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <Card>
      <CardHeader className="items-center pb-2">
        <CardTitle>Prompt Quality</CardTitle>
        <CardDescription>
          A visual breakdown of the optimized prompt's effectiveness.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              bottom: 10,
              left: 10,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="metric" />
            <PolarRadiusAxis angle={30} domain={[0, 10]} tickCount={6} />
            <PolarGrid />
            <Radar
              dataKey="score"
              fill="var(--color-score)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
