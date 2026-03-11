import { defineField, defineType } from 'sanity'

export const agcOfAmericaEducationPageSingleton = defineType({
  name: 'agcOfAmericaEducationPage',
  title: 'AGC of America Education Page',
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
        { type: 'pageBuilderStaffList' },
        { type: 'pageBuilderVideo' },
        { type: 'pageBuilderCourseCard' },
      ],
      description: 'Add Hero, Text blocks (with optional button), Two column, Two images, Staff list, Video, Course card.',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'AGC of America Education',
      subtitle: 'Education & Training → AGC of America Education',
    }),
  },
})
