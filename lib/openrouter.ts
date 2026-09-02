import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText, type ModelMessage } from 'ai';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!
});

export const MODELS = {
  BASE: 'openai/gpt-5',
  ONLINE: 'openai/gpt-5:online',
} as const;

export type ModelType = typeof MODELS[keyof typeof MODELS];

const configuredMaxOutputTokens = Number.parseInt(
  process.env.OPENROUTER_MAX_OUTPUT_TOKENS ?? '',
  10
);
const maxOutputTokens = Number.isInteger(configuredMaxOutputTokens) && configuredMaxOutputTokens > 0
  ? configuredMaxOutputTokens
  : 1000;

export async function openRouter(
  messages: ModelMessage[],
  modelType: ModelType = MODELS.BASE
) {
  const result = streamText({
    model: openrouter.chat(modelType),
    messages,
    maxOutputTokens,
    temperature: 0.7
  });

  return result;
}