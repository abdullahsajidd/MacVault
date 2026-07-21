# MacVault

MacVault is a Next.js storefront and product-information site for Apple and PlayStation inventory in Lahore. Product content is managed in Sanity Studio, while a checked-in local catalog provides development and outage fallback data.

## Stack

- Next.js 16 App Router, React 19, and TypeScript
- Tailwind CSS 4 plus site-wide styles in `src/app/globals.css`
- Sanity Content Lake and a separate Studio in `studio/`
- Lucide icons and Vercel Analytics
- Optional Python/Pillow/FFmpeg reel renderer

## Local Development

1. Copy `.env.example` to `.env.local` and provide the Sanity values.
2. Install the storefront dependencies with `npm install`.
3. Start the storefront with `npm run dev` and open `http://localhost:3000`.
4. Install Studio dependencies with `npm install --prefix studio`.
5. Start Studio with `npm run dev --prefix studio`.

Useful checks:

```powershell
npm run lint
npx tsc --noEmit
npm run build
npm run typecheck --if-present --prefix studio
```

## Content Flow

The website reads published categories and products through `src/sanity/lib/catalog.ts`. Sanity is the primary source. `src/data/products.ts` supplies fallback records and editorial detail for migrated products, linked by each document's `sourceKey`. React request caching deduplicates repeated catalog reads from layouts, metadata, and pages.

Product slugs are generated during Studio publish from the model and exact-unit properties. Duplicate listings receive `-2`, `-3`, and later suffixes. Percent signs are intentionally omitted so the resulting paths remain URL-safe.

See [SANITY.md](SANITY.md) for CMS operations and [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md) for architecture, routes, data behavior, maintenance notes, and the complete per-file reference.
