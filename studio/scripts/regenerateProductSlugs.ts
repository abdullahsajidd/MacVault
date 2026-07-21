import {getCliClient} from 'sanity/cli'
import {buildProductSlug, withDuplicateSuffix} from '../lib/productSlug'

type Product = {
  _id: string
  _createdAt: string
  categoryKey?: string
  unitDetails?: Record<string, unknown>
  modelName?: string
  title?: string
}

const client = getCliClient({apiVersion: '2026-07-15'})

async function main() {
  const products = await client.fetch<Product[]>(
    `*[_type == "product" && !(_id in path("drafts.**"))]{_id, _createdAt, title, categoryKey, unitDetails, "modelName": model->name} | order(_createdAt asc)`,
  )

  const counts = new Map<string, number>()
  const updates = products.map((product) => {
    const baseSlug = buildProductSlug(product.modelName, product.categoryKey, product.unitDetails)
    const duplicateNumber = (counts.get(baseSlug) ?? 0) + 1
    counts.set(baseSlug, duplicateNumber)
    return {...product, slug: withDuplicateSuffix(baseSlug, duplicateNumber)}
  })

  console.log('Slug preview:')
  for (const product of updates) console.log(`${product.title || product.modelName || product._id} -> ${product.slug}`)

  if (!updates.length) {
    console.log('No products found.')
    return
  }

  await Promise.all(
    updates.map((product) =>
      client.patch(product._id).set({slug: {_type: 'slug', current: product.slug}}).commit(),
    ),
  )
  console.log(`Regenerated ${updates.length} product slugs.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
