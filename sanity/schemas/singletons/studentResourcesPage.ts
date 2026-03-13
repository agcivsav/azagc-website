import { defineField, defineType } from 'sanity'

export const studentResourcesPageSingleton = defineType({
  name: 'studentResourcesPage',
  title: 'Student Resources Page',
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
        { type: 'pageBuilderStaffList' },
        { type: 'pageBuilderVideo' },
      ],
      description: 'Add Hero, Text blocks (with optional button), Two column, Two images, Video, etc.',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Student Resources',
      subtitle: 'Education & Training → Student Resources',
    }),
  },
})
