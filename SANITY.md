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
3. Upload product images and provide alternative text.
4. Set Visibility to `Active` and publish.
5. Published changes flow into the product listing, category, detail, metadata, and sitemap queries.

Use `Hidden` to remove a product or category from the storefront without deleting it.

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
