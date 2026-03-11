import { defineField, defineType } from 'sanity'

export const transportationInfrastructurePageSingleton = defineType({
  name: 'transportationInfrastructurePage',
  title: 'Transportation & Infrastructure Page',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        { type: 'pageBuilderHero' },
        { type: 'pageBuilderTextBlock' },
        { type: 'pageBuilderTwoColumn' },
        { type: 'pageBuilderTwoImages' },
        { type: 'pageBuilderResourceLinks' },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Transportation & Infrastructure', subtitle: 'Industry Resources' }),
  },
})
