import { defineField, defineType } from 'sanity'

export const imageContent = defineType({
  name: 'imageContent',
  title: 'Image Content Section',
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
      title: 'Body',
      type: 'simpleContent',
      validation: (R) => R.required(),
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'button',
      title: 'Button 1',
      type: 'button',
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: 'button2',
      title: 'Button 2',
      type: 'button',
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: 'button3',
      title: 'Button 3',
      type: 'button',
      options: { collapsible: true, collapsed: true },
    }),
  ],

  preview: {
    select: {
      heading: 'heading',
      imagePosition: 'imagePosition',
    },

    prepare: ({ heading, imagePosition }) => ({
      title: heading ? `Two col: ${heading}` : 'Two column',
      subtitle: imagePosition === 'right' ? 'Image right' : 'Image left',
    }),
  },
})