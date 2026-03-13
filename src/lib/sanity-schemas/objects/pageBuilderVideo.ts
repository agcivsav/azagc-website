import { defineField, defineType } from 'sanity'

export const pageBuilderVideoObject = defineType({
  name: 'pageBuilderVideo',
  title: 'Video Section',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Description',
      type: 'text',
      rows: 4,
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