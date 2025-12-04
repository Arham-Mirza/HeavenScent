# HeavenScent · Modern Fragrance Experience

HeavenScent is a single-page, Apple-inspired fragrance storefront built with **Vite + React (JavaScript)**. It highlights trending parfums with cinematic gradients, animated bottle mockups, and an API-driven notes/accords explorer so visitors can understand each composition at a glance.

## Features
- Immersive hero carousel that cycles 5 flagship fragrances with color-synced backgrounds and bottle renders.
- Responsive navigation shell with subtle glassmorphism + luxurious typography.
- Notes & accords panel powered by a lightweight API layer (`/api/fragrance-notes.json`) showcasing pyramids, accords, and projection stats.
- Real-world fragrance lineup (Dior Sauvage Parfum, Valentino Uomo Born In Roma, YSL Libre, Le Labo Santal 33, MFK Baccarat Rouge 540).
- Minimal cart experience with quantity controls and a cash-on-delivery checkout sheet (no payment gateway required).
- Catalog filters by brand, category, and price so visitors can focus on specific profiles instantly.
- Dedicated Fragrances page (via the nav) showcases every available bottle in a quick-shop grid.
- Reviews & ratings section with community quotes plus a lightweight submission form now wrapped in a violet-green glow treatment.
- Newsletter banner, concierge chat shortcuts, and a contact form to capture leads and support questions with matching glass lighting.
- SEO-ready metadata (Open Graph, Twitter, JSON-LD) for improved discovery.
- React Compiler-enabled build for modern optimizations while staying TypeScript-free per requirements.

## Quick Start

```bash
npm install
npm run dev
```

- Local dev server defaults to http://localhost:5173 with hot reload.
- Use `npm run lint` to run ESLint and `npm run build` for a production bundle (served via `npm run preview`).
- Default Node requirement: Vite 7 expects Node ≥ 20.19; current setup compiles on 20.18 but emits a warning.

## API Layer
- Notes data lives at `public/api/fragrance-notes.json` and is fetched client-side via `fetchFragranceProfile` in `src/services/fragranceNotesApi.js`.
- Replace the file or adjust the service to point at any external fragrance database; the UI will adapt automatically as long as the JSON shape stays consistent (`accords`, `notes`, `story`, `rating`).

## Project Structure

```
src/
  components/        # Navigation, carousel, bottle, notes panel
  data/fragrances.js # Carousel metadata + palette definitions
  services/          # API utilities for fragrance details
  App.jsx            # Page composition
```

## Customization Notes
- Update `src/data/fragrances.js` to inject new hero slides or palette tweaks.
- Extend `public/api/fragrance-notes.json` with new IDs to surface richer notes/accords.
- The design system (colors, spacing, typography) lives in `src/App.css` + `src/index.css` for easy theming.
- Bottle mockups now accept transparent PNGs: add your licensed asset to `public/bottles/` and set the `image` field on each entry in `src/data/fragrances.js` to the matching `/bottles/<file>.png` path to display the real bottle in the hero. (Repository excludes branded packshots; drop in cleared assets before launch.)

Enjoy crafting the HeavenScent experience!
