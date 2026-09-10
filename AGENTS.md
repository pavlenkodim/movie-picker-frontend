# AGENTS.md

Guidance for AI coding agents working in this repository. Human-oriented setup lives
in [README.md](README.md); this file is the canonical reference for conventions and
architecture. [CLAUDE.md](CLAUDE.md) points here.

## What this is

**Filmder** — a Tinder-style movie discovery frontend. The user swipes on movie
cards; the backend re-weights their genre preferences after every swipe and returns
better-scored recommendations over time. This repo is **frontend only** — it has no
data of its own and does nothing useful without the backend
(`movie-picker-app`, a NestJS + Postgres service) running.

## Stack

| Concern            | Choice                                                            |
| ------------------ | --------------------------------------------------------------------|
| Framework          | Next.js 16 (App Router), React 19, TypeScript 5 (`strict`)          |
| Auth               | NextAuth v4 — credentials provider, JWT session strategy (24h)      |
| Server state       | TanStack React Query v5                                            |
| Client state       | Zustand v5 — ephemeral UI mechanics only, never server data        |
| Forms / validation | React Hook Form + Zod (`@hookform/resolvers/zod`)                  |
| Animation          | Framer Motion (swipe gestures)                                     |
| Styling            | Tailwind CSS v4 (CSS-first config, no `tailwind.config.js`)        |
| Icons              | `lucide-react`                                                    |

## Commands

```bash
npm run dev      # next dev — local dev server on :3000
npm run build    # next build — production build (use this to typecheck a change)
npm run start    # next start — run the production build
npm run lint     # eslint (flat config, eslint-config-next core-web-vitals + typescript)
```

There is **no test suite** and **no CI** in this repo. "Verify" means: `npm run lint`
passes and `npm run build` completes without type errors.

## Environment

Copy `example.env` to `.env.local` and fill in:

| Variable                  | Notes                                                                |
| ------------------------- | --------------------------------------------------------------------- |
| `NEXT_PUBLIC_BACKEND_URL` | Base URL of the backend. Falls back to `http://localhost:3001`.       |
| `NEXTAUTH_SECRET`         | Signs NextAuth JWTs. Required in production.                          |
| `NEXTAUTH_URL`            | Canonical frontend URL. Required outside local dev.                  |

`.env*` is git-ignored.

## Architecture

Feature-based (Feature-Sliced-flavoured), organized by domain, not by technical layer.
Three top-level zones under `src/`, and imports flow **one direction only**:

```
app/  →  features/  →  shared/
```

- `app/**` may import from `features/**` and `shared/**`.
- `features/<x>/**` may import from `shared/**` and, sparingly, sibling features
  (e.g. `history` reuses `movies` types; `profile` reuses `auth/SignOutButton`).
- `shared/**` imports only from `shared/**`. Never from `features` or `app`.

Always use the `@/*` path alias (`@/* → src/*`); do not write deep relative imports
like `../../../shared`.

### Directory map

```
src/
  app/
    (public)/                     # landing page, /auth — no session required
    (authorized)/                 # /movies, /history, /profile/** — session-gated
    api/auth/[...nextauth]/       # NextAuth route handler + options + type augmentation
    layout.tsx                    # root: fonts, <Providers>, <NotificationContainer>
    globals.css                   # Tailwind v4 entry + theme tokens
    not-found.tsx
  features/
    auth/       movies/       profile/       history/       navbar/
  shared/
    api/        # apiClient + typed errors (the only place fetch() lives)
    hooks/      # cross-feature query hooks (useGenres, useMyGenres, useNotification)
    libs/       # utils.ts — cn(), colorFromLetter()
    providers/  # QueryClient + SessionProvider wrapper ("use client")
    stores/     # notificationStore (Zustand)
    ui/         # design-system primitives
    types/      # shared domain types (User, Role, Genre, ...)
```

### Feature module shape

Each feature folder follows the same internal layout (only the parts it needs):

```
features/<name>/
  <Name>Module.tsx      # the feature's entry component, rendered by a route page
  components/            # presentational + container components, plus Skeleton.tsx
  hooks/                 # React Query hooks for this feature (useMovies, useSwipe, ...)
  schemas/index.ts       # Zod schemas + inferred *FormValues types
  types/index.ts         # feature-local types
  store/                 # Zustand store, feature-scoped (movies only, so far)
  utils/index.ts
```

Route pages in `app/**` stay thin: they render a `<Header />` and the feature's
`<XModule />`, and may do server-side session checks / redirects. All real logic
lives in the feature module.

## State: the one hard rule

**React Query owns everything from the API. Zustand owns only ephemeral UI mechanics.**

- API data (movies, recommendations, profile, genres, history) → React Query, keyed
  by `queryKey`.
- `features/movies/store/swipeSessionStore.ts` holds `currentIndex`, `totalCount`,
  `sessionStats` — swipe-session bookkeeping, nothing else.
- The recommendations array is **never** copied into Zustand. Do not "cache the list
  in the store for convenience" — this is the easiest rule in the codebase to break.

`shared/stores/notificationStore.ts` is the other Zustand store: a transient toast
queue, also not server data.

## Data fetching — `shared/api/api.ts`

`apiClient` is the single HTTP entry point. Nothing else should call `fetch`
directly (the NextAuth `authorize` callback in `options.ts` is the one deliberate
exception, since it runs before a session exists).

```ts
apiClient<TResponse, TBody = undefined>(
  endpoint: string,                                  // e.g. "recommendations" or "/swipes"
  options?: { method?, body?: TBody | FormData, headers? },
): Promise<TResponse>
```

- URL is built as `${NEXT_PUBLIC_BACKEND_URL}/api/${endpoint}` (leading slash on
  `endpoint` is stripped) — **do not** include `/api/` in the endpoint string.
- Access token is pulled from the NextAuth session automatically: `getSession()` in
  the browser, `getServerSession(options)` on the server. Sent as
  `Authorization: Bearer <token>`.
- `FormData` bodies skip the `Content-Type` header and are sent as-is; other bodies
  are `JSON.stringify`-ed with `Content-Type: application/json`.
- **Errors:**
  - `401` → throws `AuthError`. Caught in `shared/providers` query/mutation caches,
    which call `signOut({ callbackUrl: "/auth?tab=login" })`. Query `retry` is also
    configured to never retry an `AuthError`.
  - any other non-2xx → throws `ApiError(status, message)` (message from the response
    body's `message` field, falling back to `"API Error"`).
  - `204` → resolves to `undefined`.

Query hooks live next to their feature (`features/*/hooks/`) or in `shared/hooks/`
if used across features. Conventions seen in the codebase:

- `staleTime: Infinity` + `refetchOnMount: false` + `refetchOnWindowFocus: false`
  for data that must only change on an explicit `refetch()` (recommendations, genres).
- `useMovies()` narrows the response with `select` — components receive `Movie[]`,
  not the raw `{ data: ScoredMovie[], hasMore }` envelope. (`hasMore` is currently
  dropped; it's reserved for a future `useInfiniteQuery` migration.)

## Auth flow

- Config: `src/app/api/auth/[...nextauth]/options.ts`. Credentials provider posts to
  `${NEXT_PUBLIC_BACKEND_URL}/api/auth/login` and stores `{ ...user, token }`.
- The backend JWT and profile data are carried on the NextAuth token/session via the
  `jwt` and `session` callbacks. Type augmentation is in `next-auth.d.ts`
  (`session.token`, `session.user.profileId`, `banned`, `roles`, ...).
- After profile creation the client calls `useSession().update({ token, profileId })`
  to refresh the token in place (handled by the `trigger === "update"` branch).
- **Route protection is server-side, in layouts and pages — not middleware.**
  `app/(authorized)/layout.tsx` does `getServerSession` + `redirect("/auth?tab=login")`.
  Individual pages add finer redirects: `/profile/create` bounces to `/profile` if a
  `profileId` already exists; `/profile/initial-genres` bounces if genre weights
  already exist; `/auth` bounces to `/movies` if a session exists.
- **Known staleness:** `banned` / `roles` are baked into the JWT at login and only
  refresh on re-login or token expiry (24h). A mid-session ban won't take effect
  immediately.

## UI & styling

- Primitives live in `shared/ui/<Name>/` as `<Name>.tsx` plus an `index.ts` barrel
  that does `export { default } from "./<Name>";`. Import from the folder
  (`@/shared/ui/Button`), not the file.
- Current primitives: `Button`, `Checkbox`, `GlassArea`, `Header`, `Input`,
  `Notification`, `NotificationContainer`, `Picture`.
- **Always merge class names with `cn()`** from `@/shared/libs/utils`
  (`twMerge(clsx(...))`). Never concatenate Tailwind strings by hand where a caller
  might override them.
- `Button` and `Input` use internal `size` / `hSize` + `variant` lookup maps
  (`"small" | "medium" | "large"`, `"primary" | "secondary" | "danger" | "link"`).
  Extend those maps rather than adding one-off `className` overrides for common cases.
- `Input` takes `error={{ isError: boolean, message?: string }}` — pass RHF errors as
  `error={{ isError: !!errors.x, message: errors.x?.message }}`.
- `Picture` wraps `next/image` with an `onError` fallback
  (`/data/movie-fallback.png`). Use it instead of raw `next/image` for remote posters.
- **Tailwind v4, CSS-first.** There is no `tailwind.config.js`. Theme tokens are
  declared in `src/app/globals.css` via `@theme inline` (`--color-background`,
  `--color-foreground`, font vars). Use the semantic classes `bg-background` /
  `text-foreground` and their opacity variants (`bg-foreground/10`) for anything
  theme-aware.
- **Dark mode = `prefers-color-scheme`.** Pair every light style with an explicit
  `dark:` variant (`bg-white/10 dark:bg-black/10`). There is no class-based theme
  toggle.
- The glass/blur aesthetic (`GlassArea`, notifications, navbar) leans on
  `backdrop-blur-*` over translucent `white/10` / `black/10` layers with hairline
  `black/10` / `white/10` borders. Match it.
- Toasts: `const { notify } = useNotification(); notify("success" | "error" | "info"
  | "warning", message, durationMs?)`. `<NotificationContainer />` is mounted once in
  the root layout — don't add another.

## Forms

React Hook Form + `zodResolver`. Schema and inferred type live together in
`features/<name>/schemas/index.ts`:

```ts
export const loginSchema = z.object({ /* ... */ });
export type LoginFormValues = z.infer<typeof loginSchema>;
```

Submit through a React Query mutation and surface results via `notify(...)` plus, for
form-level failures, `setError("root", { message })`. File inputs use a `z.custom<FileList>()`
field with size/type `refine`s (see `profile/schemas`) and are submitted as `FormData`.

## Code style

Prettier-style defaults, applied consistently across the codebase (there is no
committed `.prettierrc`, so keep matching what's already there):

- 2-space indent, double quotes, semicolons, trailing commas, ~100-col width.
- Components: `const Name = (props: NameProps) => { ... }; export default Name;`
  (a few use a named `export const` — follow the file you're editing).
- Props interface named `<Component>Props`, usually
  `extends React.XHTMLAttributes<HTMLXElement>` and spreading `...props` onto the root
  element.
- Hooks: named exports, `useXxx`. Some files also add `export default`.
- `"use client"` only where needed (state, effects, browser APIs, Framer Motion,
  React Query hooks). Route pages and layouts are Server Components by default and
  do `getServerSession` directly.
- Keep imports as `@/...` absolute paths.

## Gotchas / open work

- **Swipes are fire-and-forget.** `MovieStack.handleSwipe` advances the local index
  regardless of whether `POST /api/swipes` succeeded; `useSwipe`'s `onError` only
  toasts + logs. No retry, no rollback. Don't assume a swipe persisted.
- **`hasMore` is discarded** in `useMovies`' `select`. Intended for a future
  prefetch-ahead `useInfiniteQuery`.
- `BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500"` is duplicated in
  `MovieCard.tsx` and `history/HistoryMovieCard.tsx`. If you touch image handling,
  consider hoisting it to `shared`.
- `next.config.ts` only allows `image.tmdb.org` under `images.remotePatterns` — any
  new remote image host must be added there.
- Some commented-out code is intentionally parked (Google/GitHub providers in
  `options.ts`, actors/trailer UI in `MovieInfo.tsx`, `notify` wiring in
  `shared/providers`). Leave it unless the task is to finish that feature.
- Pre-existing spelling in identifiers/copy: `AuthResponce`, `HistoryResponce`,
  "Nicname", "You favourite genres". Don't mass-rename as a drive-by; match the
  existing symbol when editing nearby code.
- `NavbarModule` has a leftover `console.log(pathname)` — safe to remove if you're
  already editing that file.

## Making changes

1. Put new code in the right zone (`shared` for anything reusable, `features/<x>`
   for domain logic, `app` only for routing/layout).
2. Route API calls through `apiClient`; keep server data in React Query.
3. Reuse `shared/ui` primitives and `cn()`; add `dark:` variants.
4. Match the surrounding file's component/style conventions.
5. Before calling it done: `npm run lint` and `npm run build` both clean.
6. Commit messages in this repo are short and lowercase-ish
   (`fixes`, `fix notification`, `Added notifications`, `update version`).
