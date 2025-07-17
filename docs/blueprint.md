# **App Name**: PromptForge AI

## Core Features:

- AI Prompt Optimization: Analyzes the user's original prompt using the Gemini 2.0 Flash model via a Firebase Cloud Function. The LLM acts as a tool to help formulate a better prompt for the user.
- Prompt Input: Provides a user interface with a text area for users to input a prompt.
- Optimized Prompt Display: Displays the optimized prompt in a read-only text area, formatted with Markdown.
- Copy to Clipboard: Allows users to copy the optimized prompt to the clipboard.
- Feedback Mechanism: Allows users to provide feedback on the optimized prompt, such as a star rating.
- Prompt History: Displays a history of prompt optimizations for the user.
- User Authentication & Freemium Model: Allows users to create an account (email/password) or to proceed anonymously to make use of the free tier. Rate limits optimizations based on a freemium/premium model.

## Style Guidelines:

- Primary color: Deep indigo (#3F51B5) for a sense of intelligence and focus, evoking a creative environment.
- Background color: Light grayish-blue (#ECEFF1) to provide a neutral backdrop that doesn't distract from the text.
- Accent color: Bright orange (#FF9800) to highlight important actions, drawing user attention to calls to action like the "Optimize Prompt" button.
- Body text font: 'Inter', a sans-serif font providing a modern, machined look that is suitable for the app's longer lines of text. Headline Font: 'Space Grotesk', providing a contrasting techy feel.
- Utilize minimalist icons to represent different actions or sections, ensuring they are easily understandable and align with the app's aesthetic.
- Employ a clean, well-spaced layout using Tailwind CSS, incorporating rounded corners for a modern look and ensuring full responsiveness across devices.
- Add subtle animations for loading states and transitions to enhance the user experience without being distracting.