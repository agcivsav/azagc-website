import { defineField, defineType } from 'sanity'

export const awardSection = defineType({
  name: 'awardSection',
  title: 'Award Section',
  type: 'object',
  options: { collapsible: true, collapsed: false },

  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      // validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'awards',
      title: 'Awards',
      type: 'array',

      of: [
        defineField({
          name: 'awardItem',
          type: 'object',

          fields: [
            defineField({
              name: 'name',
              type: 'string',
              title: 'Person Name',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'awardTitle',
              type: 'string',
              title: 'Award Title',
            }),

            defineField({
              name: 'company',
              type: 'string',
              title: 'Company',
            }),
            defineField({
              name: 'image',
              type: 'image',
              title: 'Image',
              options: { hotspot: true },
            }),
          ],

          preview: {
            select: {
              name: 'name',
              awardTitle: 'awardTitle',
            },
            prepare: ({ name, awardTitle }) => ({
              title: name ?? 'Award Winner',
              subtitle: awardTitle,
            }),
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      heading: 'heading',
    },
    prepare: ({ heading }) => ({
      title: heading ? `Award section: ${heading}` : 'Award section',
    }),
  },
})