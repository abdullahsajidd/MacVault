import {Icon} from '@sanity/icons'
import {createElement, type ComponentProps} from 'react'
import {defineArrayMember, defineField, defineType} from 'sanity'

const ProductIcon = (props: ComponentProps<'svg'>) =>
  createElement(Icon, {...props, symbol: 'package'})

type ProductCategoryKey = 'iPhone' | 'Mac' | 'iPad' | 'Watch' | 'Accessories' | 'PlayStation' | 'Cables'

function isProductType(document: Record<string, unknown> | undefined, categories: ProductCategoryKey[]) {
  return categories.includes(document?.categoryKey as ProductCategoryKey)
}

const onlyFor = (categories: ProductCategoryKey[]) =>
  ({document}: {document?: Record<string, unknown>}) => !isProductType(document, categories)

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: ProductIcon,
  groups: [
    {name: 'listing', title: 'Listing', default: true},
    {name: 'details', title: 'Details'},
    {name: 'images', title: 'Images'},
  ],
  fields: [
    defineField({name: 'title', title: 'Legacy title override', type: 'string', group: 'listing', description: 'Leave blank. The selected model name is the public product name.'}),
    defineField({name: 'shortTitle', title: 'Legacy short title override', type: 'string', group: 'listing', description: 'Leave blank. The selected model name is used everywhere.'}),
    defineField({name: 'slug', title: 'Auto listing slug', type: 'slug', group: 'listing', hidden: true, readOnly: true, options: {source: 'title', maxLength: 96}}),
    defineField({name: 'category', title: 'Auto category', type: 'reference', group: 'listing', to: [{type: 'category'}], hidden: true, readOnly: true}),
    defineField({
      name: 'categoryKey',
      title: 'Product type',
      description: 'Controls which exact-unit fields are shown in this form. The website can derive category from the selected model.',
      type: 'string',
      group: 'listing',
      options: {
        layout: 'radio',
        list: [
          {title: 'iPhone', value: 'iPhone'},
          {title: 'MacBook', value: 'Mac'},
          {title: 'iPad', value: 'iPad'},
          {title: 'Apple Watch', value: 'Watch'},
          {title: 'AirPods and accessories', value: 'Accessories'},
          {title: 'PlayStation', value: 'PlayStation'},
          {title: 'Cables', value: 'Cables'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'model',
      title: 'Model',
      description: 'Select the base model. Fixed specifications come from the model library; listing-specific details go below.',
      type: 'reference',
      group: 'listing',
      to: [{type: 'catalogModel'}],
      options: {
        filter: ({document}) => {
          const categoryKey = document?.categoryKey as string | undefined

          return categoryKey
            ? {filter: 'category->name == $categoryKey && active == true', params: {categoryKey}}
            : {filter: 'active == true'}
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Availability',
      type: 'string',
      group: 'listing',
      options: {
        layout: 'radio',
        list: [
          {title: 'Available', value: 'Available'},
          {title: 'Limited stock', value: 'Limited stock'},
          {title: 'Reserved', value: 'Reserved'},
          {title: 'Sold', value: 'Sold'},
        ],
      },
    }),
    defineField({name: 'condition', title: 'Condition', type: 'string', group: 'listing', validation: (rule) => rule.required()}),
    defineField({
      name: 'price',
      title: 'Current base price (PKR)',
      type: 'number',
      group: 'listing',
      description: 'Required internal price. The website never exposes this exact value and automatically shows Rs 5,000 below to Rs 5,000 above it.',
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({name: 'accent', title: 'Accent colour', type: 'string', group: 'listing', hidden: true, initialValue: '#0a84ff'}),
    defineField({name: 'description', title: 'Product description', type: 'text', rows: 8, group: 'listing', description: 'Write buyer-facing prose only. Do not repeat the model name or specification headings. Model facts and exact-unit details belong in their dedicated fields.', validation: (rule) => rule.required().max(2000)}),
    defineField({
      name: 'unitDetails',
      title: 'Exact unit details',
      description: 'Enter only the product-type fields that can change between individual units. Leave unknown fields blank.',
      type: 'object',
      group: 'details',
      options: {columns: 2},
      fields: [
        defineField({name: 'storage', title: 'Storage', type: 'string', description: 'Example: 128GB or 512GB SSD', hidden: onlyFor(['iPhone', 'Mac', 'iPad', 'PlayStation'])}),
        defineField({name: 'ram', title: 'Installed RAM', type: 'string', hidden: onlyFor(['Mac'])}),
        defineField({name: 'colour', title: 'Colour', type: 'string', hidden: onlyFor(['iPhone', 'Mac', 'iPad', 'Watch'])}),
        defineField({name: 'batteryHealth', title: 'Battery health', type: 'number', description: 'Percentage from 1 to 100', hidden: onlyFor(['iPhone', 'Watch']), validation: (rule) => rule.integer().min(1).max(100)}),
        defineField({name: 'batteryCycleCount', title: 'Battery cycle count', type: 'number', hidden: onlyFor(['Mac']), validation: (rule) => rule.integer().min(0)}),
        defineField({name: 'ptaStatus', title: 'PTA status', type: 'string', hidden: onlyFor(['iPhone']), options: {list: [
          {title: 'PTA approved', value: 'PTA approved'},
          {title: 'Non-PTA', value: 'Non-PTA'},
          {title: 'JV', value: 'JV'},
          {title: 'Factory unlocked', value: 'Factory unlocked'},
          {title: 'Unknown', value: 'Unknown'},
        ]}}),
        defineField({name: 'boxStatus', title: 'Box status', type: 'string', hidden: onlyFor(['iPhone', 'iPad', 'Watch', 'Accessories', 'PlayStation', 'Cables'])}),
        defineField({name: 'warranty', title: 'Warranty', type: 'string'}),
        defineField({name: 'keyboardLayout', title: 'Keyboard layout', type: 'string', hidden: onlyFor(['Mac'])}),
        defineField({name: 'chargerIncluded', title: 'Charger included', type: 'boolean', hidden: onlyFor(['Mac', 'Watch'])}),
        defineField({name: 'connectivity', title: 'Connectivity', type: 'string', description: 'Example: Wi-Fi, Wi-Fi + Cellular, GPS, or Cellular', hidden: onlyFor(['iPad', 'Watch'])}),
        defineField({name: 'size', title: 'Size', type: 'string', description: 'Example: 45mm', hidden: onlyFor(['Watch'])}),
        defineField({name: 'edition', title: 'Edition or version', type: 'string', description: 'Example: Disc, Digital, GPS, or Cellular', hidden: onlyFor(['Watch', 'PlayStation'])}),
        defineField({name: 'controllerIncluded', title: 'Controller included', type: 'boolean', hidden: onlyFor(['PlayStation'])}),
        defineField({name: 'gamesIncluded', title: 'Games included', type: 'array', hidden: onlyFor(['PlayStation']), of: [defineArrayMember({type: 'string'})]}),
        defineField({name: 'connector', title: 'Cable connector type', type: 'string', description: 'Example: USB-C to USB-C', hidden: onlyFor(['Accessories', 'Cables'])}),
        defineField({name: 'cableLength', title: 'Cable length', type: 'string', hidden: onlyFor(['Cables'])}),
        defineField({name: 'serialStatus', title: 'Serial or authenticity status', type: 'string', hidden: onlyFor(['Accessories', 'Cables'])}),
        defineField({name: 'includedItems', title: 'Included items', type: 'array', of: [defineArrayMember({type: 'string'})]}),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Product gallery',
      type: 'array',
      group: 'images',
      of: [defineArrayMember({type: 'object', name: 'productImage', fields: [
        defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, validation: (rule) => rule.required()}),
        defineField({name: 'kind', title: 'Product visual type', type: 'string', hidden: true, options: {list: [
          {title: 'Phone', value: 'phone'},
          {title: 'Laptop', value: 'laptop'},
          {title: 'Tablet', value: 'tablet'},
          {title: 'Watch', value: 'watch'},
          {title: 'Console', value: 'console'},
          {title: 'Audio', value: 'audio'},
        ]}}),
        defineField({name: 'alt', title: 'Alternative text', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'title', title: 'Title', type: 'string', hidden: true}),
        defineField({name: 'caption', title: 'Caption', type: 'string', hidden: true}),
        defineField({name: 'usage', title: 'Image usage', type: 'string', initialValue: 'exact-unit', options: {layout: 'radio', list: [{title: 'Exact unit', value: 'exact-unit'}, {title: 'Reference image', value: 'reference'}]}, validation: (rule) => rule.required()}),
        defineField({name: 'sourceUrl', title: 'Original source URL', type: 'url', hidden: true}),
      ], preview: {select: {title: 'title', subtitle: 'alt', media: 'image'}}})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({name: 'sortOrder', title: 'Display order', type: 'number', group: 'listing', initialValue: 0, validation: (rule) => rule.required().integer().min(0)}),
    defineField({name: 'visibility', title: 'Visibility', type: 'string', group: 'listing', initialValue: 'active', options: {layout: 'radio', list: [{title: 'Active', value: 'active'}, {title: 'Hidden', value: 'hidden'}]}, validation: (rule) => rule.required()}),
    defineField({name: 'editorialVersion', title: 'Editorial version', type: 'string', readOnly: true, hidden: ({value}) => value === undefined}),
    defineField({name: 'sourceKey', title: 'Migration source key', type: 'string', readOnly: true, hidden: ({value}) => value === undefined}),
  ],
  preview: {
    select: {title: 'title', modelName: 'model.name', category: 'category.label', status: 'status', media: 'gallery.0.image'},
    prepare: ({title, modelName, category, status, media}) => ({title: title || modelName || 'Choose a model', subtitle: [category, status].filter(Boolean).join(' · '), media}),
  },
})
