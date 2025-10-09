'use client';

import Link from 'next/link';
import { MessageSquare, Plus, Menu, X, Home } from 'lucide-react';
import { useState, memo, useCallback } from 'react';

const SidebarContent = memo(function SidebarContent() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-zinc-200 hover:text-white transition-colors px-2"
        >
          <Home className="w-4 h-4" />
          <span className="font-semibold text-[15px]">ChadGPT</span>
        </Link>
      </div>

      {/* New Chat Button */}
      <div className="px-2 pb-2">
        <button
          onClick={() => window.location.reload()}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-transparent hover:bg-zinc-800/50 text-zinc-300 hover:text-zinc-100 transition-all border border-zinc-800/50 hover:border-zinc-700/50"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New chat</span>
        </button>
      </div>

      {/* Chat History (Placeholder) */}
      <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
        <div className="text-xs font-semibold text-zinc-600 px-3 py-2 mt-2">
          Recent
        </div>
        {/* Placeholder for future chat history */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-500 cursor-not-allowed opacity-40">
          <MessageSquare className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm truncate">Chat history coming soon</span>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-zinc-800/50">
        <div className="text-xs text-zinc-600 px-2">
          <p>Free Research Preview</p>
        </div>
      </div>
    </div>
  );
});

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSidebar = useCallback(() => setIsOpen(prev => !prev), []);
  const closeSidebar = useCallback(() => setIsOpen(false), []);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-3 left-3 z-50 p-2 rounded-lg bg-zinc-900 border border-zinc-800/50 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors md:hidden"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-zinc-950 border-r border-zinc-800/50 transition-transform duration-300 ease-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar Spacer */}
      <div className="hidden md:block w-64 flex-shrink-0" />
    </>
  );
}

