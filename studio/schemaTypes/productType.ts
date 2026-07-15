import {Icon} from '@sanity/icons'
import {createElement, type ComponentProps} from 'react'
import {defineArrayMember, defineField, defineType} from 'sanity'

const ProductIcon = (props: ComponentProps<'svg'>) =>
  createElement(Icon, {...props, symbol: 'package'})

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
    defineField({name: 'title', title: 'Title', type: 'string', group: 'listing', validation: (rule) => rule.required()}),
    defineField({name: 'shortTitle', title: 'Short title', type: 'string', group: 'listing', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', group: 'listing', options: {source: 'title', maxLength: 96}, validation: (rule) => rule.required()}),
    defineField({name: 'category', title: 'Category', type: 'reference', group: 'listing', to: [{type: 'category'}], validation: (rule) => rule.required()}),
    defineField({
      name: 'status',
      title: 'Availability',
      type: 'string',
      group: 'listing',
      options: {
        layout: 'radio',
        list: [
          {title: 'Available now', value: 'Available now'},
          {title: 'Low stock', value: 'Low stock'},
          {title: 'Limited units', value: 'Limited units'},
          {title: 'Arriving soon', value: 'Arriving soon'},
          {title: 'Reserved', value: 'Reserved'},
          {title: 'Sold', value: 'Sold'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'condition', title: 'Condition', type: 'string', group: 'listing', validation: (rule) => rule.required()}),
    defineField({name: 'price', title: 'Price', type: 'string', group: 'listing', description: 'Optional display price, for example PKR 345,000.'}),
    defineField({name: 'badge', title: 'Badge', type: 'string', group: 'listing', validation: (rule) => rule.required()}),
    defineField({name: 'accent', title: 'Accent colour', type: 'string', group: 'listing', validation: (rule) => rule.required().regex(/^#[0-9a-fA-F]{6}$/, {name: 'hex colour'})}),
    defineField({name: 'summary', title: 'Summary', type: 'text', rows: 3, group: 'listing', validation: (rule) => rule.required().max(240)}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 5, group: 'details', validation: (rule) => rule.required()}),
    defineField({
      name: 'specs',
      title: 'Quick specifications',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: 'details',
      title: 'Listing details',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'object', name: 'labelValue', fields: [defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}), defineField({name: 'value', type: 'string', validation: (rule) => rule.required()})], preview: {select: {title: 'label', subtitle: 'value'}}})],
    }),
    defineField({
      name: 'technicalSpecs',
      title: 'Technical specifications',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'object', name: 'technicalSpec', fields: [defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}), defineField({name: 'value', type: 'string', validation: (rule) => rule.required()})], preview: {select: {title: 'label', subtitle: 'value'}}})],
    }),
    defineField({
      name: 'listingOptions',
      title: 'Listing options',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'object', name: 'listingOption', fields: [defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}), defineField({name: 'values', type: 'array', of: [defineArrayMember({type: 'string'})], validation: (rule) => rule.required().min(1).unique()})], preview: {select: {title: 'label', values: 'values'}, prepare: ({title, values}) => ({title, subtitle: Array.isArray(values) ? values.join(', ') : ''})}})],
    }),
    defineField({name: 'highlights', title: 'Highlights', type: 'array', group: 'details', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'packageItems', title: 'Package contents', type: 'array', group: 'details', of: [defineArrayMember({type: 'string'})]}),
    defineField({
      name: 'gallery',
      title: 'Product gallery',
      type: 'array',
      group: 'images',
      of: [defineArrayMember({type: 'object', name: 'productImage', fields: [
        defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, validation: (rule) => rule.required()}),
        defineField({name: 'kind', title: 'Product visual type', type: 'string', options: {list: [
          {title: 'Phone', value: 'phone'},
          {title: 'Laptop', value: 'laptop'},
          {title: 'Tablet', value: 'tablet'},
          {title: 'Watch', value: 'watch'},
          {title: 'Console', value: 'console'},
          {title: 'Audio', value: 'audio'},
        ]}, validation: (rule) => rule.required()}),
        defineField({name: 'alt', title: 'Alternative text', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({name: 'caption', title: 'Caption', type: 'string'}),
        defineField({name: 'usage', title: 'Image usage', type: 'string', initialValue: 'exact-unit', options: {layout: 'radio', list: [{title: 'Exact unit', value: 'exact-unit'}, {title: 'Reference image', value: 'reference'}]}, validation: (rule) => rule.required()}),
        defineField({name: 'sourceUrl', title: 'Original source URL', type: 'url'}),
      ], preview: {select: {title: 'title', subtitle: 'alt', media: 'image'}}})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({name: 'sortOrder', title: 'Display order', type: 'number', group: 'listing', initialValue: 0, validation: (rule) => rule.required().integer().min(0)}),
    defineField({name: 'visibility', title: 'Visibility', type: 'string', group: 'listing', initialValue: 'active', options: {layout: 'radio', list: [{title: 'Active', value: 'active'}, {title: 'Hidden', value: 'hidden'}]}, validation: (rule) => rule.required()}),
    defineField({name: 'sourceKey', title: 'Migration source key', type: 'string', readOnly: true, hidden: ({value}) => value === undefined}),
  ],
  preview: {
    select: {title: 'title', category: 'category.label', status: 'status', media: 'gallery.0.image'},
    prepare: ({title, category, status, media}) => ({title, subtitle: [category, status].filter(Boolean).join(' · '), media}),
  },
})
