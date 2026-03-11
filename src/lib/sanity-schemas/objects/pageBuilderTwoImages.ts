import { defineField, defineType } from 'sanity'

export const pageBuilderTwoImagesObject = defineType({
  name: 'pageBuilderTwoImages',
  title: 'Two Images Section (Left & Right)',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'leftImage',
      title: 'Left Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'leftCaption',
      title: 'Left Image Caption',
      type: 'string',
    }),
    defineField({
      name: 'rightImage',
      title: 'Right Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'rightCaption',
      title: 'Right Image Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare: ({ heading }: { heading?: string }) => ({
      title: heading ? `Two images: ${heading}` : 'Two images (left & right)',
    }),
  },
})
