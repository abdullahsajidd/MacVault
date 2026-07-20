import {createReadStream, existsSync} from 'node:fs'
import {resolve} from 'node:path'
import {getCliClient} from 'sanity/cli'
import {catalogEditorialVersion, categoryDefinitions, parseBasePrice, products} from '../../src/data/products'
import {
  catalogModels,
  productModelKeyBySlug,
  productUnitDetailsBySlug,
} from '../../src/data/catalog-models'

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

async function upsertCatalogModel(
  model: (typeof catalogModels)[number],
  categoryId: string,
) {
  const sourceKey = `catalog-model:${model.key}`
  const existing = await client.fetch<{_id: string} | null>(
    `*[_type == "catalogModel" && sourceKey == $sourceKey][0]{_id}`,
    {sourceKey},
  )
  const value = {
    _type: 'catalogModel',
    sourceKey,
    name: model.name,
    slug: {_type: 'slug', current: model.key},
    category: {_type: 'reference', _ref: categoryId},
    brand: model.brand,
    releaseYear: model.releaseYear,
    specs: keyed(model.specs, 'spec'),
    sourceName: model.sourceName,
    sourceUrl: model.sourceUrl,
    sourceUpdatedAt: new Date().toISOString(),
    active: true,
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
  modelId: string,
  sortOrder: number,
) {
  const sourceKey = `product:${product.slug}`
  const existing = await client.fetch<{_id: string; galleryCount: number} | null>(
    `*[_type == "product" && sourceKey == $sourceKey][0]{_id, "galleryCount": count(gallery)}`,
    {sourceKey},
  )
  const gallery = existing?.galleryCount ? undefined : await uploadGallery(product)
  const basePrice = parseBasePrice(product.price)
  const value = {
    _type: 'product',
    sourceKey,
    title: product.title,
    shortTitle: product.shortTitle,
    slug: {_type: 'slug', current: product.slug},
    category: {_type: 'reference', _ref: categoryId},
    categoryKey: product.category,
    model: {_type: 'reference', _ref: modelId},
    unitDetails: productUnitDetailsBySlug[product.slug],
    status: product.status,
    condition: product.condition,
    ...(basePrice ? {price: basePrice} : {}),
    accent: product.accent,
    description: product.description,
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
  const missingPrices = products
    .filter((product) => !parseBasePrice(product.price))
    .map((product) => product.title)

  if (missingPrices.length) {
    throw new Error(`Cannot migrate; missing base prices:\n${missingPrices.join('\n')}`)
  }

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
    const id = await upsertCategory(category, index)
    categoryIds.set(category.category, id)
    console.log(`Migrated category ${category.label} (${id})`)
  }

  const modelIds = new Map<string, string>()
  for (const model of catalogModels) {
    const categoryId = categoryIds.get(model.category)
    if (!categoryId) throw new Error(`Missing category for model ${model.name}`)
    const id = await upsertCatalogModel(model, categoryId)
    modelIds.set(model.key, id)
    console.log(`Migrated model ${model.name} (${id})`)
  }

  for (const [index, product] of products.entries()) {
    const categoryId = categoryIds.get(product.category)
    if (!categoryId) throw new Error(`Missing category for ${product.title}`)
    const modelKey = productModelKeyBySlug[product.slug]
    const modelId = modelIds.get(modelKey)
    if (!modelId) throw new Error(`Missing catalog model for ${product.title}`)
    const id = await upsertProduct(product, categoryId, modelId, index)
    console.log(`Migrated ${product.title} (${id})`)
  }

  const counts = await client.fetch<{categories: number; products: number; models: number}>(`{
    "categories": count(*[_type == "category" && active == "active"]),
    "products": count(*[_type == "product" && visibility == "active"]),
    "models": count(*[_type == "catalogModel" && active == true])
  }`)
  console.log(`Catalog migration complete: ${counts.categories} categories, ${counts.products} products, ${counts.models} models`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
