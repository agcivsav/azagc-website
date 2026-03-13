import { defineField, defineType } from 'sanity'

export const splitContentSection = defineType({
  name: 'splitContentSection',
  title: 'Split Content Section',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'heading',
      title: 'Course Title',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'body',
      title: 'Description (left column)',
      type: 'simpleContent',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'details',
      title: 'Details (right column: schedule, cost, contact)',
      type: 'simpleContent',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'button',
      title: 'Button Label',
      type: 'button',
      options: { collapsible: true, collapsed: true },
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare: ({ heading }: { heading?: string }) => ({ title: heading ? `Course: ${heading}` : 'Course card' }),
  },
})
