import { openRouter, MODELS } from '@/lib/openrouter';
import { containsFallbackPhrase, needsLiveData } from '@/lib/responseAnalyzer';
import { convertToModelMessages, type UIMessage } from 'ai';

export const maxDuration = 30;

function getLastUserText(messages: UIMessage[]): string {
  const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
  if (!lastUserMessage) {
    return '';
  }

  return lastUserMessage.parts
    .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
    .map(part => part.text)
    .join(' ');
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  if (!messages || !Array.isArray(messages)) {
    return new Response('Missing or invalid messages', { status: 400 });
  }

  const modelMessages = convertToModelMessages(messages);

  try {
    // Primary trigger: if the user's own query signals recency intent
    // (e.g. "today", "latest", "score"), skip the base model entirely and
    // go straight to the online model — the base model rarely admits it
    // doesn't know, so waiting for it to hedge is unreliable.
    if (needsLiveData(getLastUserText(messages))) {
      const onlineResult = await openRouter(modelMessages, MODELS.ONLINE);
      return onlineResult.toUIMessageStreamResponse();
    }

    // Otherwise, try the base model first
    const baseResult = await openRouter(modelMessages, MODELS.BASE);

    // Collect full text to check for fallback phrases
    const chunks: string[] = [];
    for await (const chunk of baseResult.textStream) {
      chunks.push(chunk);
    }
    const baseText = chunks.join('');

    // Secondary safety net: retry with online model if base admitted it
    // lacks real-time data even though the query didn't trip needsLiveData().
    if (containsFallbackPhrase(baseText)) {
      const onlineResult = await openRouter(
        modelMessages,
        MODELS.ONLINE
      );
      return onlineResult.toUIMessageStreamResponse();
    }

    // Reuse the already-streamed result instead of calling the model again.
    return baseResult.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error('OpenRouter API error:', error);

    // Return specific error with proper status code
    const statusCode = error.statusCode || 500;
    const message = error.statusCode === 402
      ? 'Insufficient credits. Add credits at openrouter.ai/settings'
      : error.message || 'An unexpected error occurred';

    return new Response(
      JSON.stringify({ error: message }),
      { 
        status: statusCode,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
