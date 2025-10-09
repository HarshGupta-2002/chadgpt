import type { UIMessage } from 'ai';
import { memo } from 'react';

interface ChatMessageProps {
  message: UIMessage;
}

export const ChatMessage = memo(function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  if (isUser) {
    // User message: right-aligned bubble with subtle theme color
    return (
      <div className="w-full px-4 py-3 md:px-8">
        <div className="max-w-[48rem] mx-auto flex justify-end">
          <div className="max-w-[80%] md:max-w-[70%]">
            <div className="px-4 py-3 rounded-2xl rounded-tr-md bg-zinc-700/90 text-zinc-50 shadow-sm">
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
    );
  }

  // AI message: no bubble, direct on background like ChatGPT
  return (
    <div className="w-full px-4 py-6 md:px-8">
      <div className="max-w-[48rem] mx-auto">
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
  );
});

