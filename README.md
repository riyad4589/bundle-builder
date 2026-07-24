# Bundle Builder
## Frontend Take-Home Assignment
**Test ID:** 43661

A two-column security-system bundle builder: a 4-step accordion on the left, a live order-review panel on the right. Built with React 19 and Vite. The application is fully data-driven, rendering all products and configuration from a local JSON file without requiring a backend.


## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | User Interface |
| JavaScript (ES6+) | Application Logic |
| Vite | Development & Build Tool |
| CSS3 | Styling |
| HTML5 | Markup |
| Local Storage | Client-side Persistence |


## Getting Started

```bash
npm install
npm run dev
```

The development server will be available at the URL displayed in the terminal.

To create a production build:

```bash
npm run build
```

Requires Node 18+.


## Project Structure

```text
bundle-builder/
├── public/
│   ├── 100.png
│   ├── favicon.svg
│   ├── icons.svg
│   └── shipping-icon.png
├── src/
│   ├── assets/
│   │   └── vite.svg
│   ├── components/
│   │   ├── Icons.jsx
│   │   ├── ProductCard.jsx
│   │   ├── QuantityStepper.jsx
│   │   ├── ReviewPanel.jsx
│   │   └── Step.jsx
│   ├── data/
│   │   └── products.json
│   ├── hooks/
│   │   └── useCart.js
│   ├── App.css
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package.json
└── README.md
```

### Where things live

- `src/data/products.json` — all step/product/variant data plus the seed selections (`seedSelections`) used to pre-populate the review panel on first load. The UI renders entirely from this file; adding a product means adding a JSON entry, not new markup.
- `src/hooks/useCart.js` — all cart state: quantities per product+variant, which variant is "active" per card, derived `selectedLines` for the review panel, and localStorage persistence.
- `src/components/` — `Step` (accordion item), `ProductCard`, `QuantityStepper`, `ReviewPanel`, `Icons`.

## Key behaviors

- **Step 1 open by default**, others collapsed. Clicking a header toggles it; "Next: …" advances to the following step.
- **"N selected"** counts distinct products with quantity > 0 in that step (a product with 2 variants both selected still counts once).
- **Variants**: each variant has its own quantity, keyed as `productId:variantId`. Switching the active color on a card only changes which variant's count the stepper displays/edits — it does not touch other variants' counts. The review panel lists every variant with qty > 0 as its own line.
- **Plan step** is single-select: choosing a plan clears any other plan (quantity capped at 1), since only one monitoring plan applies to a system.
- **Auto-Save & Persistence**: State is automatically saved to `localStorage` on any change. On page reload, the application restores the user's previous selection instantly.
- **Responsive**: the two columns stack on narrower viewports (review panel moves above the builder), and the product grid drops to a single column on phone widths.

## Decisions & tradeoffs
- **Product content/images** are placeholders (stock photos, invented copy/pricing) since no real catalog was provided — swap `products.json` for the real catalog and the UI needs no changes.
- **Plan modeled as a step with `singleSelect: true`** rather than a separate radio component, so it reuses the same `ProductCard`/stepper code path as every other step.
- **Checkout** is a placeholder `alert()`, as instructed — no real flow behind it.
- Not implemented: server-backed catalog (JSON bonus only), automated tests.


## Notes

This project was developed as part of the Frontend Take-Home Coding Exercise (Test ID: 43661). The focus was on building a clean, reusable, data-driven React application while matching the provided design and required interactions.
The codebase was organized with reusable components and separated business logic to keep the application easy to maintain and extend.