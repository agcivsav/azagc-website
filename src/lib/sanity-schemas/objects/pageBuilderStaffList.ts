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
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'items',
      title: 'People',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'staffItem',
          fields: [
            { name: 'name', type: 'string', title: 'Name', validation: (R: { required: () => unknown }) => R.required() },
            { name: 'title', type: 'string', title: 'Title / Position' },
            { name: 'company', type: 'string', title: 'Company' },
            { name: 'role', type: 'string', title: 'Role (e.g. Trust Fund Chairman)' },
          ],
          preview: { select: { name: 'name', title: 'title' }, prepare: ({ name, title }: { name?: string; title?: string }) => ({ title: name ?? 'Person', subtitle: title }) },
        },
      ],
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare: ({ heading }: { heading?: string }) => ({ title: heading ? `Staff list: ${heading}` : 'Staff list' }),
  },
})
