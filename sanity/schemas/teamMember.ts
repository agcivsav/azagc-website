import { defineType, defineField } from 'sanity'

export const teamMemberSchema = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  groups: [
    { name: 'committee', title: 'Committee Team by Role', default: true },
    { name: 'profile', title: 'Team Member' },
  ],
  fields: [
    defineField({
      name: 'teamByRoleMemberEntry',
      title: 'Committee Team by Role',
      type: 'object',
      group: 'committee',
      description:
        'Role and company show on About → Committee Team.',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'role',
          title: 'Role',
          type: 'string',
        }),
        defineField({
          name: 'company',
          title: 'Company',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'photo',
      title: 'Headshot',
      type: 'image',
      group: 'committee',
      options: { hotspot: true },
      description: 'Used everywhere this person appears, including committee cards.',
    }),
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      group: 'profile',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title / Role',
      type: 'string',
      group: 'profile',
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      group: 'profile',
      description: 'Optional; shown when role is company-based (e.g. board seat).',
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      group: 'profile',
      options: { list: ['Leadership', 'Board of Directors', 'Staff', 'Advisory Council'] },
    }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 4, group: 'profile' }),
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'profile' }),
    defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url', group: 'profile' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', group: 'profile' }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'button',
      group: 'profile',
      options: { collapsible: true, collapsed: true },
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'title', media: 'photo' } },
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
