import { defineField, defineType } from 'sanity'

export const pageBuilderEventsListObject = defineType({
  name: 'pageBuilderEventsList',
  title: 'Events List Section',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      description: 'Optional heading above the events list (e.g. "Upcoming Events").',
    }),
  ],
  preview: {
    prepare: ({ heading }: { heading?: string }) => ({
      title: 'Events List',
      subtitle: heading || 'Filterable list of upcoming events',
    }),
  },
})
