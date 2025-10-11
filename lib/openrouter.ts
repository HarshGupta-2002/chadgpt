import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText, type CoreMessage } from 'ai';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!
});

export async function openRouter(messages: CoreMessage[]) {
  const result = streamText({
    model: openrouter.chat('openai/gpt-5-chat:online'), //online model for real-time data, else use 'openai/gpt-5-chat'
    messages,
    maxOutputTokens: 100, //for dev testing
    temperature: 0.7
  })

  return result;
}