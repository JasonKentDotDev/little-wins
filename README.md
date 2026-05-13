# Little Wins

Little Wins is a mobile-first Progressive Web App for couples and families who want household chores to feel more collaborative, visible, and emotionally rewarding. It turns home tasks into a cozy Agile-style sprint board with satisfying checklist interactions, gentle animations, local persistence, and PWA install support.

## Product vision

Little Wins is designed to feel like a warm, colorful, home-life version of a kanban board—not corporate project management software. The app centers on small accomplishments throughout the day:

- **Backlog** is the household chore list.
- **Sprint** is today.
- Tasks move across a swipe-friendly board from **Backlog** to **Done**.
- Checklist completion, progress, and tiny celebrations reinforce momentum.

## Features

- **Mobile-first kanban board** with six columns:
  - Backlog
  - To Do
  - In Progress
  - On Hold
  - Spouse Review
  - Done
- **Drag-and-drop task movement** powered by `dnd-kit`.
- **Task cards** with title, description, checklist, assignee, priority, estimate, and emoji.
- **Animated checklist completion** with progress bars, strikethroughs, and completion microcopy.
- **Daily sprint flow** with a “Start New Day” action that archives completed work and moves unfinished sprint tasks back into today.
- **Quick add** for fast task capture from the hero area or any column.
- **Completion rewards** with a tasteful confetti burst and encouragement copy.
- **Dark mode** with system preference support, manual toggle, and persistent preference through `next-themes`.
- **Offline-first local persistence** using IndexedDB through `idb-keyval`, with localStorage as a fallback.
- **PWA install support** with manifest metadata, service worker caching, SVG app icon, and iPhone-friendly Apple web app metadata.
- **Accessibility-minded UI** with large tap targets, keyboard drag sensor support, visible focus rings, high-contrast states, and reduced-motion handling.

## Tech stack

- [Next.js](https://nextjs.org/) App Router
- React
- TypeScript
- Tailwind CSS
- shadcn-style UI primitives
- `dnd-kit` for drag-and-drop
- Framer Motion for animations
- Zustand for client state
- `idb-keyval` for IndexedDB persistence
- `next-themes` for theme preference management

## Project structure

```text
app/                    Next.js App Router entry points and global styles
components/             App shell, board, cards, theme, PWA boot, and UI primitives
components/board/       Kanban board, columns, and quick-add form
components/cards/       Task card and checklist interactions
components/ui/          Reusable shadcn-style UI primitives
hooks/                  Client hooks such as service worker registration
lib/                    Columns, seed data, persistence helpers, and utilities
public/                 PWA manifest, service worker, SVG icon, and screenshot asset
store/                  Zustand task store and sprint actions
types/                  Shared TypeScript models
```

## Getting started

### Prerequisites

- Node.js 20 or newer is recommended.
- npm, pnpm, yarn, or another Node package manager.

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm run start
```

## Available scripts

```bash
npm run dev        # Start the local Next.js development server
npm run build      # Build the production app
npm run start      # Serve the production build
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript without emitting files
```

## PWA notes

- The manifest lives at `public/manifest.json`.
- The service worker lives at `public/sw.js` and is registered in production by `hooks/use-service-worker.ts`.
- The app shell caches `/`, `/manifest.json`, and `/icons/icon.svg` for offline access.
- The app uses SVG assets only so the repository avoids binary icon files.
- For best iPhone testing, build and serve the production app over HTTPS, then use Safari’s **Add to Home Screen** flow.

## Data and persistence

The app currently has no backend. Tasks and daily archives are stored locally:

1. IndexedDB via `idb-keyval` is preferred.
2. localStorage is written as a fallback.

The state layer is isolated in `store/use-task-store.ts` and persistence helpers live in `lib/persistence.ts`, which should make future Supabase or Firebase sync easier to add.

## Development notes

- The UI is intentionally optimized for iPhone-sized screens first, then expands responsively.
- Dark mode should remain cozy and rich rather than pure black.
- Keep new interactions tactile but subtle; respect `prefers-reduced-motion`.
- Avoid adding binary assets to the repository unless there is a strong product reason and reviewer approval.

## Current limitations

- There is no authentication or multi-device sync yet.
- Daily sprint archival is local to the browser.
- Service worker registration is production-only to avoid development cache confusion.
