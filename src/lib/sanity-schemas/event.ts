import { defineType, defineField } from 'sanity'

export const eventSchema = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Event Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (R) => R.required() }),
    defineField({ name: 'startDate', title: 'Start Date & Time', type: 'datetime', validation: (R) => R.required() }),
    defineField({ name: 'endDate', title: 'End Date & Time', type: 'datetime' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'locationUrl', title: 'Google Maps URL', type: 'url' }),
    defineField({ name: 'excerpt', title: 'Short Description', type: 'text', rows: 3 }),
    defineField({ name: 'body', title: 'Full Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'coverImage', title: 'Event Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'registrationUrl', title: 'Registration URL', type: 'url' }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['Conference', 'Workshop', 'Networking', 'Rodeo', 'Show', 'Annual Meeting', 'Webinar', 'Other'] } }),
    defineField({ name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false }),
    defineField({ name: 'membersOnly', title: 'Members Only', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'title', subtitle: 'startDate', media: 'coverImage' } },
  orderings: [{ title: 'Upcoming First', name: 'startDateAsc', by: [{ field: 'startDate', direction: 'asc' }] }],
})
