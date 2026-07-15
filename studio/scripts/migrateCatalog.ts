import {createReadStream, existsSync} from 'node:fs'
import {resolve} from 'node:path'
import {getCliClient} from 'sanity/cli'
import {catalogEditorialVersion, categoryDefinitions, products} from '../../src/data/products'

const client = getCliClient({apiVersion: '2026-07-15'})
const root = resolve(process.cwd(), '..')

function keyed<T extends object>(items: T[] | undefined, prefix: string) {
  return (items ?? []).map((item, index) => ({...item, _key: `${prefix}${index}`}))
}

async function upsertCategory(category: (typeof categoryDefinitions)[number], sortOrder: number) {
  const sourceKey = `category:${category.slug}`
  const existing = await client.fetch<{_id: string} | null>(
    `*[_type == "category" && sourceKey == $sourceKey][0]{_id}`,
    {sourceKey},
  )
  const value = {
    _type: 'category',
    sourceKey,
    name: category.category,
    label: category.label,
    pluralLabel: category.pluralLabel,
    slug: {_type: 'slug', current: category.slug},
    sortOrder,
    active: 'active',
  }

  if (existing?._id) {
    await client.patch(existing._id).set(value).commit()
    return existing._id
  }

  return (await client.create(value))._id
}

async function uploadGallery(product: (typeof products)[number]) {
  const gallery = []

  for (const [index, item] of product.gallery.entries()) {
    const relativePath = item.imageUrl.replace(/^\//, '')
    const imagePath = resolve(root, 'public', relativePath)

    if (!existsSync(imagePath)) {
      throw new Error(`Missing product image: ${imagePath}`)
    }

    const asset = await client.assets.upload('image', createReadStream(imagePath), {
      filename: `${product.slug}-${index + 1}.jpg`,
    })

    gallery.push({
      _type: 'productImage',
      _key: `gallery${index}`,
      image: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}},
      kind: item.kind,
      alt: item.imageAlt,
      title: item.title,
      caption: item.caption,
      usage: item.usage,
      sourceUrl: item.sourceUrl,
    })
  }

  return gallery
}

async function upsertProduct(
  product: (typeof products)[number],
  categoryId: string,
  sortOrder: number,
) {
  const sourceKey = `product:${product.slug}`
  const existing = await client.fetch<{_id: string; galleryCount: number} | null>(
    `*[_type == "product" && sourceKey == $sourceKey][0]{_id, "galleryCount": count(gallery)}`,
    {sourceKey},
  )
  const gallery = existing?.galleryCount ? undefined : await uploadGallery(product)
  const value = {
    _type: 'product',
    sourceKey,
    title: product.title,
    shortTitle: product.shortTitle,
    slug: {_type: 'slug', current: product.slug},
    category: {_type: 'reference', _ref: categoryId},
    status: product.status,
    condition: product.condition,
    ...(product.price ? {price: product.price} : {}),
    badge: product.badge,
    accent: product.accent,
    summary: product.summary,
    description: product.description,
    specs: product.specs,
    details: keyed(product.details, 'detail'),
    technicalSpecs: keyed(
      product.technicalSpecs.map(({label, value}) => ({label, value})),
      'spec',
    ),
    listingOptions: keyed(
      product.listingOptions.map(({label, values}) => ({label, values})),
      'option',
    ),
    highlights: product.highlights,
    packageItems: product.packageItems,
    editorialVersion: catalogEditorialVersion,
    ...(gallery ? {gallery} : {}),
    sortOrder,
    visibility: 'active',
  }

  if (existing?._id) {
    await client.patch(existing._id).set(value).commit()
    return existing._id
  }

  return (await client.create(value))._id
}

async function main() {
  const missingImages = products.flatMap((product) =>
    product.gallery
      .map((item) => resolve(root, 'public', item.imageUrl.replace(/^\//, '')))
      .filter((path) => !existsSync(path)),
  )

  if (missingImages.length) {
    throw new Error(`Cannot migrate; missing images:\n${missingImages.join('\n')}`)
  }

  const categoryIds = new Map<string, string>()
  for (const [index, category] of categoryDefinitions.entries()) {
    categoryIds.set(category.category, await upsertCategory(category, index))
  }

  for (const [index, product] of products.entries()) {
    const categoryId = categoryIds.get(product.category)
    if (!categoryId) throw new Error(`Missing category for ${product.title}`)
    const id = await upsertProduct(product, categoryId, index)
    console.log(`Migrated ${product.title} (${id})`)
  }

  const counts = await client.fetch<{categories: number; products: number}>(`{
    "categories": count(*[_type == "category" && active == "active"]),
    "products": count(*[_type == "product" && visibility == "active"])
  }`)
  console.log(`Catalog migration complete: ${counts.categories} categories, ${counts.products} products`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
