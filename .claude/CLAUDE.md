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

**Fallback-to-online-model logic** (`app/api/chat/route.ts` + `lib/responseAnalyzer.ts`): before calling any model, the route checks the user's latest message with `needsLiveData()` — a keyword/pattern scan for recency signals ("today", "latest", "news", "score", "weather", a near-present year, etc.). A match routes straight to `MODELS.ONLINE` (`openai/gpt-5:online`, OpenRouter's web-connected variant), skipping the base call entirely, because `MODELS.BASE` (`openai/gpt-5`) rarely uses the specific apology phrasing `containsFallbackPhrase()` looks for — it just as often answers confidently with stale info instead. Otherwise the route streams from `MODELS.BASE`, buffers the full text, and falls back to `containsFallbackPhrase()` as a secondary safety net, re-running against `MODELS.ONLINE` only if that matches. When neither fallback path fires, it reuses the already-streamed base result (`baseResult.toUIMessageStreamResponse()`) rather than re-requesting the model — this reuse works because the AI SDK's `streamText()` result tees its single underlying network stream on every accessor (`.textStream`, `.toUIMessageStreamResponse()`, etc. each call `teeStream()` internally) — so the chunks already consumed by the fallback-phrase check are replayed, not re-fetched. Don't reintroduce a second `openRouter()` call for the base model in the non-fallback branch; that used to double both latency and cost on every request.

**Model config** lives in `lib/openrouter.ts` (`MODELS.BASE` / `MODELS.ONLINE`, temperature, maxOutputTokens, reasoning effort). Add new models or provider options here. Two things to know when touching it:
- OpenRouter's model catalog changes over time — a hardcoded model ID can start 404ing ("No endpoints found") either because it was renamed/retired, or because the specific provider backing it isn't enabled for this account (verify with `curl https://openrouter.ai/api/v1/models` and `.../models/<id>/endpoints`, and test a candidate ID directly against `/api/v1/chat/completions` before wiring it in — some IDs list a live endpoint but still 404 per-account).
- `providerOptions.openrouter.reasoning.effort` is pinned to `'minimal'`. GPT-5's adaptive reasoning defaults to spending several seconds and reasoning tokens even on trivial prompts ("hi"); `'minimal'` skips that (confirmed via OpenRouter's usage accounting: `reasoning_tokens: 0`) while still reasoning correctly when a prompt actually needs it. `enabled: false` is rejected outright ("Reasoning is mandatory for this endpoint") — `effort: 'minimal'` is the correct lever, not `enabled`.

**UI structure**: `app/chat/page.tsx` owns chat state (via `useChat`) and layout (sidebar toggle, auto-scroll-to-bottom, loading indicator). Presentational pieces live in `components/chat/` and are re-exported through `components/chat/index.ts`:
- `Sidebar` — collapsible nav, closes itself on mobile widths
- `EmptyState` — shown when there are no messages yet, exposes suggestion-click shortcuts
- `ChatMessage` — renders one `UIMessage`; user messages are right-aligned bubbles rendering plain text, assistant messages render `part.type === 'text'` parts as Markdown via `react-markdown` inside Tailwind Typography (`prose`) classes
- `ChatInput` — the message composer pinned to the bottom of the chat area

**Theming**: `next-themes` via `components/ThemeProvider.tsx`, wrapped around the app in `app/layout.tsx` with `defaultTheme="dark"` and `enableSystem={false}`. `components/ThemeToggle.tsx` toggles it and guards against hydration mismatch by not rendering the real icon until mounted. Styling is Tailwind v4 (see `styles/globals.css`, loaded via `@/styles/globals.css`) plus shadcn/ui conventions (`components.json`: style "new-york", base color "neutral", icon library lucide) — shadcn primitives, when added, go in `components/ui` and use the `cn()` helper from `lib/utils.ts` (clsx + tailwind-merge).

**Visual language**: both `app/page.tsx` (landing) and the chat UI share a deliberate "technical/enterprise" styling convention — `font-mono uppercase tracking-widest` micro-labels (e.g. "MODEL", "RECENT", "THEME"), a small emerald `animate-pulse` dot for "live" status indicators, and the emerald-square `Sparkles` icon as the one consistent brand mark (nav, sidebar header, empty-state). Match this when adding new UI rather than introducing a different label/accent style.

**Path alias**: `@/*` maps to the repo root (see `tsconfig.json`).
