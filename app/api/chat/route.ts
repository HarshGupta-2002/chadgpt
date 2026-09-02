import { openRouter, MODELS } from '@/lib/openrouter';
import { needsLiveData } from '@/lib/responseAnalyzer';
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
    // Route to the online model only if the query signals recency intent.
    // Stream straight through — no upfront buffering, so tokens arrive live.
    const modelType = needsLiveData(getLastUserText(messages)) ? MODELS.ONLINE : MODELS.BASE;
    const result = await openRouter(modelMessages, modelType);
    return result.toUIMessageStreamResponse();
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
