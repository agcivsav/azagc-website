import { defineField, defineType } from 'sanity'

export const committeesPageSingleton = defineType({
  name: 'committeesPage',
  title: 'Committees Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Page Headline',
      type: 'string',
      initialValue: 'Committees',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Intro Paragraph',
      type: 'text',
      rows: 3,
      initialValue:
        'AZAGC committees drive policy, workforce, and industry initiatives. Learn how to get involved.',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Committees Page',
      subtitle: 'About → Committees',
    }),
  },
})
