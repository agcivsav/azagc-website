import { defineField, defineType } from 'sanity'

export const homeNewsSectionObject = defineType({
  name: 'homeNewsSection',
  title: 'News Section',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Label',
      type: 'string',
      initialValue: 'Industry News',
    }),
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'string',
      initialValue: 'Stay Informed',
    }),
    defineField({
      name: 'linkLabel',
      title: 'Link Label',
      type: 'string',
      initialValue: 'All news →',
    }),
    defineField({
      name: 'linkHref',
      title: 'Link URL',
      type: 'string',
      initialValue: '/news-media/',
      description: 'Path to the full news listing page.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Article',
      type: 'object',
      fields: [
        { name: 'tag', title: 'Tag', type: 'string' },
        { name: 'title', title: 'Title', type: 'string' },
        {
          name: 'excerpt',
          title: 'Excerpt',
          type: 'text',
          rows: 3,
        },
        {
          name: 'icon',
          title: 'Icon (emoji or short text)',
          type: 'string',
          initialValue: '⚡',
        },
        {
          name: 'imgSrc',
          title: 'Image URL',
          type: 'string',
          description: 'Full image URL for the featured article background.',
        },
        {
          name: 'imgAlt',
          title: 'Image Alt Text',
          type: 'string',
        },
        {
          name: 'href',
          title: 'Link URL',
          type: 'string',
          description: 'Optional URL for this featured article (e.g. /news-media/article-slug/).',
        },
      ],
      description: 'Content for the large featured news card.',
    }),
    defineField({
      name: 'items',
      title: 'News Items',
      type: 'array',
      of: [
        defineField({
          name: 'item',
          title: 'News Item',
          type: 'object',
          fields: [
            { name: 'tag', title: 'Tag', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            {
              name: 'excerpt',
              title: 'Excerpt',
              type: 'text',
              rows: 2,
            },
            {
              name: 'href',
              title: 'Link URL',
              type: 'string',
              description: 'Optional URL for this news item (e.g. /news-media/article-slug/).',
            },
          ],
        }),
      ],
      description: 'List of news items shown in the right-hand column.',
    }),
  ],
})

