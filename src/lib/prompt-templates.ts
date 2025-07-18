import type { OptimizePromptInput } from "@/ai/flows/optimize-prompt";

export type PromptTemplate = {
    id: string;
    title: string;
    description: string;
    inputs: OptimizePromptInput;
};

export const promptTemplates: PromptTemplate[] = [
    {
        id: 'blog-post-idea',
        title: 'Brainstorm Blog Post Ideas',
        description: 'Generate a list of engaging blog post ideas on a specific topic.',
        inputs: {
            originalPrompt: 'Generate a list of 5 blog post titles about [topic].',
            persona: 'You are an expert content strategist and SEO specialist.',
            goal: 'Create click-worthy titles that are also SEO-friendly for a general audience.',
            keyInfo: 'The main topic is [topic]. The tone should be informative yet approachable.',
        },
    },
    {
        id: 'social-media-post',
        title: 'Write a Social Media Post',
        description: 'Craft a compelling social media post for a product or announcement.',
        inputs: {
            originalPrompt: 'Write a short and engaging Twitter post about our new product, [Product Name].',
            persona: 'You are a witty and creative social media manager.',
            goal: 'Generate excitement and drive traffic to our website.',
            targetAudience: 'Tech-savvy millennials interested in productivity tools.',
            keyInfo: 'Key features are [Feature 1] and [Feature 2]. Include a link to [website link] and relevant hashtags.',
        },
    },
    {
        id: 'email-copy',
        title: 'Draft Professional Email',
        description: 'Write a professional email for a specific purpose, like a follow-up or a request.',
        inputs: {
            originalPrompt: 'Draft a follow-up email after a business meeting with [Person\'s Name].',
            persona: 'You are a professional business communicator.',
            goal: 'To thank them for their time, summarize key discussion points, and outline next steps.',
            keyInfo: 'The meeting was about [topic]. Key takeaways were [Takeaway 1] and [Takeaway 2]. The proposed next step is [Next Step].',
        },
    },
    {
        id: 'summarize-text',
        title: 'Summarize Complex Text',
        description: 'Condense a long article or document into key bullet points.',
        inputs: {
            originalPrompt: 'Summarize the following article into 3 concise bullet points:\n\n[Paste article text here]',
            persona: 'You are an expert analyst with a talent for distillation.',
            goal: 'Extract the most critical information and present it clearly and concisely.',
            keyInfo: 'Focus on the main arguments and conclusions. Ignore minor details.',
        },
    },
];
