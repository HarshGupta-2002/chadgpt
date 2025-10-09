import type { UIMessage } from 'ai';
import { memo } from 'react';

interface ChatMessageProps {
  message: UIMessage;
}

export const ChatMessage = memo(function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className="w-full px-4 py-4 md:px-8">
      <div className="max-w-[48rem] mx-auto">
        <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* Avatar */}
          <div className="flex-shrink-0 mt-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shadow-sm ${
                isUser
                  ? 'bg-blue-600 text-white'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              {isUser ? 'Y' : 'C'}
            </div>
          </div>

          {/* Message Bubble */}
          <div className={`flex flex-col max-w-[75%] md:max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
            <div
              className={`px-4 py-3 rounded-2xl shadow-sm ${
                isUser
                  ? 'bg-blue-600 text-white rounded-tr-sm'
                  : 'bg-zinc-800 text-zinc-100 rounded-tl-sm'
              }`}
            >
              <div className="text-[15px] leading-6">
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
    </div>
  );
});

