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

  // AI message: no bubble, direct on background with markdown rendering
  return (
    <div className="w-full px-4 py-6 md:px-8">
      <div className="max-w-[48rem] mx-auto">
        <div className="text-[15px] leading-7 text-zinc-100 markdown-content">
          {message.parts.map((part, i) => {
            if (part.type === 'text') {
              return (
                <ReactMarkdown
                  key={i}
                  components={{
                    p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                    code: ({ inline, children, ...props }: any) =>
                      inline ? (
                        <code className="px-1.5 py-0.5 bg-zinc-800 rounded text-sm text-zinc-100" {...props}>
                          {children}
                        </code>
                      ) : (
                        <code className="block p-4 bg-zinc-900 border border-zinc-800 rounded-lg text-sm overflow-x-auto my-4" {...props}>
                          {children}
                        </code>
                      ),
                    pre: ({ children }) => <pre className="my-4">{children}</pre>,
                    strong: ({ children }) => <strong className="font-semibold text-zinc-50">{children}</strong>,
                    em: ({ children }) => <em className="italic text-zinc-200">{children}</em>,
                    ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
                    li: ({ children }) => <li className="text-zinc-100">{children}</li>,
                    h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 mt-6 text-zinc-50">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-xl font-bold mb-3 mt-5 text-zinc-50">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-lg font-semibold mb-2 mt-4 text-zinc-100">{children}</h3>,
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-zinc-700 pl-4 my-4 italic text-zinc-300">
                        {children}
                      </blockquote>
                    ),
                    a: ({ children, href }) => (
                      <a href={href} className="text-emerald-400 hover:text-emerald-300 underline" target="_blank" rel="noopener noreferrer">
                        {children}
                      </a>
                    ),
                  }}
                >
                  {part.text}
                </ReactMarkdown>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
});

