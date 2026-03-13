import { defineField, defineType } from 'sanity'

export const homeBottomCtaObject = defineType({
  name: 'homeBottomCta',
  title: 'Bottom CTA Section',
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
      name: 'trustPoints',
      title: 'Trust Points',
      type: 'array',
      of: [{ type: 'string' }],
    
    }),
    defineField({
      name: 'formHeadline',
      title: 'Form Headline',
      type: 'string',
    }),
    defineField({
      name: 'formSubheadline',
      title: 'Form Subheadline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'formSubmitLabel',
      title: 'Form Button Label',
      type: 'string',
    }),
  ],
})

