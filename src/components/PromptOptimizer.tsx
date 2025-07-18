"use client";

import { useState, useTransition } from "react";
import { Copy, Loader2, PlusCircle, Star, ThumbsDown, ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { handleOptimizePrompt } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import type { OptimizePromptOutput } from "@/ai/flows/optimize-prompt";
import type { SummarizeOptimizationsOutput } from "@/ai/flows/summarize-optimizations";
import OptimizationInsights from "./OptimizationInsights";
import OptimizationSummary from "./OptimizationSummary";

type OptimizationResult = OptimizePromptOutput & SummarizeOptimizationsOutput;

export default function PromptOptimizer() {
  const [originalPrompt, setOriginalPrompt] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [goal, setGoal] = useState("");
  const [keyInfo, setKeyInfo] = useState("");

  const [optimizationResult, setOptimizationResult] =
    useState<OptimizationResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const freeOptimizationsLeft = 4; // Placeholder

  const handleSubmit = () => {
    if (!originalPrompt.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a prompt to optimize.",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      setOptimizationResult(null);
      const result = await handleOptimizePrompt({ 
        originalPrompt,
        targetAudience,
        goal,
        keyInfo,
       });
      if (result.error) {
        toast({
          title: "Optimization Failed",
          description: result.error,
          variant: "destructive",
        });
        setOptimizationResult(null);
      } else {
        setOptimizationResult(result);
        toast({
          title: "Prompt Optimized!",
          description: "Your new prompt is ready.",
        });
      }
    });
  };

  const handleCopyToClipboard = () => {
    if (optimizationResult?.optimizedPrompt) {
      navigator.clipboard.writeText(optimizationResult.optimizedPrompt);
      toast({ title: "Copied to clipboard!" });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Your Prompt</CardTitle>
          <CardDescription>
            Enter the AI prompt you want to improve. Add more context for better results.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="e.g., 'Write a story about a dragon.'"
            className="min-h-[150px] text-base resize-y"
            value={originalPrompt}
            onChange={(e) => setOriginalPrompt(e.target.value)}
          />
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button variant="link" className="p-0 h-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add More Context (Optional)
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 pt-4">
               <div className="space-y-2">
                <Label htmlFor="target-audience">Target Audience</Label>
                <Input id="target-audience" placeholder="e.g., Children, Technical experts" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="goal">Goal / Objective</Label>
                <Input id="goal" placeholder="e.g., Generate a marketing slogan, Explain a concept simply" value={goal} onChange={(e) => setGoal(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="key-info">Key Information to Include</Label>
                <Textarea id="key-info" placeholder="e.g., Must mention the product 'Zapify', avoid technical jargon" className="min-h-[100px]" value={keyInfo} onChange={(e) => setKeyInfo(e.target.value)} />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-4">
           <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            size="lg"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Optimizing...
              </>
            ) : (
              "Optimize Prompt"
            )}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Free optimizations left today: {freeOptimizationsLeft} / 5
          </p>
        </CardFooter>
      </Card>

      <Card className="shadow-lg flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Optimized Output</CardTitle>
          <CardDescription>
            The enhanced prompt and analysis from our AI.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4">
          {isPending ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-8 w-3/4 mt-4" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : optimizationResult ? (
            <Tabs defaultValue="prompt" className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="prompt">Optimized Prompt</TabsTrigger>
                <TabsTrigger value="summary">Key Changes</TabsTrigger>
                <TabsTrigger value="analysis">Detailed Analysis</TabsTrigger>
              </TabsList>
              <TabsContent value="prompt" className="flex-1 mt-4">
                 <div className="prose prose-sm max-w-none p-4 rounded-md bg-secondary/50 border relative h-full">
                  <pre className="whitespace-pre-wrap font-body text-sm text-secondary-foreground break-words">
                    {optimizationResult.optimizedPrompt}
                  </pre>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-7 w-7"
                    onClick={handleCopyToClipboard}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="summary" className="flex-1 mt-4">
                <OptimizationSummary summary={optimizationResult.summary} />
              </TabsContent>
              <TabsContent value="analysis" className="flex-1 mt-4">
                <OptimizationInsights
                  details={optimizationResult.optimizationDetails}
                />
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">
                Your optimized prompt will appear here.
              </p>
            </div>
          )}
        </CardContent>
        {optimizationResult && !isPending && (
          <CardFooter className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
               <h4 className="text-sm font-medium text-foreground">Helpful?</h4>
               <Button variant="outline" size="sm" disabled>
                  <ThumbsUp className="mr-2 h-4 w-4" /> Yes
                </Button>
                <Button variant="outline" size="sm" disabled>
                  <ThumbsDown className="mr-2 h-4 w-4" /> No
                </Button>
            </div>
             <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-foreground">Rate it:</p>
              <div className="flex text-gray-300">
                <Star className="h-5 w-5 hover:text-yellow-400 transition-colors cursor-pointer" />
                <Star className="h-5 w-5 hover:text-yellow-400 transition-colors cursor-pointer" />
                <Star className="h-5 w-5 hover:text-yellow-400 transition-colors cursor-pointer" />
                <Star className="h-5 w-5 hover:text-yellow-400 transition-colors cursor-pointer" />
                <Star className="h-5 w-5 hover:text-yellow-400 transition-colors cursor-pointer" />
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
