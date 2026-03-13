import { defineField, defineType } from 'sanity'

export const ctaBandSingleton = defineType({
  name: 'ctaBand',
  title: 'CTA Band (site-wide)',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
      type: 'text',

    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'button',
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: 'button2',
      title: 'Button 2',
      type: 'button',
      options: { collapsible: true, collapsed: true },
    }),
  ],
  preview: {
    prepare: () => ({ title: 'CTA Band', subtitle: 'Site-wide call-to-action band' }),
  },
})
