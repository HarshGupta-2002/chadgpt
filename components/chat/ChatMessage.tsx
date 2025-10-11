import type { UIMessage } from 'ai';
import { memo } from 'react';
import ReactMarkdown from 'react-markdown';

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
            <div className="px-4 py-3 rounded-2xl rounded-tr-md 
              bg-zinc-200 dark:bg-zinc-700/90 text-zinc-900 
              dark:text-zinc-50 shadow-sm">
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

  // AI message: no bubble, direct on background with markdown rendering
  return (
    <div className="w-full px-4 py-6 md:px-8">
      <div className="max-w-[48rem] mx-auto">
        <article className="prose dark:prose-invert prose-zinc 
          max-w-none 
          prose-p:text-zinc-900 dark:prose-p:text-zinc-100
          prose-headings:text-zinc-900 
          dark:prose-headings:text-zinc-100
          prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100
          prose-code:text-zinc-900 dark:prose-code:text-zinc-100
          prose-pre:bg-zinc-100 dark:prose-pre:bg-zinc-900 
          prose-pre:border prose-pre:border-zinc-200 
          dark:prose-pre:border-zinc-800
          prose-a:text-emerald-600 dark:prose-a:text-emerald-400 
          hover:prose-a:text-emerald-700 
          dark:hover:prose-a:text-emerald-300
          prose-li:text-zinc-900 dark:prose-li:text-zinc-100
          prose-blockquote:text-zinc-700 
          dark:prose-blockquote:text-zinc-300
          prose-blockquote:border-zinc-300 
          dark:prose-blockquote:border-zinc-700">
          {message.parts.map((part, i) => {
            if (part.type === 'text') {
              return <ReactMarkdown key={i}>{part.text}</ReactMarkdown>;
            }
            return null;
          })}
        </article>
      </div>
    </div>
  );
});

