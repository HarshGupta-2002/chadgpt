'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Sidebar, ChatMessage, ChatInput, EmptyState } from '@/components/chat';
import { Loader2, Menu } from 'lucide-react';

export default function Chat() {
  const [input, setInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { messages, sendMessage, status } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const isLoading = status === 'submitted' || status === 'streaming';

  // Only show "Thinking..." before visible text arrives, not for the
  // whole streaming duration.
  const lastMessage = messages[messages.length - 1];
  const isAssistantTextVisible =
    lastMessage?.role === 'assistant' &&
    lastMessage.parts.some((part) => part.type === 'text' && part.text.length > 0);
  const showThinkingIndicator = isLoading && !isAssistantTextVisible;

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const isNearBottom = 
        scrollContainer.scrollHeight - scrollContainer.scrollTop - 
        scrollContainer.clientHeight < 100;
      
      if (isNearBottom || messages.length === 1) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages, isLoading]);

  // Close sidebar on mobile by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className="flex h-screen bg-white dark:bg-zinc-950 overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

      {/* Mobile Menu Button - Only shows when sidebar is closed */}
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg 
            bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 
            dark:border-zinc-800/50 text-zinc-600 dark:text-zinc-400 
            hover:text-zinc-900 dark:hover:text-zinc-200 
            hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors 
            cursor-pointer md:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Messages Container */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar"
        >
          {messages.length === 0 ? (
            <EmptyState onSuggestionClick={handleSuggestionClick} />
          ) : (
            <div className="pb-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {/* Loading Indicator */}
              {showThinkingIndicator && (
                <div className="w-full px-4 py-6 md:px-8">
                  <div className="max-w-[48rem] mx-auto">
                    <div className="flex items-center gap-2 text-zinc-600
                      dark:text-zinc-400">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-[15px]">Thinking...</span>
                      <span className="w-1.5 h-1.5 rounded-full
                        bg-emerald-500 animate-pulse" />
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