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
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Intro Paragraph',
      type: 'text',
      rows: 3,

    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Committees Page',
      subtitle: 'About → Committees',
    }),
  },
})
