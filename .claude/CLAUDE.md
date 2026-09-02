# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # start dev server (next dev --turbopack), http://localhost:3000
pnpm build    # production build (next build --turbopack)
pnpm start    # run production build
pnpm lint     # eslint
```

There is no test suite configured in this repo.

Package manager is pnpm (pnpm-lock.yaml is committed).

## Environment

Single API key variable, split across two files per Next.js's built-in env precedence (`.env.local` overrides `.env`; both are gitignored via `.env*`):
- `.env` — `OPENROUTER_API_KEY` (production key) + `OPENROUTER_MAX_OUTPUT_TOKENS`
- `.env.local` — `OPENROUTER_API_KEY` (local/testing key override)

`lib/openrouter.ts` reads only `OPENROUTER_API_KEY` and `OPENROUTER_MAX_OUTPUT_TOKENS` (defaults to 1000 if unset/invalid). Don't reintroduce a second key variable (e.g. a `_PROD` suffix) — use `.env.local` for any environment-specific override instead.

## Architecture

ChadGPT is a Next.js 15 (App Router) chat app that streams responses from OpenRouter via the Vercel AI SDK.

**Request flow**: `app/chat/page.tsx` (client) uses `@ai-sdk/react`'s `useChat` to POST message history to `app/api/chat/route.ts`. That route is the only server-side integration point with OpenRouter.

**Fallback-to-online-model logic** (`app/api/chat/route.ts` + `lib/responseAnalyzer.ts`): the route first streams a response from `MODELS.BASE` (`openai/gpt-5`), buffers the full text, and scans it with `containsFallbackPhrase()` for phrases indicating the model doesn't have real-time data (e.g. "knowledge cutoff", "i can't browse the internet"). If found, it re-runs the same messages against `MODELS.ONLINE` (`openai/gpt-5:online`, OpenRouter's web-connected variant) and streams that instead. Otherwise it re-issues the base call a second time and streams that. This means a request that ends up using the base model actually calls the model twice (once to buffer/check text, once to produce the streamed response) — be aware of this when touching `route.ts`, since the current implementation is not token/cost-efficient and any change here should consider reusing the first stream's chunks rather than re-requesting.

**Model config** lives in `lib/openrouter.ts` (`MODELS.BASE` / `MODELS.ONLINE`, temperature, maxOutputTokens). Add new models or provider options here. OpenRouter's model catalog changes over time — a hardcoded model ID can start 404ing ("No endpoints found") either because it was renamed/retired, or because the specific provider backing it isn't enabled for this account (verify with `curl https://openrouter.ai/api/v1/models` and `.../models/<id>/endpoints`, and test a candidate ID directly against `/api/v1/chat/completions` before wiring it in — some IDs list a live endpoint but still 404 per-account).

**UI structure**: `app/chat/page.tsx` owns chat state (via `useChat`) and layout (sidebar toggle, auto-scroll-to-bottom, loading indicator). Presentational pieces live in `components/chat/` and are re-exported through `components/chat/index.ts`:
- `Sidebar` — collapsible nav, closes itself on mobile widths
- `EmptyState` — shown when there are no messages yet, exposes suggestion-click shortcuts
- `ChatMessage` — renders one `UIMessage`; user messages are right-aligned bubbles rendering plain text, assistant messages render `part.type === 'text'` parts as Markdown via `react-markdown` inside Tailwind Typography (`prose`) classes
- `ChatInput` — the message composer pinned to the bottom of the chat area

**Theming**: `next-themes` via `components/ThemeProvider.tsx`, wrapped around the app in `app/layout.tsx` with `defaultTheme="dark"` and `enableSystem={false}`. `components/ThemeToggle.tsx` toggles it and guards against hydration mismatch by not rendering the real icon until mounted. Styling is Tailwind v4 (see `styles/globals.css`, loaded via `@/styles/globals.css`) plus shadcn/ui conventions (`components.json`: style "new-york", base color "neutral", icon library lucide) — shadcn primitives, when added, go in `components/ui` and use the `cn()` helper from `lib/utils.ts` (clsx + tailwind-merge).

**Path alias**: `@/*` maps to the repo root (see `tsconfig.json`).
