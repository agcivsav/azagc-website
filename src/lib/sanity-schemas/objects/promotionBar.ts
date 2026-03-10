import { defineField, defineType } from 'sanity'

export const promotionBarObject = defineType({
  name: 'promotionBar',
  title: 'Promotion Bar',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Heading for the red CTA band in the middle of the homepage',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
      description: 'Supporting copy under the promotion heading',
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
      initialValue: 'Get Started Today',
    }),
    defineField({
      name: 'buttonHref',
      title: 'Button Link',
      type: 'string',
      initialValue: '/#join',
    }),
  ],
})

