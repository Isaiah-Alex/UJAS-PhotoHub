# UJAS PhotoHub

Premium photography platform — discover photographers, browse the marketplace, and manage portfolios.


## Stack

- Next.js 15 (App Router)
- React 18
- TypeScript
- Tailwind CSS v4
- shadcn/ui + Radix UI

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) (or the next available port).

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/explore` | Explore photographers |
| `/marketplace` | Photo marketplace |
| `/profile` | Photographer profile |
| `/login` | Sign in |
| `/signup` | Create account |

## Project structure

```
app/
├── (app)/          # Main app shell with navbar
│   ├── layout.tsx
│   ├── page.tsx
│   ├── explore/
│   ├── marketplace/
│   └── profile/
├── (auth)/
│   ├── login/
│   └── signup/
├── globals.css     # Theme CSS variables
└── layout.tsx

components/
├── ui/             # shadcn components
└── photohub/       # App pages and UI

lib/
└── utils.ts        # cn() helper
```

## Theming

Colors are defined as CSS variables in `app/globals.css`. Update `--primary`, `--background`, `--chart-*`, etc. to change the look globally.
