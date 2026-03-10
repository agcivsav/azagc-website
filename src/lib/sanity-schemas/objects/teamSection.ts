import { defineField, defineType } from 'sanity'

export const teamSectionObject = defineType({
  name: 'teamSection',
  title: 'Team Section',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Heading',
      type: 'string',
      description: 'e.g. "2026 Executive Committee", "2026 Directors"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'members',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'teamMember' }],
        },
      ],
      validation: (R) => R.required().min(1),
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
  ],
})
