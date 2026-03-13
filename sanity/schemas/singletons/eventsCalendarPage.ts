import { defineField, defineType } from 'sanity'

export const eventsCalendarPageSingleton = defineType({
  name: 'eventsCalendarPage',
  title: 'Events Calendar Page',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'pageBuilderTextBlock' },
        { type: 'pageBuilderEventsList' },
      ],
      description: 'Add Hero, Text blocks, and Events List (filterable list from Events).',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Events Calendar', subtitle: 'Events listing page' }),
  },
})
