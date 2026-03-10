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
      initialValue: 'Member Benefits',
    }),
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'string',
      initialValue: 'Everything You Get as an AZAGC Member',
    }),
    defineField({
      name: 'trustPoints',
      title: 'Trust Points',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Access to exclusive member events and networking',
        'Legislative advocacy on your behalf in Phoenix & DC',
        'Workforce training and certification programs',
        'Industry research, news, and market intelligence',
        'Discounts on equipment, insurance, and services',
      ],
    }),
    defineField({
      name: 'formHeadline',
      title: 'Form Headline',
      type: 'string',
      initialValue: 'Join AZAGC Today',
    }),
    defineField({
      name: 'formSubheadline',
      title: 'Form Subheadline',
      type: 'text',
      rows: 2,
      initialValue: "We'll reach out within one business day to complete your membership.",
    }),
    defineField({
      name: 'formSubmitLabel',
      title: 'Form Button Label',
      type: 'string',
      initialValue: 'Start My Membership →',
    }),
  ],
})

