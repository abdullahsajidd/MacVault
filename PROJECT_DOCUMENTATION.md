# MacVault Project Documentation

## 1. System Overview

MacVault has two applications in one repository:

- The root Next.js application renders the public storefront.
- `studio/` is the Sanity Studio used to manage categories, model specifications, products, exact-unit properties, and galleries.

The storefront prefers published Sanity content. If a Sanity request fails, it falls back to the checked-in catalog. Migrated records retain richer local editorial sections through `sourceKey`, even after their public slugs change.

## 2. Request And Content Flow

1. `src/app/layout.tsx` obtains the shared catalog and places it in `CatalogProvider` for client components such as the header, footer, and quote modal.
2. Route server components call the cached helpers in `src/sanity/lib/catalog.ts` for their own render and metadata needs.
3. `src/sanity/lib/queries.ts` projects the Sanity schema into the shared `Product` shape.
4. `src/sanity/lib/catalog.ts` normalizes optional arrays, supplies a visual fallback for missing galleries, and enriches migrated products from `src/data/products.ts` by `sourceKey`.
5. Product links always pass through `src/lib/product-routes.ts` for safe URL encoding and decoding.

## 3. Routes

| URL | Purpose |
| --- | --- |
| `/` | Home, featured stock, categories, buyer checks, buying flow, and FAQ. |
| `/about` | Brand story and buying principles. |
| `/contact` | Contact methods and WhatsApp enquiry builder. |
| `/products` | Searchable and filterable complete catalog. |
| `/products/category/[category]` | Category-specific catalog route. |
| `/products/[slug]` | Product gallery, exact-unit facts, expected price, and related products. |
| `/why-us` | Buying process, checks, and policy overview. |
| `/why-buy-from-us` | Permanent redirect to `/why-us`. |
| `/delivery`, `/returns`, `/warranty`, `/privacy`, `/terms` | Policy pages. |
| `/robots.txt`, `/sitemap.xml` | Search-engine discovery endpoints. |

## 4. Sanity Model

- `category`: navigation label, URL slug, order, and visibility.
- `catalogModel`: reusable model name, category, brand, release year, and verified specifications.
- `product`: exact listing with model reference, availability, condition, internal base price, type-specific unit details, gallery, order, and visibility.

The product slug is hidden and generated immediately before publish. It uses model, storage, battery health, colour, and category-specific properties. Existing identical slugs receive an incrementing suffix. Gallery presentation copy is category-based on the website; legacy per-image title, caption, visual type, source URL, and accent fields are hidden from editors.

## 5. Pricing And Availability

The numeric Sanity `price` is an internal base value. The public site displays an expected range of PKR 5,000 below through PKR 5,000 above the base. Buyers are directed to confirm the current amount and exact unit on WhatsApp. Availability is normalized to Available, Limited stock, Reserved, or Sold.

## 6. UI Behavior

- Shared interaction transitions use `300ms ease-out` through the global transition override.
- The 5px top progress line reflects page scroll and temporarily acts as a navigation completion indicator.
- Product filters animate result cards and preserve category/search state in the URL.
- Product galleries use a stable main image plus a horizontally scrollable thumbnail rail when more than three images exist.
- Reduced-motion preferences disable nonessential transitions and animations.

## 7. Operations

Storefront:

```powershell
npm install
npm run dev
npm run lint
npx tsc --noEmit
npm run build
```

Studio:

```powershell
npm install --prefix studio
npm run dev --prefix studio
npm run build --prefix studio
npm run migrate --prefix studio
npm run slugs:regenerate --prefix studio
```

The migration and slug scripts require an authenticated Sanity CLI session with write permission. The reel script additionally requires Python packages `numpy` and `Pillow`, plus FFmpeg on `PATH` or in `FFMPEG_BIN`.

## 8. Complete File Reference

This section accounts for every tracked file and every meaningful untracked source file present during the review. Runtime logs, `.next/`, `node_modules/`, `studio/dist/`, `.git/`, empty tool folders, and `*.tsbuildinfo` are generated state rather than project source.

### Root And Tooling

| File | Responsibility |
| --- | --- |
| `.env.example` | Public Sanity and site URL environment-variable template. |
| `.gitignore` | Root dependency, build, environment, log, and cache exclusions. |
| `eslint.config.mjs` | Next.js TypeScript ESLint configuration and generated-folder exclusions. |
| `next.config.ts` | Next image host allow-list and workspace-root configuration. |
| `package.json` | Storefront dependencies and development/build/lint scripts. |
| `package-lock.json` | Exact storefront dependency graph. |
| `postcss.config.mjs` | Tailwind PostCSS plugin configuration. |
| `README.md` | Setup and project entry point. |
| `SANITY.md` | Sanity setup, migration, publishing, and editorial workflow. |
| `PROJECT_DOCUMENTATION.md` | Architecture, operations, and exhaustive file reference. |
| `tsconfig.json` | Storefront TypeScript compiler options and path aliases. |

### Public Metadata And Generic Assets

| File | Responsibility |
| --- | --- |
| `public/apple-touch-icon.png` | Apple home-screen icon. |
| `public/favicon.ico` | Browser favicon fallback. |
| `public/favicon.svg` | Scalable browser favicon. |
| `public/icon.png` | General 512px application icon. |
| `public/icons/favicon-16x16.png` | 16px favicon. |
| `public/icons/favicon-32x32.png` | 32px favicon. |
| `public/icons/icon-192x192.png` | 192px manifest icon. |
| `public/icons/icon-512x512.png` | 512px manifest icon; intentionally duplicates `public/icon.png`. |
| `public/icons/icon.svg` | Scalable application icon. |
| `public/og/macvault-og.svg` | Default 1200x630 social-sharing artwork. |
| `public/safari-pinned-tab.svg` | Safari mask icon. |
| `public/site.webmanifest` | Installable-site name, colours, and icons. |
| `public/file.svg` | Unused default Next.js starter asset retained for reference. |
| `public/globe.svg` | Unused default Next.js starter asset retained for reference. |
| `public/next.svg` | Unused default Next.js starter asset retained for reference. |
| `public/vercel.svg` | Unused default Next.js starter asset retained for reference. |
| `public/window.svg` | Unused default Next.js starter asset retained for reference. |

### Brand And Hero Assets

| File | Responsibility |
| --- | --- |
| `public/images/brand/macvault-selected-logo.svg` | Active header/footer MacVault wordmark. |
| `public/images/brand/macvault-logo-textual-variations-01.png` | Source sheet of textual logo alternatives. |
| `public/images/brand/macvault-logo-variations-01.png` | Logo exploration sheet 01. |
| `public/images/brand/macvault-logo-variations-02.png` | Logo exploration sheet 02. |
| `public/images/brand/macvault-logo-variations-03.png` | Logo exploration sheet 03. |
| `public/images/brand/macvault-logo-variations-04-macbook.png` | MacBook-themed logo exploration 04. |
| `public/images/brand/macvault-logo-variations-05-macbook.png` | MacBook-themed logo exploration 05. |
| `public/images/light-hero.png` | Alternate light hero artwork; currently unused. |
| `public/images/macbook-hero-bg.png` | Alternate MacBook hero background; currently unused. |
| `public/images/v2-hero.png` | Alternate hero artwork; currently unused. |

### Product Image Assets

| File | Responsibility |
| --- | --- |
| `public/images/products/airpods-pro-2-usb-c-1.jpg` | AirPods Pro reference image 1. |
| `public/images/products/airpods-pro-2-usb-c-2.jpg` | AirPods Pro reference image 2. |
| `public/images/products/airpods-pro-2-usb-c-3.jpg` | AirPods Pro reference image 3. |
| `public/images/products/apple-watch-series-9-1.jpg` | Apple Watch reference image 1. |
| `public/images/products/apple-watch-series-9-2.jpg` | Apple Watch reference image 2. |
| `public/images/products/apple-watch-series-9-3.jpg` | Apple Watch reference image 3. |
| `public/images/products/ipad-pro-m4-11-1.jpg` | iPad Pro reference image 1. |
| `public/images/products/ipad-pro-m4-11-2.jpg` | iPad Pro reference image 2. |
| `public/images/products/ipad-pro-m4-11-3.jpg` | iPad Pro reference image 3; same source image as image 1. |
| `public/images/products/iphone-14-pro-128-1.jpg` | iPhone 14 Pro reference image 1. |
| `public/images/products/iphone-14-pro-128-2.jpg` | iPhone 14 Pro reference image 2. |
| `public/images/products/iphone-14-pro-128-3.jpg` | iPhone 14 Pro reference image 3. |
| `public/images/products/iphone-15-pro-max-256-1.jpg` | iPhone 15 Pro Max reference image 1. |
| `public/images/products/iphone-15-pro-max-256-2.jpg` | iPhone 15 Pro Max reference image 2. |
| `public/images/products/iphone-15-pro-max-256-3.jpg` | iPhone 15 Pro Max reference image 3; same source image as image 1. |
| `public/images/products/macbook-air-m3-13-1.jpg` | MacBook Air reference image 1. |
| `public/images/products/macbook-air-m3-13-2.jpg` | MacBook Air reference image 2. |
| `public/images/products/macbook-air-m3-13-3.jpg` | MacBook Air reference image 3. |
| `public/images/products/macbook-pro-m3-pro-14-1.jpg` | MacBook Pro reference image 1. |
| `public/images/products/macbook-pro-m3-pro-14-2.jpg` | MacBook Pro reference image 2; same source image as MacBook Air image 3. |
| `public/images/products/macbook-pro-m3-pro-14-3.jpg` | MacBook Pro reference image 3; same source image as MacBook Air image 2. |
| `public/images/products/ps5-slim-disc-bundle-1.jpg` | PlayStation 5 reference image 1. |
| `public/images/products/ps5-slim-disc-bundle-2.jpg` | PlayStation 5 reference image 2. |
| `public/images/products/ps5-slim-disc-bundle-3.jpg` | PlayStation 5 reference image 3. |

### App Router Files

| File | Responsibility |
| --- | --- |
| `src/app/favicon.ico` | App Router favicon convention file. |
| `src/app/globals.css` | Complete responsive design system, component styles, transitions, animations, and reduced-motion rules. |
| `src/app/layout.tsx` | Root metadata, structured data, catalog provider, progress bar, analytics, and Sanity Live integration. |
| `src/app/not-found.tsx` | Custom 404 screen. |
| `src/app/page.tsx` | Home route composition. |
| `src/app/about/page.tsx` | About route metadata and shell. |
| `src/app/contact/page.tsx` | Contact route metadata and shell. |
| `src/app/delivery/page.tsx` | Pickup and delivery policy route. |
| `src/app/privacy/page.tsx` | Privacy policy route. |
| `src/app/products/page.tsx` | Complete catalog route and ItemList structured data. |
| `src/app/products/[slug]/page.tsx` | Product detail route, SEO, schemas, gallery, facts, and same-category related products. |
| `src/app/products/category/[category]/page.tsx` | Category route, metadata, static params, and category ItemList schema. |
| `src/app/returns/page.tsx` | Returns and refunds policy route. |
| `src/app/robots.ts` | Robots metadata route. |
| `src/app/sitemap.ts` | Static, category, and product sitemap generation. |
| `src/app/terms/page.tsx` | Terms and Conditions route. |
| `src/app/warranty/page.tsx` | Warranty policy route. |
| `src/app/why-buy-from-us/page.tsx` | Legacy-route redirect. |
| `src/app/why-us/page.tsx` | Why MacVault route and buyer process. |

### Components

| File | Responsibility |
| --- | --- |
| `src/components/about-page-shell.tsx` | Interactive about-page milestones and product-check walkthrough. |
| `src/components/analytics-events.tsx` | Delegated Vercel Analytics events for links, filters, and FAQ interactions. |
| `src/components/catalog-provider.tsx` | Client context for shared products and categories. |
| `src/components/comparison-section.tsx` | MacVault-versus-typical-listing comparison section. |
| `src/components/contact-page-shell.tsx` | Contact-method selector and WhatsApp enquiry form. |
| `src/components/cta.tsx` | Shared animated link/button control. |
| `src/components/home-category-rail.tsx` | Home category navigation rail. |
| `src/components/home-faq.tsx` | Controlled accessible FAQ accordion. |
| `src/components/home-featured-stock.tsx` | Home featured product cards. |
| `src/components/json-ld.tsx` | Safe JSON-LD script renderer. |
| `src/components/layout-classes.ts` | Shared site-container class string. |
| `src/components/policy-page.tsx` | Shared legal/policy page layout. |
| `src/components/product-slider.tsx` | Main product image and scrollable thumbnail gallery. |
| `src/components/product-visual.tsx` | Real product image frame and category-specific placeholder visuals. |
| `src/components/products-page-shell.tsx` | Client catalog search, category/PTA filters, URL state, and cards. |
| `src/components/quote-modal.tsx` | Header quote dialog and WhatsApp message builder. |
| `src/components/reveal-controller.tsx` | Intersection-based reveal classes and hash-scroll correction. |
| `src/components/scroll-progress.tsx` | Scroll progress and route-navigation indicator. |
| `src/components/site-primitives.tsx` | Animated text, tags, and section heading primitives. |
| `src/components/site.tsx` | Header, mobile navigation, brand, and footer. |

### Data And Libraries

| File | Responsibility |
| --- | --- |
| `src/data/catalog-models.ts` | Seeded Apple/Sony model library and exact-unit migration mappings. |
| `src/data/contact.ts` | Central phone, email, and WhatsApp URL helpers. |
| `src/data/faqs.ts` | Buyer FAQ content. |
| `src/data/products.ts` | Product types, local fallback catalog, pricing, badges, templates, and category helpers. |
| `src/lib/product-routes.ts` | Encoded product path creation and defensive route-parameter decoding. |
| `src/lib/seo.ts` | Shared canonical, Open Graph, Twitter, and robots metadata builder. |

### Sanity Runtime Integration

| File | Responsibility |
| --- | --- |
| `src/sanity/env.ts` | Required Sanity project, dataset, and API-version values. |
| `src/sanity/types.ts` | Storefront-facing Sanity category and product types. |
| `src/sanity/lib/catalog.ts` | Cached fetching, fallback, normalization, and editorial enrichment. |
| `src/sanity/lib/client.ts` | CDN-backed Sanity client. |
| `src/sanity/lib/live.ts` | `defineLive` bindings used by server queries and `SanityLive`. |
| `src/sanity/lib/queries.ts` | GROQ category/product projections and slug queries. |

### Sanity Studio

| File | Responsibility |
| --- | --- |
| `studio/.gitignore` | Studio dependencies, build, local state, and log exclusions. |
| `studio/package.json` | Studio dependencies and dev/build/deploy/migration/slug scripts. |
| `studio/package-lock.json` | Exact Studio dependency graph. |
| `studio/sanity.cli.ts` | Sanity CLI project and dataset configuration. |
| `studio/sanity.config.ts` | Studio tools, schemas, and automatic publish-slug action. |
| `studio/tsconfig.json` | Studio TypeScript settings. |
| `studio/lib/productSlug.ts` | URL-safe property slug construction and duplicate suffix logic. |
| `studio/plugins/productSlugAction.ts` | Draft-aware slug generation immediately before product publish. |
| `studio/schemaTypes/index.ts` | Schema export list. |
| `studio/schemaTypes/categoryType.ts` | Category document schema. |
| `studio/schemaTypes/catalogModelType.ts` | Reusable product-model schema. |
| `studio/schemaTypes/productType.ts` | Product listing, exact-unit, gallery, ordering, and visibility schema. |
| `studio/scripts/migrateCatalog.ts` | Idempotent local catalog/category/model/image migration. |
| `studio/scripts/addCategoryProducts.ts` | Idempotent seven-category product seeder with licensed Unsplash reference images. |
| `studio/scripts/regenerateProductSlugs.ts` | Published-product slug preview and regeneration utility. |

### Media Utility And Deliverables

| File | Responsibility |
| --- | --- |
| `scripts/create_instagram_reel.py` | Cross-platform Pillow/NumPy frame renderer and FFmpeg encoder. |
| `artifacts/instagram/macvault-instagram-reel-cover.jpg` | Committed Instagram reel cover generated by the script. |
| `artifacts/instagram/macvault-instagram-reel.mp4` | Committed final Instagram reel. |

## 9. Generated And Local-Only State

- `.next/`: Next.js development/build output.
- `node_modules/` and `studio/node_modules/`: installed dependencies.
- `studio/dist/`: built Sanity Studio.
- `artifacts/next-dev.log` and `artifacts/next-dev.err.log`: current local dev-server logs.
- `next-env.d.ts`: Next.js-generated TypeScript declarations and intentionally ignored.
- `tsconfig.tsbuildinfo`: TypeScript incremental-build cache and intentionally ignored.
- `.agents/` and `.codex/`: currently empty local tool directories.
- `.git/`: repository internals.

## 10. Review Notes

- All inspected JPG, PNG, and ICO files decode successfully. Some seed gallery images intentionally share identical source files; these are called out above.
- Default Next.js SVGs and three alternate hero images are unused and can be removed in a future asset-cleanup change after confirming they are not needed for design history.
- The public catalog still depends on Sanity network availability for current content. The checked-in fallback prevents a hard failure but can become stale unless migrations and local seeds are maintained together.
- Legal text and the shared policy update date should receive owner/legal review before production launch.
