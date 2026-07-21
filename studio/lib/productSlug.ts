type ProductSlugDetails = Record<string, unknown> | undefined

const PLACEHOLDER_VALUE =
  /^(unknown|n\/a|na|none|varies|tbd|confirm|.*\boptions?\b.*|.*\bto be (confirmed|verified)\b.*)$/i

function meaningful(value: unknown): value is string | number | boolean {
  if (typeof value === 'number' || typeof value === 'boolean') return true
  return typeof value === 'string' && value.trim().length > 0 && !PLACEHOLDER_VALUE.test(value.trim())
}

function slugPart(value: string | number | boolean) {
  return String(value)
    .trim()
    .replace(/battery\s*health/gi, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

function propertyPart(value: unknown, suffix?: string) {
  if (!meaningful(value)) return null
  const part = slugPart(value)
  return part ? `${part}${suffix ?? ''}` : null
}

export function buildProductSlug(
  modelName: string | undefined,
  categoryKey: string | undefined,
  unitDetails: ProductSlugDetails,
) {
  const model = modelName?.replace(/^iphone\s+/i, '').trim()
  const parts = [model && slugPart(model)]

  const storage = propertyPart(unitDetails?.storage)
  if (storage) parts.push(/\d$/.test(storage) ? `${storage}gb` : storage)

  const battery = propertyPart(unitDetails?.batteryHealth)
  if (battery) parts.push(battery)

  const colour = propertyPart(unitDetails?.colour)
  if (colour) parts.push(colour)

  const fieldsByCategory: Record<string, string[]> = {
    iPhone: ['ptaStatus'],
    Mac: ['ram', 'batteryCycleCount', 'keyboardLayout'],
    iPad: ['connectivity'],
    Watch: ['size', 'connectivity'],
    Accessories: ['connector', 'serialStatus'],
    Cables: ['connector', 'cableLength'],
    PlayStation: ['edition'],
  }

  for (const field of fieldsByCategory[categoryKey ?? ''] ?? []) {
    const value = propertyPart(unitDetails?.[field])
    if (value) parts.push(value)
  }

  const slug = parts.filter(Boolean).join('-').replace(/-+/g, '-').slice(0, 96).replace(/-+$/g, '')
  if (!slug) throw new Error('Cannot generate a product slug without a model name.')
  return slug
}

export function withDuplicateSuffix(baseSlug: string, duplicateNumber: number) {
  if (duplicateNumber <= 1) return baseSlug

  const suffix = `-${duplicateNumber}`
  return `${baseSlug.slice(0, 96 - suffix.length).replace(/-+$/g, '')}${suffix}`
}
