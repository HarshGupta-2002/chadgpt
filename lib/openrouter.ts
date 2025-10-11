import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText, type CoreMessage } from 'ai';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!
});

export async function openRouter(messages: CoreMessage[]) {
  const result = streamText({
    model: openrouter.chat('openai/gpt-5-chat'),
    messages,
    maxOutputTokens: 2000,
    temperature: 0.7
  })

  return result;
}