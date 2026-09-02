import { Lightbulb, Code, MessageCircle, Sparkles } from 'lucide-react';
import { memo } from 'react';

interface EmptyStateProps {
  onSuggestionClick: (suggestion: string) => void;
}

const suggestions = [
  {
    icon: Lightbulb,
    text: 'Explain quantum computing',
    prompt: 'Explain quantum computing in simple terms',
  },
  {
    icon: Code,
    text: 'Write a Python function',
    prompt: 'Write a Python function to reverse a string',
  },
  {
    icon: MessageCircle,
    text: 'Help me brainstorm',
    prompt: 'Help me brainstorm ideas for a tech startup',
  },
  {
    icon: Sparkles,
    text: 'Create a story',
    prompt: 'Write a short creative story about AI',
  },
] as const;

export const EmptyState = memo(function EmptyState({ onSuggestionClick }: EmptyStateProps) {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-8">
      <div className="max-w-3xl w-full space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1
            rounded-full border border-zinc-200 dark:border-zinc-800
            text-[11px] font-mono uppercase tracking-widest
            text-zinc-500 dark:text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500
              animate-pulse" />
            New session
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold
            text-zinc-900 dark:text-zinc-100 tracking-tight">
            How can I help you today?
          </h1>
        </div>

        {/* Suggestion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {suggestions.map((suggestion, index) => {
            const Icon = suggestion.icon;
            return (
              <button
                key={index}
                onClick={() => onSuggestionClick(suggestion.prompt)}
                className="group p-4 rounded-xl bg-zinc-50
                  dark:bg-zinc-900/60 border border-zinc-200
                  dark:border-zinc-800 hover:border-zinc-300
                  dark:hover:border-zinc-700 transition-all text-left
                  cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 p-2 rounded-xl 
                    bg-emerald-100 dark:bg-zinc-800/50 text-emerald-600 
                    dark:text-emerald-400 group-hover:bg-emerald-200 
                    dark:group-hover:bg-zinc-700/50 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 
                    group-hover:text-zinc-900 
                    dark:group-hover:text-zinc-100 transition-colors 
                    font-medium">
                    {suggestion.text}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});

