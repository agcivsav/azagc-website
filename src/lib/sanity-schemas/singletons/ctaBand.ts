import { defineField, defineType } from 'sanity'

export const ctaBandSingleton = defineType({
  name: 'ctaBand',
  title: 'CTA Band (site-wide)',
  type: 'document',
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
      rows: 2,
      
    }),
    defineField({
      name: 'primaryCtaLabel',
      title: 'Primary button label',
      type: 'string',
    }),
    defineField({
      name: 'primaryCtaHref',
      title: 'Primary button URL',
      type: 'string',
      description: 'Internal path (e.g. /join/) or full URL.',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Secondary button label',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaHref',
      title: 'Secondary button URL',
      type: 'string',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'CTA Band', subtitle: 'Site-wide call-to-action band' }),
  },
})
