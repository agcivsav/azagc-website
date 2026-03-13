import { defineField, defineType } from 'sanity'

export const industryResourcesPageSingleton = defineType({
  name: 'industryResourcesPage',
  title: 'Industry Resources Page',
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
        { type: 'pageBuilderResourceLinks' },
      ],
      description: 'Add Hero, Text blocks, Two column, Two images, Resource links (text + CTA + link groups).',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Industry Resources',
      subtitle: 'Industry Resources hub page',
    }),
  },
})
