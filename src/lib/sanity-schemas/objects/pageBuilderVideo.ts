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
      name: 'videoUrl',
      title: 'Video URL',
      type: 'string',
      description: 'YouTube or Vimeo embed URL (e.g. https://www.youtube.com/embed/VIDEO_ID)',
      validation: (R) => R.required(),
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare: ({ heading }: { heading?: string }) => ({ title: heading ? `Video: ${heading}` : 'Video' }),
  },
})
