import { Send } from 'lucide-react';

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
  return (
    <div className="border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-4 py-4 md:px-6">
        <form onSubmit={onSubmit} className="relative">
          <div className="relative flex items-center">
            <textarea
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
              className="w-full resize-none rounded-2xl bg-zinc-900 border border-zinc-700 px-4 py-3 pr-12 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all max-h-32 overflow-y-auto"
              style={{
                minHeight: '48px',
                maxHeight: '128px',
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 bottom-2 p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-emerald-600 transition-all active:scale-95"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-zinc-600 mt-2 text-center">
            ChadGPT can make mistakes. Consider checking important information.
          </p>
        </form>
      </div>
    </div>
  );
}

