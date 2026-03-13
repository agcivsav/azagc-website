import { defineField, defineType } from 'sanity'

export const contentSection = defineType({
  name: 'contentSection',
  title: 'Text Block Section',
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
      name: 'button',
      title: 'Button',
      type: 'button',
      options: { collapsible: true, collapsed: true },
    }),


  ],
  preview: {
    select: { heading: 'heading' },
    prepare: ({ heading }: { heading?: string }) => ({ title: heading ? `Text: ${heading}` : 'Text block' }),
  },
})
