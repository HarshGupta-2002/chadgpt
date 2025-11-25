import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText, type CoreMessage } from 'ai';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!
});

export const MODELS = {
  BASE: 'openai/gpt-5-chat',
  ONLINE: 'openai/gpt-5-chat:online',
} as const;

export type ModelType = typeof MODELS[keyof typeof MODELS];

export async function openRouter(
  messages: CoreMessage[],
  modelType: ModelType = MODELS.BASE
) {
  const result = streamText({
    model: openrouter.chat(modelType),
    messages,
    maxOutputTokens: parseInt(process.env.MAX_OUTPUT_TOKENS!),
    temperature: 0.7
  });

  return result;
}