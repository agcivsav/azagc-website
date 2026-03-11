import { defineField, defineType } from 'sanity'

export const pageBuilderStaffListObject = defineType({
  name: 'pageBuilderStaffList',
  title: 'Staff / Trustees List Section',
  type: 'object',
  options: { collapsible: true, collapsed: false },

  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'items',
      title: 'People',
      type: 'array',

      of: [
        defineField({
          name: 'staffItem',
          type: 'object',

          fields: [
            defineField({
              name: 'name',
              type: 'string',
              title: 'Name',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'title',
              type: 'string',
              title: 'Title / Position',
            }),

            defineField({
              name: 'company',
              type: 'string',
              title: 'Company',
            }),

            defineField({
              name: 'role',
              type: 'string',
              title: 'Role (e.g. Trust Fund Chairman)',
            }),
          ],

          preview: {
            select: {
              name: 'name',
              title: 'title',
            },
            prepare: ({ name, title }) => ({
              title: name ?? 'Person',
              subtitle: title,
            }),
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      heading: 'heading',
    },
    prepare: ({ heading }) => ({
      title: heading ? `Staff list: ${heading}` : 'Staff list',
    }),
  },
})