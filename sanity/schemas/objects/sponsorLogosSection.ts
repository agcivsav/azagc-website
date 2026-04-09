import { defineArrayMember, defineField, defineType } from 'sanity'

export const sponsorLogosSection = defineType({
  name: 'sponsorLogosSection',
  title: 'Sponsor / partner logos',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section heading',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'description',
      title: 'Intro text (optional)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'columns',
      title: 'Logos per row (desktop)',
      type: 'string',
      initialValue: '3',
      options: {
        list: [
          { title: '2', value: '2' },
          { title: '3', value: '3' },
          { title: '4', value: '4' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      options: {
        layout: 'grid',
        sortable: true,
      },
      validation: (R) => R.min(1),
      of: [
        defineArrayMember({
          name: 'sponsorLogo',
          title: 'Sponsor logo',
          type: 'object',
          fields: [
            defineField({
              name: 'logo',
              title: 'Logo image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              description: 'Describe the logo for accessibility (e.g. company name).',
              // validation: (R) => R.required(),
            }),
            defineField({
              name: 'url',
              title: 'Link URL',
              type: 'string',
              description: 'Internal path (e.g. /about/) or full https://… URL.',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'openInNewTab',
              title: 'Open in new tab',
              type: 'boolean',
              initialValue: false,
            }),
          ],
      preview: {
  select: { alt: 'alt', media: 'logo' },
  prepare: ({ alt, media }) => ({
    title: alt || 'Sponsor logo',
    media,
  }),
},
        }),
      ],
    }),
    defineField({
      name: 'button',
      title: 'Optional CTA button (below logos)',
      type: 'button',
      options: { collapsible: true, collapsed: true },
    }),
  ],
  preview: {
    select: { title: 'sectionTitle', count: 'logos.length' },
    prepare: ({
      title,
      count,
    }: {
      title?: string
      count?: number
    }) => ({
      title: title ? `Logos: ${title}` : 'Sponsor logos',
      subtitle: count != null ? `${count} logo(s)` : undefined,
    }),
  },
})
