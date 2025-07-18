import { config } from 'dotenv';
config();

import '@/ai/flows/optimize-prompt.ts';
import '@/ai/flows/summarize-optimizations.ts';
import '@/ai/flows/suggest-persona.ts';
import '@/ai/flows/diff-prompts.ts';
