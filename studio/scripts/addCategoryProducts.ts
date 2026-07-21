import {getCliClient} from 'sanity/cli'
import {buildProductSlug, withDuplicateSuffix} from '../lib/productSlug'

type SeedProduct = {
  key: string
  categoryKey: string
  modelSlug: string
  title: string
  shortTitle: string
  status: string
  condition: string
  price: number
  accent: string
  description: string
  unitDetails: Record<string, unknown>
  imagePages: string[]
}

const client = getCliClient({apiVersion: '2026-07-15'})

const products: SeedProduct[] = [
  {
    key: 'iphone-13-128-blue',
    categoryKey: 'iPhone',
    modelSlug: 'iphone-13',
    title: 'iPhone 13 128GB Blue',
    shortTitle: 'iPhone 13',
    status: 'Available',
    condition: 'Used - excellent',
    price: 145000,
    accent: '#0a84ff',
    description: 'A clean iPhone 13 with 128GB storage in Blue. Confirm the current battery reading, PTA status, physical condition, included items, and exact-unit photos before payment.',
    unitDetails: {
      storage: '128GB',
      colour: 'Blue',
      batteryHealth: 88,
      ptaStatus: 'PTA approved',
      boxStatus: 'Phone only',
      warranty: '7-day checking warranty',
      includedItems: ['iPhone unit', 'Charging cable'],
      notes: 'Confirm Face ID, True Tone, cameras, speakers, microphones, and charging before payment.',
    },
    imagePages: [
      'https://unsplash.com/photos/a-cell-phone-with-a-picture-of-a-palm-tree-aBobRTxKsaI',
      'https://unsplash.com/photos/a-close-up-of-a-person-holding-a-cell-phone-KX_7S9bXYjY',
    ],
  },
  {
    key: 'macbook-air-m2-8-256-midnight',
    categoryKey: 'Mac',
    modelSlug: 'macbook-air-m2-13',
    title: 'MacBook Air M2 13-inch 8GB 256GB',
    shortTitle: 'Air M2 13-inch',
    status: 'Available',
    condition: 'Open-box',
    price: 235000,
    accent: '#34c759',
    description: 'A lightweight Midnight MacBook Air with the Apple M2 chip, 8GB unified memory, and 256GB SSD. Confirm the battery cycle count, charger, keyboard, warranty, and exact-unit photos.',
    unitDetails: {
      storage: '256GB SSD',
      ram: '8GB',
      colour: 'Midnight',
      batteryCycleCount: 42,
      keyboardLayout: 'US English',
      chargerIncluded: true,
      warranty: '7-day checking warranty',
      includedItems: ['MacBook Air', 'USB-C power adapter', 'Charging cable'],
    },
    imagePages: [
      'https://unsplash.com/photos/macbook-air-l1l_K19tc8A',
      'https://unsplash.com/photos/bICMnELLIHw',
    ],
  },
  {
    key: 'ipad-air-m4-11-256-space-gray',
    categoryKey: 'iPad',
    modelSlug: 'ipad-air-m4-11',
    title: 'iPad Air M4 11-inch 256GB',
    shortTitle: 'iPad Air M4',
    status: 'Available',
    condition: 'Open-box',
    price: 285000,
    accent: '#af52de',
    description: 'An 11-inch iPad Air with the M4 chip, 256GB storage, and Wi-Fi connectivity. Confirm the screen and body condition, compatible accessories, warranty, and exact-unit photos.',
    unitDetails: {
      storage: '256GB',
      colour: 'Space Gray',
      connectivity: 'Wi-Fi',
      boxStatus: 'Open box',
      warranty: 'Apple warranty - confirm remaining coverage',
      includedItems: ['iPad Air', 'USB-C cable', 'Power adapter'],
    },
    imagePages: [
      'https://unsplash.com/photos/space-gray-ipad-pro-A5Z9g4xP6Yw',
      'https://unsplash.com/photos/a-tablet-sitting-on-top-of-a-table-96BmB7GqrYA',
    ],
  },
  {
    key: 'watch-series-10-46-gps-jet-black',
    categoryKey: 'Watch',
    modelSlug: 'watch-series-10',
    title: 'Apple Watch Series 10 46mm GPS',
    shortTitle: 'Watch Series 10',
    status: 'Available',
    condition: 'Open-box',
    price: 125000,
    accent: '#ff375f',
    description: 'A 46mm GPS Apple Watch Series 10 in Jet Black. Confirm battery health, case and display condition, band size, charger, warranty, and exact-unit photos before payment.',
    unitDetails: {
      colour: 'Jet Black',
      batteryHealth: 100,
      size: '46mm',
      connectivity: 'GPS',
      boxStatus: 'Open box',
      warranty: 'Apple warranty - confirm remaining coverage',
      chargerIncluded: true,
      includedItems: ['Apple Watch', 'Sport Band', 'Magnetic charging cable'],
    },
    imagePages: [
      'https://unsplash.com/photos/a-close-up-of-an-apple-watch-on-a-black-background-GYagM_VZyNE',
      'https://unsplash.com/photos/apple-watch-5qMN7iXbUsk',
    ],
  },
  {
    key: 'airpods-4-anc-usb-c',
    categoryKey: 'Accessories',
    modelSlug: 'airpods-4-anc',
    title: 'AirPods 4 with Active Noise Cancellation',
    shortTitle: 'AirPods 4 ANC',
    status: 'Available',
    condition: 'Sealed',
    price: 68500,
    accent: '#5ac8fa',
    description: 'Sealed AirPods 4 with Active Noise Cancellation and a USB-C charging case. Confirm serial status, seal, warranty coverage, included items, and current package photos.',
    unitDetails: {
      connector: 'USB-C charging case',
      serialStatus: 'Serial to be verified before payment',
      boxStatus: 'Sealed box',
      warranty: 'Apple warranty - confirm activation status',
      includedItems: ['AirPods 4', 'USB-C charging case', 'Documentation'],
    },
    imagePages: [
      'https://unsplash.com/photos/apple-airpods-U1-pZAXmRmM',
      'https://unsplash.com/photos/white-apple-airpods-in-box-oTkAX3MAerc',
    ],
  },
  {
    key: 'ps5-slim-digital-1tb',
    categoryKey: 'PlayStation',
    modelSlug: 'ps5-slim-digital',
    title: 'PlayStation 5 Slim Digital Edition 1TB',
    shortTitle: 'PS5 Slim Digital',
    status: 'Available',
    condition: 'Open-box',
    price: 165000,
    accent: '#0070d1',
    description: 'A slim Digital Edition PlayStation 5 with 1TB storage and one DualSense controller. Confirm region, seals, controller condition, warranty, included cables, and exact-unit photos.',
    unitDetails: {
      storage: '1TB SSD',
      edition: 'Digital Edition',
      controllerIncluded: true,
      boxStatus: 'Open box',
      warranty: '7-day checking warranty',
      includedItems: ['PS5 Slim console', 'DualSense controller', 'HDMI cable', 'Power cable'],
    },
    imagePages: [
      'https://unsplash.com/photos/a-playstation-5-console-with-its-controller--8xeF0LeUtI',
      'https://unsplash.com/photos/white-playstation-five-console-and-controller-ads33nL7V4k',
    ],
  },
  {
    key: 'usb-c-charge-cable-1m',
    categoryKey: 'Cables',
    modelSlug: 'usb-c-charge-cable-1m',
    title: 'Apple USB-C Charge Cable 1m',
    shortTitle: 'USB-C Cable 1m',
    status: 'Available',
    condition: 'Sealed',
    price: 6500,
    accent: '#ff9f0a',
    description: 'A one-metre USB-C charge cable for compatible Apple devices and USB-C power adapters. Confirm packaging, authenticity, power compatibility, warranty, and current package photos.',
    unitDetails: {
      connector: 'USB-C to USB-C',
      cableLength: '1m',
      serialStatus: 'Packaging and authenticity to be verified',
      boxStatus: 'Sealed retail packaging',
      warranty: '7-day checking warranty',
      includedItems: ['1m USB-C charge cable'],
    },
    imagePages: [
      'https://unsplash.com/photos/black-usb-cable-on-white-table-RWxeE7wu1T8',
    ],
  },
]

function decodeHtml(value: string) {
  return value.replaceAll('&amp;', '&').replaceAll('&#x2F;', '/')
}

async function imageUrlFromPage(pageUrl: string) {
  const response = await fetch(pageUrl)
  if (!response.ok) throw new Error(`Could not load image page ${pageUrl}: ${response.status}`)
  const html = await response.text()
  const match =
    html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i) ??
    html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:image"/i)

  if (!match?.[1]) throw new Error(`No Open Graph image found at ${pageUrl}`)

  const url = new URL(decodeHtml(match[1]))
  url.search = ''
  url.searchParams.set('auto', 'format')
  url.searchParams.set('fit', 'crop')
  url.searchParams.set('w', '1400')
  url.searchParams.set('q', '85')
  return url.toString()
}

async function uploadGallery(product: SeedProduct) {
  const gallery = []

  for (const [index, pageUrl] of product.imagePages.entries()) {
    const imageUrl = await imageUrlFromPage(pageUrl)
    const response = await fetch(imageUrl)
    if (!response.ok) throw new Error(`Could not download ${imageUrl}: ${response.status}`)
    const asset = await client.assets.upload('image', Buffer.from(await response.arrayBuffer()), {
      filename: `${product.key}-${index + 1}.jpg`,
      contentType: response.headers.get('content-type') ?? 'image/jpeg',
    })

    gallery.push({
      _type: 'productImage',
      _key: `reference${index + 1}`,
      image: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}},
      alt: `${product.title} reference view ${index + 1}`,
      usage: 'reference',
      sourceUrl: pageUrl,
    })
  }

  return gallery
}

async function main() {
  const categories = await client.fetch<Array<{_id: string; name: string}>>(
    '*[_type == "category" && active == "active"]{_id,name}',
  )
  const models = await client.fetch<Array<{_id: string; slug: string; name: string}>>(
    '*[_type == "catalogModel" && active == true]{_id,"slug":slug.current,name}',
  )
  const usedSlugs = new Set(
    await client.fetch<string[]>(
      '*[_type == "product" && !(_id in path("drafts.**")) && defined(slug.current)].slug.current',
    ),
  )
  const highestSortOrder = await client.fetch<number>(
    'coalesce(*[_type == "product"] | order(sortOrder desc)[0].sortOrder, 0)',
  )

  for (const [index, product] of products.entries()) {
    const id = `internet-seed-${product.key}`
    const category = categories.find((item) => item.name === product.categoryKey)
    const model = models.find((item) => item.slug === product.modelSlug)
    if (!category) throw new Error(`Missing category ${product.categoryKey}`)
    if (!model) throw new Error(`Missing model ${product.modelSlug}`)

    const previous = await client.getDocument<{
      gallery?: unknown[]
      slug?: {current?: string}
      sortOrder?: number
    }>(id)
    if (previous?.slug?.current) usedSlugs.delete(previous.slug.current)
    const baseSlug = buildProductSlug(model.name, product.categoryKey, product.unitDetails)
    let duplicateNumber = 1
    while (usedSlugs.has(withDuplicateSuffix(baseSlug, duplicateNumber))) duplicateNumber += 1
    const slug = withDuplicateSuffix(baseSlug, duplicateNumber)
    usedSlugs.add(slug)
    const gallery = previous?.gallery?.length ? previous.gallery : await uploadGallery(product)

    await client.createOrReplace({
      _id: id,
      _type: 'product',
      sourceKey: `internet-seed:${product.key}`,
      title: product.title,
      shortTitle: product.shortTitle,
      slug: {_type: 'slug', current: slug},
      category: {_type: 'reference', _ref: category._id},
      categoryKey: product.categoryKey,
      model: {_type: 'reference', _ref: model._id},
      status: product.status,
      condition: product.condition,
      price: product.price,
      accent: product.accent,
      description: product.description,
      unitDetails: product.unitDetails,
      gallery,
      sortOrder: previous?.sortOrder ?? highestSortOrder + index + 1,
      visibility: 'active',
    })
    console.log(`${product.categoryKey}: ${product.title} -> ${slug}`)
  }

  console.log(`Added or updated ${products.length} published products.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
