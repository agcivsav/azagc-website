import { defineField, defineType } from 'sanity'

export const homeEventsSectionObject = defineType({
  name: 'homeEventsSection',
  title: 'Events Section',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Label',
      type: 'string',
      initialValue: 'Upcoming Events',
    }),
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'string',
      initialValue: 'Connect & Grow',
    }),
    defineField({
      name: 'linkLabel',
      title: 'Link Label',
      type: 'string',
      initialValue: 'View full calendar →',
    }),
    defineField({
      name: 'linkHref',
      title: 'Link URL',
      type: 'string',
      initialValue: '/events/',
      description: 'Path to the full events calendar page.',
    }),
    defineField({
      name: 'events',
      title: 'Homepage Events',
      type: 'array',
      of: [
        defineField({
          name: 'event',
          title: 'Event',
          type: 'object',
          fields: [
            { name: 'month', title: 'Month (short, e.g. Feb)', type: 'string' },
            { name: 'day', title: 'Day (e.g. 27)', type: 'string' },
            { name: 'tag', title: 'Tag', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            },
            {
              name: 'href',
              title: 'Link URL',
              type: 'string',
              description: 'Optional URL for this event card (e.g. /events/event-slug/).',
            },
          ],
        }),
      ],
      description: 'Events as they should appear in the homepage grid.',
    }),
  ],
})

