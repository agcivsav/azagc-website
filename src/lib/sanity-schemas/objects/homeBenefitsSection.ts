import { defineField, defineType } from 'sanity'

export const homeBenefitsSectionObject = defineType({
  name: 'homeBenefitsSection',
  title: 'Benefits Section',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Label',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Intro Body',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [
        defineField({
          name: 'benefit',
          title: 'Benefit',
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
          ],
        }),
      ],
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'text',
          title: 'Quote Text',
          type: 'text',
          rows: 4,
        }),
        defineField({
          name: 'author',
          title: 'Quote Author',
          type: 'string',
        }),
        defineField({
          name: 'image',
          title: 'Right Panel Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'imageAlt',
          title: 'Image Alt Text',
          type: 'string',
        }),
      ],
    }),
  ],
})

