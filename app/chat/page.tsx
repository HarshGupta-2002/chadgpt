'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Sidebar, ChatMessage, ChatInput, EmptyState } from '@/components/chat';
import { Loader2 } from 'lucide-react';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const isLoading = status === 'submitted' || status === 'streaming';

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const isNearBottom = 
        scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight < 100;
      
      if (isNearBottom || messages.length === 1) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages, isLoading]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const messageText = input;
    setInput('');
    
    await sendMessage({ text: messageText });
  }, [input, isLoading, sendMessage]);

  const handleSuggestionClick = useCallback(async (suggestion: string) => {
    if (isLoading) return;
    await sendMessage({ text: suggestion });
  }, [isLoading, sendMessage]);

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Messages Container */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto overflow-x-hidden"
        >
          {messages.length === 0 ? (
            <EmptyState onSuggestionClick={handleSuggestionClick} />
          ) : (
            <div>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {/* Loading Indicator */}
              {isLoading && (
                <div className="w-full bg-zinc-900/30">
                  <div className="max-w-[48rem] mx-auto px-4 py-8 md:px-8">
                    <div className="flex gap-6 md:gap-8">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold bg-emerald-600 text-white shadow-sm">
                          C
                        </div>
                      </div>
                      <div className="flex-1 pt-0.5">
                        <div className="flex items-center gap-2 text-zinc-400">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-[15px]">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Scroll anchor with padding for input area */}
              <div ref={messagesEndRef} className="h-32" />
            </div>
          )}
        </div>

        {/* Fixed Input Area */}
        <div className="flex-shrink-0 sticky bottom-0">
          <ChatInput
            input={input}
            isLoading={isLoading}
            onInputChange={setInput}
            onSubmit={handleSubmit}
          />
        </div>
      </main>
    </div>
  );
}