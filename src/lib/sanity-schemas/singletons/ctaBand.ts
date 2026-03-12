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
      initialValue: 'Ready to Grow Your Construction Business?',
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
      type: 'text',
      rows: 2,
      initialValue:
        'Join 500+ Arizona contractors. Request a personalized membership overview — no commitment required.',
    }),
    defineField({
      name: 'primaryCtaLabel',
      title: 'Primary button label',
      type: 'string',
      initialValue: 'Become a Member',
    }),
    defineField({
      name: 'primaryCtaHref',
      title: 'Primary button URL',
      type: 'string',
      description: 'Internal path (e.g. /join/) or full URL.',
      initialValue: '/join/',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Secondary button label',
      type: 'string',
      initialValue: 'See Benefits',
    }),
    defineField({
      name: 'secondaryCtaHref',
      title: 'Secondary button URL',
      type: 'string',
      initialValue: '/membership/benefits/',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'CTA Band', subtitle: 'Site-wide call-to-action band' }),
  },
})
