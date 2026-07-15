# MacVault product catalog

Sanity manages only product and category data. Homepage, policy, contact, navigation, and other page content remain in the Next.js codebase.

## Studio

- Hosted Studio: https://macvault-catalog.sanity.studio/
- Project ID: `9oh8856r`
- Dataset: `production`

Run the Studio locally from the repository root:

```powershell
npm run studio:dev
```

## Catalog workflow

1. Create or edit a category in the Studio.
2. Create or edit a product and select its category.
3. Add the current price in PKR.
4. Upload at least one current photo of the exact unit and provide useful alternative text.
5. State the exact condition, warranty type, included items, and unit-specific facts in plain language.
6. Set Visibility to `Active` and publish only when the listing is ready for a buyer.
7. Published changes flow into the product listing, category, detail, metadata, and sitemap queries within about 60 seconds.

Use `Hidden` to remove a product or category from the storefront without deleting it.

Do not publish an active product with only reference photos or without a price. Reference images can help explain a model, but they must be labelled and supported by current photos of the exact unit.

### Editorial baseline

The eight seeded products have a versioned plain-language editorial baseline in `src/data/products.ts`. If a Sanity document does not carry the current `catalogEditorialVersion`, the storefront uses this baseline for its title, condition, description, specifications, buyer guidance, package notes, and image captions. Sanity continues to supply stock status, price, and the published images.

The catalog migration writes the complete baseline and its version marker to Sanity. After that, the complete Sanity document becomes authoritative. This keeps the rewritten content visible during migration without allowing a routine price or stock edit on an older document to restore outdated copy.

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
```

The migration is safe to rerun. It looks up imported documents by `sourceKey`, updates existing catalog documents, and uploads images only when a migrated product has no gallery.
