import { defineField, defineType } from 'sanity'

export const teamSectionByRole = defineType({
  name: 'teamSectionByRole',
  title: 'Team Section by Role',
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
      type: 'simpleContent',
    }),
    defineField({
      name: 'teamByRole',
      title: 'Team by Role',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'teamByRoleItem',
          fields: [
            { name: 'role', type: 'string', title: 'Role', validation: (R) => R.required() },
            { name: 'members', type: 'array', title: 'Members', of: [{ type: 'reference', to: [{ type: 'teamMember' }] }] },
          ],
          preview: { select: { role: 'role' }, prepare: ({ role }: { role?: string }) => ({ title: role || 'Team by Role' }) },
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
      name: 'button',
      title: 'Button',
      type: 'button',
      options: { collapsible: true, collapsed: true },
    }),

  ],
  preview: {
    select: { title: 'sectionTitle' },
    prepare: ({ title }: { title?: string }) => ({ title: title ? `Image cards: ${title}` : 'Image card grid' }),
  },
})
