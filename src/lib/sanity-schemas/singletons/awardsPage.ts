import { defineField, defineType } from 'sanity'

const allPageBuilderSections = [
  { type: 'pageBuilderHero' },
  { type: 'pageBuilderTextBlock' },
  { type: 'pageBuilderTwoColumn' },
  { type: 'pageBuilderTwoImages' },
  { type: 'pageBuilderResourceLinks' },
  { type: 'pageBuilderStaffList' },
  { type: 'pageBuilderVideo' },
  { type: 'pageBuilderCourseCard' },
  { type: 'pageBuilderNewsGrid' },
  { type: 'pageBuilderEventsList' },
  { type: 'pageBuilderTabs' },
  { type: 'teamImageCardSection' },
  { type: 'pageBuilderAwardWinnersList' },
]

export const awardsPageSingleton = defineType({
  name: 'awardsPage',
  title: 'Awards Program Page',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: allPageBuilderSections,
      description:
        'Add Hero, Text, Two column, Two images, Resource links, Staff list, Video, Course card, News grid, Events list, and Tab section (e.g. Awards categories).',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Awards Program',
      subtitle: 'About → Awards Program',
    }),
  },
})
