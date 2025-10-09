import { openRouter } from '@/lib/openrouter';
import { convertToModelMessages, type UIMessage } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  if (!messages || !Array.isArray(messages)) {
    return new Response('Missing or invalid messages', { status: 400 });
  }

  const modelMessages = convertToModelMessages(messages);
  const result = await openRouter(modelMessages);

  return result.toUIMessageStreamResponse();
}
