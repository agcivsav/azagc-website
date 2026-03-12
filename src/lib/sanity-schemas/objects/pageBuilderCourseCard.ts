import { defineField, defineType } from 'sanity'

export const pageBuilderCourseCardObject = defineType({
  name: 'pageBuilderCourseCard',
  title: 'Course Card Section',
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
      type: 'text',
      rows: 8,
    }),
    defineField({
      name: 'details',
      title: 'Details (right column: schedule, cost, contact)',
      type: 'text',
      rows: 8,
      description: 'Schedule, cost, location, contact info. Shown in the right column.',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button Label',
      type: 'string',
    }),
    defineField({
      name: 'ctaHref',
      title: 'Button URL',
      type: 'string',
      description: 'Enrollment or registration link.',
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare: ({ heading }: { heading?: string }) => ({ title: heading ? `Course: ${heading}` : 'Course card' }),
  },
})
