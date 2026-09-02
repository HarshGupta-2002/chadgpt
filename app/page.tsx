import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b
        border-zinc-200 dark:border-zinc-800/60">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center
            justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-semibold tracking-tight">ChadGPT</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/chat"
            className="text-sm font-medium px-4 py-2 rounded-lg border
              border-zinc-300 dark:border-zinc-700 hover:border-zinc-400
              dark:hover:border-zinc-600 transition-colors"
          >
            Open chat
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-6 py-14 md:py-20">
        <div className="relative rounded-2xl border border-zinc-200
          dark:border-zinc-800/70 p-8 md:p-12">
          {/* corner ticks */}
          <span aria-hidden className="absolute -top-2 -left-2 font-mono
            text-xs text-zinc-300 dark:text-zinc-700 select-none">+</span>
          <span aria-hidden className="absolute -top-2 -right-2 font-mono
            text-xs text-zinc-300 dark:text-zinc-700 select-none">+</span>
          <span aria-hidden className="absolute -bottom-2 -left-2 font-mono
            text-xs text-zinc-300 dark:text-zinc-700 select-none">+</span>
          <span aria-hidden className="absolute -bottom-2 -right-2 font-mono
            text-xs text-zinc-300 dark:text-zinc-700 select-none">+</span>

          {/* eyebrow row */}
          <div className="flex flex-wrap items-center justify-between gap-3
            text-xs font-mono uppercase tracking-widest text-zinc-500
            dark:text-zinc-500 mb-10 pb-4 border-b border-dashed
            border-zinc-200 dark:border-zinc-800">
            <span className="flex items-center gap-3">
              <span className="text-emerald-600 dark:text-emerald-500">01</span>
              <span className="w-8 h-px bg-zinc-300 dark:bg-zinc-700" />
              Chat Interface
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500
                animate-pulse" />
              Live on OpenRouter
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold
                tracking-tight leading-[1.1]">
                One chat box.
                <br />
                <span className="relative inline-block">
                  Any model that fits.
                  <span className="absolute left-0 -bottom-1 w-full h-[3px]
                    bg-emerald-500/70" />
                </span>
              </h1>
              <p className="mt-5 text-[15px] text-zinc-500 dark:text-zinc-400
                max-w-md">
                Streams straight from OpenRouter, and reaches for a
                web-connected model automatically when an answer needs to
                be current. It answers like a true Chad.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/chat"
                  className="inline-flex items-center gap-2 px-6 py-3
                    rounded-xl bg-zinc-900 text-white dark:bg-white
                    dark:text-black text-sm font-semibold hover:bg-zinc-800
                    dark:hover:bg-zinc-200 transition-colors"
                >
                  Start chatting
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-xs font-mono text-zinc-400
                  dark:text-zinc-600">
                  No signup required
                </span>
              </div>

              {/* stats row */}
              <div className="mt-10 grid grid-cols-3 gap-6 pt-6 border-t
                border-zinc-200 dark:border-zinc-800 max-w-sm">
                <div>
                  <div className="text-[11px] font-mono uppercase
                    tracking-widest text-zinc-400 dark:text-zinc-600">
                    Model
                  </div>
                  <div className="mt-1 font-semibold text-sm">GPT-5</div>
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase
                    tracking-widest text-zinc-400 dark:text-zinc-600">
                    Mode
                  </div>
                  <div className="mt-1 font-semibold text-sm">Streaming</div>
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase
                    tracking-widest text-zinc-400 dark:text-zinc-600">
                    Access
                  </div>
                  <div className="mt-1 font-semibold text-sm">No login</div>
                </div>
              </div>
            </div>

            {/* Right: live preview panel */}
            <div className="rounded-xl border border-zinc-200
              dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60
              overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3
                border-b border-zinc-200 dark:border-zinc-800 font-mono
                text-xs text-zinc-500 dark:text-zinc-500">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  chadgpt/session
                </span>
                <span>streaming</span>
              </div>
              <div className="p-5 space-y-4 text-sm">
                <div className="flex justify-end">
                  <div className="px-3 py-2 rounded-xl rounded-tr-sm
                    bg-zinc-200 dark:bg-zinc-800 text-zinc-800
                    dark:text-zinc-200 max-w-[80%]">
                    what's the future of AGI?
                  </div>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300
                  leading-relaxed">
                  The future of AGI is promising and full of potential.
                  <span className="inline-block w-[2px] h-4 align-middle
                    bg-emerald-500 ml-0.5 animate-pulse" />
                </p>
              </div>
              <div className="px-4 py-3 border-t border-zinc-200
                dark:border-zinc-800 font-mono text-[11px] text-zinc-400
                dark:text-zinc-600 flex justify-between">
                <span>model: gpt-5:online</span>
                <span>fallback: auto</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 pb-14">
        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800
          flex flex-col sm:flex-row items-center justify-between gap-3
          text-xs font-mono text-zinc-400 dark:text-zinc-600">
          <span>Built with Next.js · Vercel AI SDK · OpenRouter</span>
          <span>Free to use</span>
        </div>
      </footer>
    </div>
  );
}
