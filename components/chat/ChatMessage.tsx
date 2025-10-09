import type { UIMessage } from 'ai';
import { memo } from 'react';

interface ChatMessageProps {
  message: UIMessage;
}

export const ChatMessage = memo(function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`group w-full ${
        isUser ? '' : 'bg-zinc-900/30'
      }`}
    >
      <div className="max-w-[48rem] mx-auto px-4 py-8 md:px-8">
        <div className="flex gap-6 md:gap-8">
          {/* Avatar */}
          <div className="flex-shrink-0 mt-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shadow-sm ${
                isUser
                  ? 'bg-zinc-700 text-zinc-100'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              {isUser ? 'Y' : 'C'}
            </div>
          </div>

          {/* Message Content */}
          <div className="flex-1 overflow-hidden pt-0.5">
            <div className="text-[15px] leading-7 text-zinc-100">
              {message.parts.map((part, i) => {
                if (part.type === 'text') {
                  return (
                    <div key={i} className="whitespace-pre-wrap break-words">
                      {part.text}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

