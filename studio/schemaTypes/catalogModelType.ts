import {Icon} from '@sanity/icons'
import {createElement, type ComponentProps} from 'react'
import {defineArrayMember, defineField, defineType} from 'sanity'

const CatalogModelIcon = (props: ComponentProps<'svg'>) =>
  createElement(Icon, {...props, symbol: 'database'})

export const catalogModelType = defineType({
  name: 'catalogModel',
  title: 'Product model library',
  type: 'document',
  icon: CatalogModelIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Model name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Model key',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'brand', title: 'Brand', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'releaseYear', title: 'Release year', type: 'number', validation: (rule) => rule.integer().min(2000).max(2100)}),
    defineField({
      name: 'specs',
      title: 'Verified model specifications',
      description: 'Central model facts. Product editors do not need to re-enter these values.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'catalogModelSpec',
          fields: [
            defineField({name: 'label', title: 'Specification', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'value', title: 'Value', type: 'string', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({name: 'sourceName', title: 'Specification source', type: 'string', description: 'Enter the official manufacturer or support source.', validation: (rule) => rule.required()}),
    defineField({name: 'sourceUrl', title: 'Official specification URL', type: 'url', validation: (rule) => rule.required()}),
    defineField({name: 'sourceUpdatedAt', title: 'Specifications checked at', type: 'datetime'}),
    defineField({name: 'active', title: 'Available in model selector', type: 'boolean', initialValue: true, validation: (rule) => rule.required()}),
    defineField({name: 'sourceKey', title: 'Migration source key', type: 'string', readOnly: true, hidden: true}),
  ],
  preview: {
    select: {title: 'name', category: 'category.label', releaseYear: 'releaseYear'},
    prepare: ({title, category, releaseYear}) => ({
      title,
      subtitle: [category, releaseYear].filter(Boolean).join(' · '),
    }),
  },
})
