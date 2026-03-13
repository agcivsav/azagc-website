import { defineField, defineType } from 'sanity'

export const teamImageCardSectionObject = defineType({
  name: 'teamImageCardSection',
  title: 'Heading + Image card grid (clickable)',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section heading',
      type: 'string',
      // validation: (R) => R.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'items',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'teamImageCardItem',
          fields: [
            { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
            { name: 'heading', type: 'string', title: 'Heading', validation: (R) => R.required() },
                        { name: 'subheading', type: 'string', title: 'Sub Heading'},

            { name: 'url', type: 'url', title: 'External link', description: 'Card is clickable to this URL.' },
    //             defineField({
    //   name: 'ctaLabel',
    //   title: 'Button label',
    //   type: 'string',
    //   description: 'Optional section-level button below the grid.',
    // }),
    // defineField({
    //   name: 'ctaHref',
    //   title: 'Button URL',
    //   type: 'string',
    //   description: 'Required if button label is set.',
    // }),
          ],
          preview: { select: { title: 'heading' }, prepare: ({ title }: { title?: string }) => ({ title: title || 'Card' }) },
        },
      ],
    }),
    defineField({
      name: 'columns',
      title: 'Cards per row',
      type: 'string',
      options: {
        list: [
          { title: '3 columns', value: '3' },
          { title: '4 columns', value: '4' },
        ],
        layout: 'radio',
      },
      initialValue: '3',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button label',
      type: 'string',
      description: 'Optional section-level button below the grid.',
    }),
    defineField({
      name: 'ctaHref',
      title: 'Button URL',
      type: 'string',
      description: 'Required if button label is set.',
    }),
  ],
  preview: {
    select: { title: 'sectionTitle' },
    prepare: ({ title }: { title?: string }) => ({ title: title ? `Image cards: ${title}` : 'Image card grid' }),
  },
})
