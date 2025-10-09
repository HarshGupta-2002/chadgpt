'use client';

import Link from 'next/link';
import { MessageSquare, Plus, Menu, X, Home } from 'lucide-react';
import { useState } from 'react';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800">
        <Link
          href="/"
          className="flex items-center gap-2 text-zinc-100 hover:text-white transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="font-semibold">ChadGPT</span>
        </Link>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <button
          onClick={() => window.location.reload()}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="text-sm font-medium">New chat</span>
        </button>
      </div>

      {/* Chat History (Placeholder) */}
      <div className="flex-1 overflow-y-auto px-3 space-y-1">
        <div className="text-xs font-semibold text-zinc-500 px-3 py-2">
          Recent
        </div>
        {/* Placeholder for future chat history */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-800 text-zinc-400 transition-colors cursor-not-allowed opacity-50">
          <MessageSquare className="w-4 h-4" />
          <span className="text-sm truncate">Chat history coming soon</span>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-800">
        <div className="text-xs text-zinc-600">
          <p>Free Research Preview</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 md:hidden"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-zinc-950 border-r border-zinc-800 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop Sidebar Spacer */}
      <div className="hidden md:block w-64 flex-shrink-0" />
    </>
  );
}

