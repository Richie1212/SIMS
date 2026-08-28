# SIMS — Inventory Dashboard

A pharmacy/warehouse inventory management dashboard, built pixel-accurate from
a Figma design as a UI/UX-focused portfolio piece.

## Built from Figma

Every color, spacing value, and border radius in this project was pulled
directly from the source Figma file's design context rather than
approximated from a screenshot — the palette (`app/globals.css`) maps
one-to-one to values used in the design.

## What's here

- [x] Sidebar navigation, sticky on desktop, slide-in drawer on mobile/tablet
- [x] Responsive KPI card row (4 → 2 → 1 columns by breakpoint)
- [x] Inventory-by-category bar chart, stock trend line chart, warehouse
      donut chart (Recharts, styled to match the design's exact color ramp)
- [x] Recent activity feed
- [x] Fully responsive: hamburger menu below `lg`, charts stack on narrow
      viewports instead of overflowing

## Design fidelity notes

- Font: Poppins, weights 400/500/600/700, matching the design exactly
- Color tokens in `app/globals.css` are named semantically (`--color-brand`,
  `--color-success`, etc.) rather than by hex, so future screens built from
  the same Figma file reuse the same tokens
- Card shadows use the exact `rgba` values from the design rather than a
  generic Tailwind shadow utility

## Next

- Build out the Inventory table screen and Add Product form (also present
  in the Figma file) as additional routes
- Wire real data instead of the current mock dataset in `lib/data.ts`
- Add interactivity: filter by category, functioning date range picker

## Getting started

```bash
npm install
npm run dev
```

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Recharts · lucide-react
