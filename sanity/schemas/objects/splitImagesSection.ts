import { defineField, defineType } from 'sanity'

export const splitImagesSection = defineType({
  name: 'splitImagesSection',
  title: 'Split Images Section',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'leftImage',
      title: 'Left Image',
      type: 'image',
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'leftCaption',
      title: 'Left Image Caption',
      type: 'string',
    }),
    defineField({
      name: 'leftButton',
      title: 'Left CTA (below image)',
      type: 'button',
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: 'rightImage',
      title: 'Right Image',
      type: 'image',
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'rightCaption',
      title: 'Right Image Caption',
      type: 'string',
    }),
    defineField({
      name: 'rightButton',
      title: 'Right CTA (below image)',
      type: 'button',
      options: { collapsible: true, collapsed: true },
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare: ({ heading }: { heading?: string }) => ({
      title: heading ? `Two images: ${heading}` : 'Two images (left & right)',
    }),
  },
})
