import { Sparkles, Lightbulb, Code, MessageCircle } from 'lucide-react';

interface EmptyStateProps {
  onSuggestionClick: (suggestion: string) => void;
}

export function EmptyState({ onSuggestionClick }: EmptyStateProps) {
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
  ];

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            How can I help you today?
          </h1>
          <p className="text-zinc-400">
            Choose a suggestion below or start typing your own message
          </p>
        </div>

        {/* Suggestion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(suggestion.prompt)}
              className="group p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all text-left"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-zinc-800 text-emerald-400 group-hover:bg-zinc-700 transition-colors">
                  <suggestion.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                    {suggestion.text}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

