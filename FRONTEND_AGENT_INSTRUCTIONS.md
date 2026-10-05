# E-Commerce Frontend Agent Instructions & Implementation Guide

This document serves as a complete, self-contained specification and prompt for an AI code agent to build, refactor, or enhance a high-performance, mobile-first e-commerce web application inspired by Meesho.

---

## 1. Tech Stack & Architectural Principles

- **Framework**: Angular (Standalone Components, No NgModules).
- **Language**: TypeScript (strict mode enabled).
- **Styling**: Pure SCSS with design tokens and modular mixins. **No Tailwind, No Bootstrap, No external component libraries**.
- **State Management**: Angular Signals (`signal`, `computed`) for local and service-level reactive state; RxJS for asynchronous HTTP pipelines.
- **Backend-less API**: Angular `HttpInterceptorFn` intercepting `/api/*` endpoints and serving local static JSON datasets (`assets/mock-api/*`).
- **Responsive Philosophy**: Mobile-first design (tested on 390×844 viewport) that seamlessly scales up to desktop tablets and monitors using media query mixins (`@include up(md)`).

---

## 2. Directory Structure Convention

```text
src/
├── app/
│   ├── core/
│   │   ├── models/            # product.model.ts, review.model.ts, cart.model.ts, etc.
│   │   ├── services/          # product.service.ts, cart.service.ts, toast.service.ts, etc.
│   │   └── interceptors/      # mock-api.interceptor.ts
│   ├── shared/
│   │   └── components/        # header, rating-chip, price-block, bottom-sheet, toast, etc.
│   └── features/
│       ├── home/              # Product catalog, category chips, banner carousel
│       ├── product-details/   # Highlights, Additional Details, Seller, Reviews
│       ├── cart/              # Cart management & price breakdown
│       ├── address/           # Address list & address form
│       ├── payment/           # Payment methods (COD, UPI, Cards)
│       ├── summary/           # Order review
│       └── order-success/     # Order confirmation with celebration state
├── assets/
│   ├── images/                # Local product images organized by folder
│   └── mock-api/              # all-products.json, product-details.json, products.json, etc.
├── styles/
│   ├── _variables.scss        # Colors, fonts, spacing, shadows, radius
│   ├── _mixins.scss           # Breakpoint mixins, flex, scrollbar, truncation
│   ├── _reset.scss            # CSS reset & box-sizing
│   ├── _typography.scss       # Global font definitions
│   └── styles.scss            # Root stylesheet
└── public/
    └── assets/                # Served directly by Vite / Angular dev server
```

---

## 3. Mock Data Pipeline & Asset Setup

### A. Image Normalization & Dev Server Serving
1. **Local Image Storage**: Store product images in `src/assets/images/<category-folder>/<filename>.(webp|avif|jpg)`.
2. **Public Directory Link (Crucial for Vite / Application Builder)**:
   Angular's modern build system serves assets from `public/`. Link or mirror `src/assets/images` to `public/assets/images`:
   ```bash
   # Windows PowerShell / CMD (Directory Junction)
   node -e "const fs = require('fs'), path = require('path'); try { fs.symlinkSync(path.resolve('./src/assets/images'), path.resolve('./public/assets/images'), 'junction'); } catch(e){}"
   ```
3. **Clean Web URLs**:
   Ensure all image paths in the JSON datasets use forward slashes starting with `/assets/images/...`:
   - ❌ Incorrect: `\\src\\assets\\images\\footware\\flipflops.avif`
   - ✅ Correct: `/assets/images/footware/flipflops.avif`

### B. Mock API Interceptor (`mock-api.interceptor.ts`)
Intercept all `/api/*` requests and simulate a production backend:
- `GET /api/products`: Reads `products.json`, supports query params `category`, `gender`, `q` (search), `sort` (price_asc, price_desc, rating_desc), `page`, and `limit`.
- `GET /api/products/:id`: Reads `product-details.json` (indexed object map) with fallback to default product.
- `GET /api/products/:id/reviews`: Returns reviews directly from the product object.
- `GET /api/categories`: Returns category chips list.
- `GET /api/pincodes/:code`: Simulates delivery estimate checker.

```typescript
// Category filtering with slug mapping:
if (category && category !== 'all') {
  list = list.filter(p => {
    if (p.category === category) return true;
    if (category === 'women' && (p.category === 'womens-saree' || p.gender === 'women')) return true;
    if (category === 'men' && (p.category === 'mens-tshirt' || p.category === 'mens-jacket' || p.gender === 'men')) return true;
    if (category === 'electronics' && p.category === 'electronic') return true;
    if (category === 'beauty' && p.category === 'makeup') return true;
    if (category === 'footwear' && p.category === 'footware') return true;
    if (category === 'home' && p.category === 'home-decor') return true;
    return false;
  });
}
```

---

## 4. Product Details Screen — Specific Component Specs

### 1. Sold By (Seller Card)
- **Store Avatar**: Circular lavender background (`#eff2fe`), deep blue storefront SVG icon.
- **Store Name**: Bold title text (`#1e293b`), font-size ~14px.
- **View Shop Button**: Outlined button with 1px border (`$color-primary`), border-radius 4px, font-size 12px, font-weight 600.
- **Store Stats Row**:
  - Left: Light blue pill (`#eef2ff`, text `#2563eb`, font-weight 700) with rating and star icon (`4.3 ★`), and rating count label underneath in muted grey (`#64748b`).
  - Right: Bold product count (`502`) with `Products` label underneath.

### 2. Product Highlights
- **Title Row**: "Product Highlights" (bold, 15px) on left, purple uppercase "COPY" button on right (`(click)="copyHighlights()"`).
- **Attribute Grid**: 2-column CSS Grid (`grid-template-columns: repeat(2, 1fr); gap: 14px 16px;`).
- **Stacked Attribute Items**:
  - Label (`.hl-label`): Muted slate grey (`#64748b`), font-size 12.5px.
  - Value (`.hl-value`): Dark charcoal (`#1e293b`), font-size 13.5px, font-weight 500, placed directly below the label.

### 3. Additional Details Accordion
- **Accordion Header**:
  - Left: "Additional Details" heading.
  - Right: Chevron icon (`^` pointing UP when open, `v` pointing DOWN when closed).
  - Open by default (`isAdditionalDetailsOpen = true`).
- **Specifications Table Layout**:
  - Two-column aligned grid:
    ```scss
    .additional-details-table {
      display: grid;
      grid-template-columns: minmax(130px, 44%) 1fr;
      row-gap: 12px;
      column-gap: 16px;
      margin-top: 14px;
      align-items: baseline;

      @include up(sm) {
        grid-template-columns: 180px 1fr;
      }

      .detail-row {
        display: contents; // Crucial for multi-row aligned column grid

        .detail-key {
          font-size: 13px;
          color: #555e68;
        }

        .detail-val {
          font-size: 13.5px;
          font-weight: 500;
          color: #1e293b;
        }
      }
    }
    ```
- **"More Information" Link**:
  - Text: `More Information` with dashed underline (`border-bottom: 1px dashed #64748b;`).
  - Clicking toggles manufacturer, packaging, and importer compliance details.

### 4. Product Ratings & Reviews Breakdown
- **Score Box**: Big rating score (`4.3 ★`) in bold green (`#038d63`, 32px), with total ratings & reviews stacked underneath.
- **Breakdown Bars**: Progress bars for `Excellent`, `Very Good`, `Good`, `Average`, and `Poor` with corresponding color fills (green, teal, yellow, orange, red) and right-aligned count numbers.

### 5. Sticky Bottom Action Bar
- On mobile viewports, fix to bottom (`position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;`).
- **Add to Cart**: White background, 1.5px solid purple border, purple text and cart SVG icon.
- **Buy Now**: Solid purple background, white bold text with fast-forward arrows (`▶▶ Buy Now`).
- Padding accounts for device safe-area (`padding-bottom: calc(10px + env(safe-area-inset-bottom));`).

---

## 5. Critical UI & Layout Safeguards

1. **Sticky Checkout Bar Width Constraint**:
   On wide screens or centered checkout containers, prevent fixed bottom bars from extending beyond the parent container:
   ```scss
   .sticky-checkout-bar {
     position: fixed;
     bottom: 0;
     left: 50%;
     transform: translateX(-50%);
     width: 100%;
     max-width: 600px;
     box-sizing: border-box;
     z-index: 100;
   }
   ```
2. **Text Truncation**:
   Always pair truncation with `min-width: 0;` on flex parents to prevent layout blowout:
   ```scss
   .product-title {
     min-width: 0;
     display: -webkit-box;
     -webkit-line-clamp: 2;
     -webkit-box-orient: vertical;
     overflow: hidden;
   }
   ```
3. **Template Object Iteration**:
   Use Angular's `keyvalue` pipe to render dynamic key-value attributes from `highlights` and `additionalDetails`:
   ```html
   @for (item of prod.additionalDetails | keyvalue; track item.key) {
     <div class="detail-row">
       <span class="detail-key">{{ item.key }}</span>
       <span class="detail-val">{{ item.value }}</span>
     </div>
   }
   ```

---

## 6. Implementation Checklist for Other Agents

When applying these instructions to another folder or project:
- [ ] 1. **Check Data Schema**: Review source product datasets (e.g., `all-products.json`).
- [ ] 2. **Verify Asset Paths**: Normalize all backslash paths (`\\`) to web-accessible forward slashes (`/assets/...`).
- [ ] 3. **Verify Public Asset Availability**: Ensure `public/assets/images` links or copies to `src/assets/images`.
- [ ] 4. **Generate Indexed Map**: Ensure `product-details.json` provides an O(1) dictionary map (`{ [id]: product }`) so detail lookups are instant.
- [ ] 5. **Update Mock API Interceptor**: Route `/api/products` and `/api/products/:id` through the mock interceptor with proper category mapping.
- [ ] 6. **Apply Component HTML & SCSS**: Build the Sold By, Product Highlights (2-column stacked), and Additional Details (aligned CSS grid) components according to the specs above.
- [ ] 7. **Build & Verify**: Execute `npm run build` to confirm 0 compilation or template errors, and verify local images return HTTP 200.
