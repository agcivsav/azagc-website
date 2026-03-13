import { defineField, defineType } from 'sanity'

export const safetyPageSingleton = defineType({
  name: 'safetyPage',
  title: 'Safety Page',
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
    prepare: () => ({ title: 'Safety', subtitle: 'Industry Resources' }),
  },
})
