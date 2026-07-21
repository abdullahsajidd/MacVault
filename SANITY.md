# MacVault product catalog

Sanity manages category, model-library, and product data. Homepage, policy, contact, navigation, and other page content remain in the Next.js codebase.

## Studio

- Hosted Studio: https://macvault-catalog.sanity.studio/
- Project ID: `9oh8856r`
- Dataset: `production`

Run the Studio locally from the repository root:

```powershell
npm run studio:dev
```

## Catalog workflow

1. Create or edit a category and model in the Studio when the required model is not already available.
2. Create or edit a product, select its product type, and select the matching model.
3. Add the current price in PKR.
4. Add one or more gallery items and provide useful alternative text. Mark internet/model photos as `Reference image`; use `Exact unit` only for current photos of the listed unit.
5. State the exact condition, warranty type, included items, and unit-specific facts in plain language.
6. Set Visibility to `Active` and publish only when the listing is ready for a buyer.
7. Published changes flow into the product listing, category, detail, metadata, and sitemap queries within about 60 seconds.

Use `Hidden` to remove a product or category from the storefront without deleting it.

Do not publish an active product without a price. Reference images can explain a model, but the buyer must receive current photos of the exact unit before payment.

### Editorial baseline

The seven seeded products have a plain-language editorial baseline in `src/data/products.ts`. Migrated Sanity documents carry a stable `sourceKey`, which lets the storefront retain this baseline after property-based slug regeneration. Sanity continues to supply stock status, price, exact-unit properties, and published images. Products created directly in Studio without a migration `sourceKey` use their Sanity content without local enrichment.

The migration is idempotent by `sourceKey`. Keep the local seed and its migrated document aligned when changing editorial content for a seeded listing.

## Environment variables

Add these values to Vercel:

```text
NEXT_PUBLIC_SANITY_PROJECT_ID=9oh8856r
NEXT_PUBLIC_SANITY_DATASET=production
```

The dataset is public and published storefront reads do not require a secret token.

## Maintenance commands

```powershell
npm run studio:build
npm run studio:deploy
npm run sanity:migrate-catalog
npm run sanity:regenerate-slugs
```

The migration is safe to rerun. It looks up imported documents by `sourceKey`, updates existing catalog documents, and uploads images only when a migrated product has no gallery.
