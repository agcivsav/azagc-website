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
    }),
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'linkLabel',
      title: 'Link Label',
      type: 'string',
    }),
    defineField({
      name: 'linkHref',
      title: 'Link URL',
      type: 'string',
      description: 'Path to the full news listing page.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Article (left column)',
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
        },
        defineField({
          name: 'featuredImage',
          title: 'Featured image',
          type: 'image',
          options: { hotspot: true },
          description: 'Background image for the large featured card (upload, not a URL).',
        }),
        defineField({
          name: 'imgAlt',
          title: 'Image alt text',
          type: 'string',
          description: 'Describe the image for screen readers.',
        }),
        {
          name: 'href',
          title: 'Link URL',
          type: 'string',
          description: 'Optional URL for this featured article (e.g. /news-media/article-slug/).',
        },
      ],
      description:
        'Large left card only — upload an image plus title, excerpt, and link here (not pulled from News documents).',
    }),
    defineField({
      name: 'newsReferences',
      title: 'News items (right column, from News)',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'newsArticle' }, { type: 'newsMediaPolicies' }],
        },
      ],
      description:
        'Right-hand list: pick News Articles or Policies. If empty, manual items below are used; if those are empty too, the site shows the latest news.',
    }),
    // defineField({
    //   name: 'items',
    //   title: 'News Items (manual, right column)',
    //   type: 'array',
    //   of: [
    //     defineField({
    //       name: 'item',
    //       title: 'News Item',
    //       type: 'object',
    //       fields: [
    //         { name: 'tag', title: 'Tag', type: 'string' },
    //         { name: 'title', title: 'Title', type: 'string' },
    //         {
    //           name: 'excerpt',
    //           title: 'Excerpt',
    //           type: 'text',
    //           rows: 2,
    //         },
    //         {
    //           name: 'href',
    //           title: 'Link URL',
    //           type: 'string',
    //           description: 'Optional URL for this news item (e.g. /news-media/article-slug/).',
    //         },
    //       ],
    //     }),
    //   ],
    //   description: 'Manual right-column cards when “News items (from News)” is empty.',
    // }),
  ],
})

