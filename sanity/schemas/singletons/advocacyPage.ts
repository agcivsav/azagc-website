import { defineField, defineType } from 'sanity'

const allPageBuilderSections = [
  { type: 'hero' },
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

export const advocacyPageSingleton = defineType({
  name: 'advocacyPage',
  title: 'Advocacy Page',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: allPageBuilderSections,
      description: 'Add and reorder page builder sections. Leave empty to show default static content.',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Advocacy',
      subtitle: 'Advocacy',
    }),
  },
})
