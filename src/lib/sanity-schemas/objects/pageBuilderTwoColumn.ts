import { defineField, defineType } from 'sanity'

export const pageBuilderTwoColumnObject = defineType({
  name: 'pageBuilderTwoColumn',
  title: 'Two Column Section (Image + Text + CTAs)',
  type: 'object',
  options: { collapsible: true, collapsed: false },

  fields: [
    defineField({
      name: 'imagePosition',
      title: 'Image position',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),

    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),

    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 5,
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'ctas',
      title: 'Buttons / Links',
      type: 'array',

      of: [
        defineField({
          name: 'ctaItem',
          type: 'object',

          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Label',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'href',
              type: 'string',
              title: 'URL',
              validation: (Rule) => Rule.required(),
            }),
          ],

          preview: {
            select: { label: 'label' },
            prepare: ({ label }) => ({
              title: label ?? 'CTA',
            }),
          },
        }),
      ],
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