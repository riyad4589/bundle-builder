# Bundle Builder — Frontend Take-Home (Test ID 43661)

A two-column security-system bundle builder: a 4-step accordion on the left, a live order-review panel on the right. Built with React + Vite, no backend required.

## Run it

```bash
npm install
npm run dev
```

Open the printed localhost URL. `npm run build` produces a production build in `dist/`.

Requires Node 18+.

## Where things live

- `src/data/products.json` — all step/product/variant data plus the seed selections (`seedSelections`) used to pre-populate the review panel on first load. The UI renders entirely from this file; adding a product means adding a JSON entry, not new markup.
- `src/hooks/useCart.js` — all cart state: quantities per product+variant, which variant is "active" per card, derived `selectedLines` for the review panel, and localStorage persistence.
- `src/components/` — `Step` (accordion item), `ProductCard`, `QuantityStepper`, `ReviewPanel`, `Icons`.

## Key behaviors

- **Step 1 open by default**, others collapsed. Clicking a header toggles it; "Next: …" advances to the following step.
- **"N selected"** counts distinct products with quantity > 0 in that step (a product with 2 variants both selected still counts once).
- **Variants**: each variant has its own quantity, keyed as `productId:variantId`. Switching the active color on a card only changes which variant's count the stepper displays/edits — it does not touch other variants' counts. The review panel lists every variant with qty > 0 as its own line.
- **Plan step** is single-select: choosing a plan clears any other plan (quantity capped at 1), since only one monitoring plan applies to a system.
- **Save my system for later**: writes the current quantities to `localStorage` on click. On reload/return, the app reads from `localStorage` if present; otherwise it falls back to the seed selections in `products.json`. This is an explicit save, not autosave, per the brief's "configure → save → leave → return" flow.
- **Responsive**: the two columns stack on narrower viewports (review panel moves above the builder), and the product grid drops to a single column on phone widths.

## Decisions & tradeoffs

- **No Figma access at build time** — I could not open the linked Figma file in this environment, so exact pixel values (spacing, radii, the precise palette, icon set) are my own reasonable interpretation of the written spec rather than a 1:1 match. Structure, states, and interactions follow the spec exactly; visual fine-tuning against the real file would be the first thing to revisit.
- **Product content/images** are placeholders (stock photos, invented copy/pricing) since no real catalog was provided — swap `products.json` for the real catalog and the UI needs no changes.
- **Plan modeled as a step with `singleSelect: true`** rather than a separate radio component, so it reuses the same `ProductCard`/stepper code path as every other step.
- **Checkout** is a placeholder `alert()`, as instructed — no real flow behind it.
- Not implemented: server-backed catalog (JSON bonus only), automated tests.
