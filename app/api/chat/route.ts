import { openRouter, MODELS } from '@/lib/openrouter';
import { containsFallbackPhrase } from '@/lib/responseAnalyzer';
import { convertToModelMessages, type UIMessage } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  if (!messages || !Array.isArray(messages)) {
    return new Response('Missing or invalid messages', { status: 400 });
  }

  const modelMessages = convertToModelMessages(messages);

  try {
    // Try base model first
    const baseResult = await openRouter(modelMessages, MODELS.BASE);
    
    // Collect full text to check for fallback phrases
    const chunks: string[] = [];
    for await (const chunk of baseResult.textStream) {
      chunks.push(chunk);
    }
    const baseText = chunks.join('');

    // Retry with online model if base lacks real-time data
    if (containsFallbackPhrase(baseText)) {
      const onlineResult = await openRouter(
        modelMessages, 
        MODELS.ONLINE
      );
      return onlineResult.toUIMessageStreamResponse();
    }

    // Return base result stream
    const finalResult = await openRouter(modelMessages, MODELS.BASE);
    return finalResult.toUIMessageStreamResponse();
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
