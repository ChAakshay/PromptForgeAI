"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";
import { RadialBar, RadialBarChart, PolarGrid, PolarAngleAxis } from "recharts";

type MetricCardProps = {
  icon: React.ReactNode;
  title: string;
  score: number;
  explanation: string;
};

export default function MetricCard({ icon, title, score, explanation }: MetricCardProps) {
    const percentage = score * 10;
    
    let colorClass = "text-green-500";
    if (score < 4) {
        colorClass = "text-red-500";
    } else if (score < 8) {
        colorClass = "text-yellow-500";
    }

    const chartData = [
        {
          name: title,
          value: percentage,
          fill: `var(--color-${title.toLowerCase()})`,
        },
      ];
    
      const colorStyle = {
        '--color-clarity': 'hsl(var(--primary))',
        '--color-specificity': 'hsl(var(--accent))',
        '--color-engagement': 'hsl(262 80% 58%)',
      } as React.CSSProperties;


  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="flex flex-col items-center justify-center p-4 text-center h-full" style={colorStyle}>
             <div className="relative h-28 w-28">
                <RadialBarChart
                    width={112}
                    height={112}
                    cx="50%"
                    cy="50%"
                    innerRadius="80%"
                    outerRadius="100%"
                    barSize={8}
                    data={chartData}
                    startAngle={90}
                    endAngle={-270}
                >
                    <PolarAngleAxis
                        type="number"
                        domain={[0, 100]}
                        angleAxisId={0}
                        tick={false}
                    />
                    <RadialBar
                        background
                        dataKey="value"
                        cornerRadius={10}
                        className="fill-primary"
                    />
                </RadialBarChart>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-muted-foreground">{icon}</div>
                </div>
             </div>
            <CardHeader className="p-2 pb-0">
              <CardTitle className="text-base font-semibold">{title}</CardTitle>
            </CardHeader>
            <CardContent className="p-2 pt-1">
                <p className="text-2xl font-bold">{score}/10</p>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="top" align="center">
          <p className="max-w-xs">{explanation}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
