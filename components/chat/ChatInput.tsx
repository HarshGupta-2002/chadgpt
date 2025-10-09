import { Send } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ChatInput({
  input,
  isLoading,
  onInputChange,
  onSubmit,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '24px';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = Math.min(scrollHeight, 200) + 'px';
    }
  }, [input]);

  return (
    <div className="w-full bg-gradient-to-b from-white/0 via-white/50 to-white dark:from-zinc-950/0 dark:via-zinc-950/50 dark:to-zinc-950">
      <div className="max-w-[48rem] mx-auto px-4 pb-6 pt-4 md:px-8">
        <form onSubmit={onSubmit} className="relative">
          <div className="relative flex items-end rounded-3xl bg-white dark:bg-zinc-900 shadow-lg border border-zinc-300 dark:border-zinc-700/50 hover:border-zinc-400 dark:hover:border-zinc-600/50 focus-within:border-zinc-500 dark:focus-within:border-zinc-600 transition-colors">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  onSubmit(e);
                }
              }}
              placeholder="Message ChadGPT..."
              disabled={isLoading}
              rows={1}
              className="w-full resize-none bg-transparent px-5 py-4 pr-14 text-[15px] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed max-h-[200px] overflow-y-auto"
              style={{ minHeight: '24px' }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-3 bottom-3 p-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 disabled:text-zinc-400 dark:disabled:text-zinc-500 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-3 text-center px-2">
            ChadGPT can make mistakes. Consider checking important information.
          </p>
        </form>
      </div>
    </div>
  );
}

