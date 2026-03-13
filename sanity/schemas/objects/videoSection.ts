import { defineField, defineType } from 'sanity'

export const videoSection = defineType({
  name: 'videoSection',
  title: 'Video Section',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'body',
      title: 'Description',
      type: 'simpleContent',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'videoFile',
      title: 'Upload Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: { heading: 'heading' },
    prepare: ({ heading }) => ({
      title: heading ? `Video: ${heading}` : 'Video',
    }),
  },
})