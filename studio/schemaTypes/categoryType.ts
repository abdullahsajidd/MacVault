import {Icon} from '@sanity/icons'
import {createElement, type ComponentProps} from 'react'
import {defineField, defineType} from 'sanity'

const CategoryIcon = (props: ComponentProps<'svg'>) =>
  createElement(Icon, {...props, symbol: 'tag'})

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: CategoryIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Display label',
      type: 'string',
      description: 'For example: MacBook instead of Mac.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pluralLabel',
      title: 'Plural display label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: 'active',
      title: 'Visibility',
      type: 'string',
      initialValue: 'active',
      options: {
        layout: 'radio',
        list: [
          {title: 'Active', value: 'active'},
          {title: 'Hidden', value: 'hidden'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sourceKey',
      title: 'Migration source key',
      type: 'string',
      readOnly: true,
      hidden: ({value}) => value === undefined,
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'slug.current'},
  },
})
