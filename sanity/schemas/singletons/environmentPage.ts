import { defineField, defineType } from 'sanity'

export const environmentPageSingleton = defineType({
  name: 'environmentPage',
  title: 'Environment Page',
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
    prepare: () => ({ title: 'Environment', subtitle: 'Industry Resources' }),
  },
})
