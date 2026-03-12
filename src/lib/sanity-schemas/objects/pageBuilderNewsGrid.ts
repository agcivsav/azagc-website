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
      name: 'items',
      title: 'Grid items (add details here)',
      type: 'array',
      description:
        'Add grid cards with headline, date, excerpt and link. Leave empty to show latest News Articles instead.',

      of: [
        defineField({
          name: 'newsGridItem',
          type: 'object',

          fields: [
            defineField({
              name: 'headline',
              type: 'string',
              title: 'Headline',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'publishedAt',
              type: 'datetime',
              title: 'Date',
            }),

            defineField({
              name: 'excerpt',
              type: 'text',
              title: 'Excerpt / Snippet',
              rows: 3,
            }),

            defineField({
              name: 'article',
              type: 'reference',
              title: 'Link to News Article (detail page)',
              to: [{ type: 'newsArticle' }],
              description: 'Pick an article — slug is auto from the article, card links to its detail page.',
            }),

            defineField({
              name: 'url',
              type: 'url',
              title: 'Or use external URL',
              description: 'Leave blank if you picked an article above.',
              hidden: ({ parent }) => !!parent?.article,
            }),
          ],

          preview: {
            select: {
              title: 'headline',
            },
            prepare: ({ title }) => ({
              title: title || 'Grid item',
            }),
          },
        }),
      ],
    }),

    defineField({
      name: 'limit',
      title: 'Max number of articles (when not using manual items)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(50),
      description:
        'When "Grid items" above is empty, this many latest News Articles are shown.',
    }),
  ],

  preview: {
    select: {
      heading: 'heading',
      items: 'items',
    },
    prepare: ({ heading, items }) => ({
      title: 'News Grid',
      subtitle: items?.length
        ? `${items.length} manual item(s)`
        : heading || 'Latest from News Articles',
    }),
  },
})