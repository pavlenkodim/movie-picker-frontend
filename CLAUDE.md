# CLAUDE.md

This file guides Claude Code (claude.ai/code) when working in this repository.

## Read this first

The full project reference — stack, architecture, directory map, state rules, API
client, auth flow, styling, code style, and known gotchas — lives in
**[AGENTS.md](AGENTS.md)**. It is the single source of truth; everything below is
either a pointer into it or a Claude-specific note. Human setup instructions are in
[README.md](README.md).

## 30-second orientation

- **Filmder** — Tinder-style movie discovery. Frontend only; needs the
  `movie-picker-app` backend running to do anything.
- Next.js 16 App Router · React 19 · TypeScript (strict) · NextAuth v4 (JWT) ·
  TanStack Query v5 · Zustand v5 · React Hook Form + Zod · Framer Motion ·
  Tailwind CSS v4.
- Layout: `src/app/**` (routing) → `src/features/**` (domain logic) →
  `src/shared/**` (reusable). Imports flow left-to-right only. Alias: `@/* → src/*`.

## Commands

```bash
npm run dev      # dev server on :3000
npm run build    # production build — use to typecheck
npm run lint     # eslint
```

No tests, no CI. "Done" = `npm run lint` and `npm run build` both pass.
See [AGENTS.md](AGENTS.md#commands) and [AGENTS.md#environment](AGENTS.md#environment).

## Rules that are easy to get wrong

1. **Server state → React Query. Zustand → ephemeral UI only.** Never copy the
   recommendations list into the swipe store.
   ([AGENTS.md#state-the-one-hard-rule](AGENTS.md#state-the-one-hard-rule))
2. **All HTTP goes through `apiClient`** in `src/shared/api/api.ts`. Endpoint strings
   must not include `/api/`. `401` throws `AuthError` (auto sign-out); other failures
   throw `ApiError(status, message)`.
   ([AGENTS.md#data-fetching--sharedapiapits](AGENTS.md#data-fetching--sharedapiapits))
3. **Auth gating is server-side** in `app/(authorized)/layout.tsx` and page-level
   `getServerSession` + `redirect` — not middleware.
   ([AGENTS.md#auth-flow](AGENTS.md#auth-flow))
4. **Styling:** merge classes with `cn()` from `@/shared/libs/utils`; reuse
   `shared/ui` primitives; Tailwind v4 has no config file (theme tokens in
   `globals.css`); dark mode is `prefers-color-scheme`, so every light style needs a
   `dark:` pair. ([AGENTS.md#ui--styling](AGENTS.md#ui--styling))
5. **`"use client"`** only where it's needed; route pages/layouts stay Server
   Components. ([AGENTS.md#code-style](AGENTS.md#code-style))

## Working agreements for Claude

- Match the conventions and file layout in [AGENTS.md](AGENTS.md) rather than
  introducing new patterns.
- Don't remove parked commented-out code (OAuth providers, `MovieInfo` actors/trailer,
  `providers` notify wiring) unless the task is to finish that feature.
- Don't do drive-by mass renames of the existing misspelled identifiers
  (`AuthResponce`, `HistoryResponce`, "Nicname"); match the current symbol when
  editing nearby.
- Keep changes scoped; run `npm run lint` + `npm run build` before reporting done.
- Only commit or push when explicitly asked. Commit messages here are short and
  lowercase-ish (`fixes`, `fix notification`, `update version`).
