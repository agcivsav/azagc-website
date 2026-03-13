import { defineField, defineType } from 'sanity'

export const laborHrPageSingleton = defineType({
  name: 'laborHrPage',
  title: 'Labor & HR Page',
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
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Labor & HR', subtitle: 'Industry Resources' }),
  },
})
