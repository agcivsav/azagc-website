import { defineField, defineType } from 'sanity'

export const erosionControlTrainingPageSingleton = defineType({
  name: 'erosionControlTrainingPage',
  title: 'Erosion Control Coordinator Training Page',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        { type: 'pageBuilderHero' },
        { type: 'pageBuilderCourseCard' },
      ],
      description: 'Add Hero, then one or more Course cards (title, description, details, ENROLL button).',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Erosion Control Coordinator Training',
      subtitle: 'Education & Training → ECC Training',
    }),
  },
})
