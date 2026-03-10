import { defineType, defineField } from 'sanity'

export const policyPrioritySchema = defineType({
  name: 'policyPriority',
  title: 'Policy Priority',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "SUPPORT: SRP Coronado Generating Station Repower Project"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 8,
      description: 'Full text shown on the listing (truncated) and on the inner page.',
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name (lucide-react)',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body (block content)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'description' } },
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'displayOrder', direction: 'asc' }] },
    { title: 'Title', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
})
