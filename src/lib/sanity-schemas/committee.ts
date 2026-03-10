import { defineType, defineField } from 'sanity'

export const committeeSchema = defineType({
  name: 'committee',
  title: 'Committee',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Committee Name',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'image',
      title: 'Card Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Image shown on the committee card on the About → Committees page.',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Optional summary for the card (e.g. one line).',
    }),
    defineField({
      name: 'chair',
      title: 'Chair',
      type: 'string',
    }),
    defineField({
      name: 'meetingSchedule',
      title: 'Meeting Schedule',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Card Button Label',
      type: 'string',
      initialValue: 'Learn more',
      description: 'Label for the button on the committee card.',
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'chair', media: 'image' } },
})
