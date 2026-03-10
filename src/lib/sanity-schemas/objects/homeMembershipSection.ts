import { defineField, defineType } from 'sanity'

export const homeMembershipSectionObject = defineType({
  name: 'homeMembershipSection',
  title: 'Membership Section',
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
      initialValue: 'Membership',
    }),
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'string',
      initialValue: 'Who Should Join AZAGC?',
    }),
    defineField({
      name: 'body',
      title: 'Body Copy',
      type: 'text',
      rows: 3,
      initialValue:
        "Whether you're a general contractor, specialty sub, or industry supplier — AZAGC membership is built to grow your business and protect your interests.",
    }),
    defineField({
      name: 'cards',
      title: 'Membership Cards',
      type: 'array',
      of: [
        defineField({
          name: 'card',
          title: 'Card',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'href',
              title: 'Link URL',
              type: 'string',
              description: 'Path to the membership detail page (e.g. /membership/contractor/)',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            },
            {
              name: 'image',
              title: 'Card Image',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'imgAlt',
              title: 'Image Alt Text',
              type: 'string',
            },
          ],
        }),
      ],
    }),
  ],
})

