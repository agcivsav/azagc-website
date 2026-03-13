import { defineField, defineType } from 'sanity'

export const newsMediaPageSingleton = defineType({
  name: 'newsMediaPage',
  title: 'News & Media Page',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'pageBuilderTextBlock' },
        { type: 'pageBuilderTwoColumn' },
        { type: 'pageBuilderTwoImages' },
        { type: 'pageBuilderNewsGrid' },
      ],
      description: 'Add Hero, Text blocks, Two column, Two images, and News Grid (article cards from News Articles).',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'News & Media', subtitle: 'News & Media landing page' }),
  },
})
