import { defineField, defineType } from 'sanity'

export const workforceDevelopmentPageSingleton = defineType({
  name: 'workforceDevelopmentPage',
  title: 'Workforce Development Programs Page',
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
      ],
      description: 'Add and reorder sections: Hero, Text block, Two column (image + text + buttons).',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Workforce Development Programs',
      subtitle: 'Education & Training → Workforce Development',
    }),
  },
})
