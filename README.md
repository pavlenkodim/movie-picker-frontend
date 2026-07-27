# Filmder — Frontend

Tinder-style movie discovery app. Swipe on movies, the backend adjusts your genre
preferences after every swipe and returns better-scored recommendations over time.

Backend repo: https://github.com/pavlenkodim/movie-picker-app

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- NextAuth v4 — credentials provider, JWT session strategy
- TanStack React Query v5 — server state
- Zustand v5 — client-only session mechanics (never server data)
- React Hook Form + Zod — forms/validation
- Framer Motion — swipe gestures/animations
- Tailwind CSS v4

## Architecture

Feature-based, organized by domain rather than by technical layer:

```
src/
  app/
    (public)/             # landing, auth
    (authorized)/         # movies, profile, history — gated in layout.tsx
    api/auth/[...nextauth]/
  features/
    auth/                  # login/register forms + hooks
    movies/                # swipe stack, recommendations, session store
    profile/               # profile creation/edit, genre preferences, S3 thumbnail
    history/               # swipe history
    navbar/
  shared/
    api/                   # apiClient, error types
    hooks/
    libs/
    providers/
    ui/                    # Button, Checkbox, GlassArea, Header, Input, Picture
```

**Server state vs. client state boundary:** React Query owns everything that comes
from the API (movies, recommendations, profile). Zustand
(`features/movies/store/swipeSessionStore.ts`) holds only ephemeral UI mechanics —
`currentIndex`, `totalCount`, `sessionStats`. The movies array itself is never
duplicated into Zustand. Keep it that way — it's the one architectural rule in this
codebase that's easy to violate by "just caching the list for convenience."

**Route protection** happens server-side in `app/(authorized)/layout.tsx` via
`getServerSession` + `redirect`, not in middleware. `src/proxy.ts` re-exports
`next-auth/middleware` but is **not wired up** — Next.js only recognizes a file
named `middleware.ts` at the project/`src` root, so this file currently does
nothing. Either delete it or rename it to `middleware.ts` and decide what it
should actually cover (see Known Issues).

## Recommendation loop (how the swipe stack talks to the backend)

1. `useMovies()` fetches `GET /api/recommendations`: scored, sorted movie
   candidates plus a `hasMore` flag.
2. `MovieStack` renders a 3-card visual stack (`STACK_SIZE`) sliced from
   `currentIndex`. Swiping calls `useSwipe()` (`POST /api/swipes`) and advances
   `currentIndex` in Zustand.
3. When `currentIndex >= totalCount`, `MovieStack` calls `refetch()` and resets
   the index. `staleTime: Infinity` / `refetchOnMount: false` /
   `refetchOnWindowFocus: false` are intentional — recommendations should only
   change on an explicit refetch, never silently in the background.
4. Genre weighting, TMDB caching, and scoring all happen server-side; the
   frontend only ever receives already-scored movies.

## Getting started

**Prerequisites:** the backend (`movie-picker-app`) running locally with
Postgres and a valid TMDB API key — this frontend has no data of its own.

```bash
cp .env.example .env.local   # see below
npm install
npm run dev
```

Open http://localhost:3000.

### Environment variables

| Variable                  | Required  | Description                                                                                                    |
| ------------------------- | --------- | -------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_BACKEND_URL` | yes       | Base URL of the NestJS backend (e.g. `http://localhost:3001`). Falls back to `http://localhost:3001` if unset. |
| `NEXTAUTH_SECRET`         | yes       | Secret used to sign NextAuth JWTs. Required in production; generate with `openssl rand -base64 32`.            |
| `NEXTAUTH_URL`            | prod only | Canonical URL of the frontend, required by NextAuth outside local dev.                                         |

> There is currently no `.env.example` committed — add one alongside these
> three variables so a fresh clone doesn't silently fall back to
> `localhost:3001` in production.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — ESLint

## Known issues / open work

- **Swipes are fire-and-forget on failure.** `useSwipe()`'s `onError` only
  logs to console; `MovieStack` advances the local index regardless of whether
  `POST /api/swipes` succeeded. A failed request silently loses that swipe —
  no retry, no rollback, no user-facing error.
- **`hasMore` from `/api/recommendations` is discarded** in `useMovies`'
  `select`. It's needed for the planned migration to `useInfiniteQuery` with
  prefetch-ahead (fetching the next page before the user hits the end of the
  stack), which hasn't started yet.
- **JWT staleness.** `banned` / `roles` are baked into the JWT at login and
  only refreshed on next login — a mid-session ban or role change won't be
  reflected until the token expires (`maxAge: 24h`) or the user re-authenticates.

## License

Not licensed for reuse yet — internal/portfolio project.
