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
    }),
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'linkLabel',
      title: 'Link Label',
      type: 'string',
    }),
    defineField({
      name: 'linkHref',
      title: 'Link URL',
      type: 'string',
      description: 'Path to the full events calendar page.',
    }),
    defineField({
      name: 'eventReferences',
      title: 'Events (from AGC Events)',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'agcEvent' }],
        },
      ],
      description:
        'Pick up to three events from the Events (AGC Event) documents. If empty, the homepage shows the next upcoming events automatically.',
      validation: (R) => R.max(3),
    }),
    defineField({
      name: 'events',
      title: 'Homepage Events (legacy)',
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
      description: 'Optional manual cards. Ignored when “Events (from AGC Events)” is set.',
      hidden: ({ parent }) =>
        Array.isArray(parent?.eventReferences) && parent.eventReferences.length > 0,
    }),
  ],
})

