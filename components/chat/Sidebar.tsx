'use client';

import Link from 'next/link';
import { MessageSquare, Plus, ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { memo } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const SidebarContent = memo(function SidebarContent() {
  return (
    <div className="flex flex-col h-full custom-scrollbar-thin overflow-y-auto">
      {/* Header */}
      <div className="p-3 flex items-center justify-between flex-shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white transition-colors px-2"
        >
          <Home className="w-4 h-4" />
          <span className="font-semibold text-[15px]">ChadGPT</span>
        </Link>
      </div>

      {/* New Chat Button */}
      <div className="px-2 pb-2 flex-shrink-0">
        <button
          onClick={() => window.location.reload()}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all border border-zinc-200 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700/50"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New chat</span>
        </button>
      </div>

      {/* Chat History (Placeholder) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar-thin px-2 space-y-0.5">
        <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-600 px-3 py-2 mt-2">
          Recent
        </div>
        {/* Placeholder for future chat history */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-400 dark:text-zinc-500 cursor-not-allowed opacity-40">
          <MessageSquare className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm truncate">Chat history coming soon</span>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-zinc-200 dark:border-zinc-800/50 flex-shrink-0 space-y-3">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs text-zinc-500 dark:text-zinc-600">Theme</span>
          <ThemeToggle />
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-600 px-2">
          <p>Free Research Preview</p>
        </div>
      </div>
    </div>
  );
});

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <>
      {/* Desktop Toggle Button */}
      <button
        onClick={onToggle}
        className={`hidden md:block fixed top-4 z-50 p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-300 ${
          isOpen ? 'left-60' : 'left-4'
        }`}
        aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800/50 transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Spacer for desktop when sidebar is open */}
      <div className={`hidden md:block flex-shrink-0 transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'}`} />
    </>
  );
}

