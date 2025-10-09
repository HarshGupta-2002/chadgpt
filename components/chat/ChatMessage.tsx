import type { UIMessage } from 'ai';

interface ChatMessageProps {
  message: UIMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`group w-full border-b border-zinc-800/50 ${
        isUser ? 'bg-zinc-900/30' : 'bg-zinc-900/50'
      }`}
    >
      <div className="max-w-3xl mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="flex gap-4 md:gap-6">
          {/* Avatar */}
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold ${
              isUser
                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                : 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white'
            }`}
          >
            {isUser ? 'Y' : 'AI'}
          </div>

          {/* Message Content */}
          <div className="flex-1 space-y-2 overflow-hidden">
            <div className="text-sm font-semibold text-zinc-300">
              {isUser ? 'You' : 'ChadGPT'}
            </div>
            <div className="prose prose-invert max-w-none">
              <div className="text-zinc-200 whitespace-pre-wrap break-words leading-relaxed">
                {message.parts.map((part, i) => {
                  if (part.type === 'text') {
                    return (
                      <span key={i} className="inline">
                        {part.text}
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

