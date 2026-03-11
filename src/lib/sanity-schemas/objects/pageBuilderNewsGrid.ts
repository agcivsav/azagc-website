import { defineField, defineType } from 'sanity'

export const pageBuilderNewsGridObject = defineType({
  name: 'pageBuilderNewsGrid',
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
      name: 'limit',
      title: 'Max number of articles',
      type: 'number',
      initialValue: 24,
      validation: (R) => R.min(1).max(50),
      description: 'Number of latest articles to show (default 24).',
    }),
  ],
  preview: {
    prepare: ({ heading }: { heading?: string }) => ({
      title: 'News Grid',
      subtitle: heading || 'Latest articles from News Articles',
    }),
  },
})
