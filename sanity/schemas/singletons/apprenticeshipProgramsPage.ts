import { defineField, defineType } from 'sanity'

export const apprenticeshipProgramsPageSingleton = defineType({
  name: 'apprenticeshipProgramsPage',
  title: 'Apprenticeship Programs Page',
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
      description: 'Add Hero, Text blocks, Two-column (poster/graphics), Staff list, Video.',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Apprenticeship Programs',
      subtitle: 'Education & Training → Apprenticeship Programs',
    }),
  },
})
