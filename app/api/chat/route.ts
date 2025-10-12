import { openRouter, MODELS } from '@/lib/openrouter';
import { containsFallbackPhrase } from '@/lib/responseAnalyzer';
import { convertToModelMessages, type UIMessage } from 'ai';

export const maxDuration = 30;

/**
 * Creates a UI message stream response from cached text
 * Mimics the AI SDK's streaming format for consistency
 */
function createCachedUIMessageResponse(text: string): Response {
  const encoder = new TextEncoder();
  
  // Create the message in AI SDK format
  const message = {
    id: crypto.randomUUID(),
    role: 'assistant',
    parts: [{ type: 'text', text }],
  };

  const stream = new ReadableStream({
    start(controller) {
      // Send the complete message
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

  // First attempt with base model
  const baseResult = await openRouter(modelMessages, MODELS.BASE);
  
  // Collect the full text response to check for fallback phrases
  const baseText = await baseResult.text;

  // Check if response indicates lack of real-time data
  if (containsFallbackPhrase(baseText)) {
    // Retry with online model for real-time information
    const onlineResult = await openRouter(modelMessages, MODELS.ONLINE);
    return onlineResult.toUIMessageStreamResponse();
  }

  // Return cached base response in streaming format
  return createCachedUIMessageResponse(baseText);
}
