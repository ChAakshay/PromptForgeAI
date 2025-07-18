"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "./ui/badge";

export default function ParameterSimulator() {
  const [temperature, setTemperature] = useState([0.7]);
  
  const getTemperatureInfo = (value: number) => {
    if (value <= 0.3) {
      return {
        label: "Focused & Predictable",
        description: "Good for factual answers, summaries, and consistent outputs. The AI will stick closely to what it knows.",
        badgeVariant: "default" as const
      };
    }
    if (value <= 0.7) {
      return {
        label: "Balanced & Creative",
        description: "A good middle-ground for most tasks. The AI will be creative but won't stray too far from the prompt's intent.",
        badgeVariant: "secondary" as const
      };
    }
    return {
      label: "Experimental & Surprising",
      description: "Ideal for brainstorming, story writing, and generating novel ideas. The AI may produce unexpected or less reliable results.",
      badgeVariant: "destructive" as const
    };
  };

  const tempInfo = getTemperatureInfo(temperature[0]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-accent" />
          Parameter Simulator
        </CardTitle>
        <CardDescription>
          See how changing the "Temperature" parameter can affect the AI's output.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="font-medium">
            Temperature: <span className="font-mono text-primary">{temperature[0].toFixed(1)}</span>
          </p>
          <Badge variant={tempInfo.badgeVariant}>
            {tempInfo.label}
          </Badge>
        </div>
        <Slider
          defaultValue={temperature}
          onValueChange={setTemperature}
          max={1}
          step={0.1}
          className="w-full"
        />
        <p className="text-sm text-muted-foreground p-3 bg-secondary/50 rounded-md border">
          {tempInfo.description}
        </p>
      </CardContent>
    </Card>
  );
}
