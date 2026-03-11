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

export const aboutPageSingleton = defineType({
  name: 'aboutPage',
  title: 'About Us Page',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: allPageBuilderSections,
      description:
        'Add Hero, Text, Two column, Two images, Resource links, Staff list, Video, Course card, News grid, Events list, and Tab section.',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'About Us',
      subtitle: 'About → About Us',
    }),
  },
})
