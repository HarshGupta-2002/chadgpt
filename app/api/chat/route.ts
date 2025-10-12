import { openRouter, MODELS } from '@/lib/openrouter';
import { containsFallbackPhrase } from '@/lib/responseAnalyzer';
import { convertToModelMessages, type UIMessage } from 'ai';

export const maxDuration = 30;

// Creates streaming response from cached text
function createCachedUIMessageResponse(text: string): Response {
  const encoder = new TextEncoder();
  
  const message = {
    id: crypto.randomUUID(),
    role: 'assistant',
    parts: [{ type: 'text', text }],
  };

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(
        encoder.encode(`0:${JSON.stringify(message)}\n`)
      );
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Vercel-AI-Data-Stream': 'v1',
    },
  });
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  if (!messages || !Array.isArray(messages)) {
    return new Response('Missing or invalid messages', { status: 400 });
  }

  const modelMessages = convertToModelMessages(messages);

  try {
    // Try base model first
    const baseResult = await openRouter(modelMessages, MODELS.BASE);
    const baseText = await baseResult.text;

    // Retry with online model if base lacks real-time data
    if (containsFallbackPhrase(baseText)) {
      const onlineResult = await openRouter(
        modelMessages, 
        MODELS.ONLINE
      );
      return onlineResult.toUIMessageStreamResponse();
    }

    return createCachedUIMessageResponse(baseText);
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
