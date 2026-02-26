import { defineType, defineField } from 'sanity'

export const teamMemberSchema = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'title', title: 'Title / Role', type: 'string' }),
    defineField({ name: 'department', title: 'Department', type: 'string', options: { list: ['Leadership', 'Board of Directors', 'Staff', 'Advisory Council'] } }),
    defineField({ name: 'photo', title: 'Headshot', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 4 }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: { select: { title: 'name', subtitle: 'title', media: 'photo' } },
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
