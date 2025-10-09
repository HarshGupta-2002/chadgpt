import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="w-full max-w-2xl mx-auto text-center space-y-8">
        {/* Logo/Title */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            ChadGPT
          </h1>
          <p className="text-xl text-zinc-400 max-w-md mx-auto">
            Your intelligent AI assistant, powered by OpenRouter
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8">
          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
            <div className="text-3xl mb-3">💬</div>
            <h3 className="text-white font-semibold mb-2">Natural Conversations</h3>
            <p className="text-sm text-zinc-500">Engage in fluid, context-aware dialogues</p>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-white font-semibold mb-2">Real-time Streaming</h3>
            <p className="text-sm text-zinc-500">Watch responses appear as they're generated</p>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-white font-semibold mb-2">Intelligent Responses</h3>
            <p className="text-sm text-zinc-500">Powered by advanced language models</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
          <Link
            href="/chat"
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            Start chatting
          </Link>
          <button
            disabled
            className="w-full sm:w-auto px-8 py-4 bg-zinc-800 text-zinc-400 font-semibold rounded-xl border border-zinc-700 cursor-not-allowed opacity-60"
            title="Coming soon"
          >
            Log in
          </button>
        </div>

        {/* Footer note */}
        <p className="text-sm text-zinc-600 pt-8">
          No login required to start chatting • Free to use
        </p>
      </div>
    </main>
  );
}
