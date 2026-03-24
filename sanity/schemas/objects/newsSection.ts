import { defineField, defineType } from 'sanity'

export const newsSection = defineType({
  name: 'newsSection',
  title: 'News Grid Section',
  type: 'object',
  options: { collapsible: true, collapsed: false },

  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      description: 'Optional heading above the news grid.',
    }),

    defineField({
      name: 'items',
      title: 'Grid items (add details here)',
      type: 'array',
      description:
        'Add grid cards with headline, date, excerpt and link. Leave empty to show latest News Articles instead.',
      of: [{ type: 'reference', to: [{ type: 'newsArticle' }, { type: 'newsMediaPolicies' }] }],
    }),
  ],

  preview: {
    select: {
      heading: 'heading',
      items: 'items',
    },
    prepare: ({ heading }) => ({
      title: heading ?? 'News Section',
    }),
  },
})