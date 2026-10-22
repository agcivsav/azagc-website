import { defineField, defineType } from 'sanity'

export const newsTableSection = defineType({
  name: 'newsTableSection',
  title: 'Table Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional heading displayed above the table.',
    }),
    defineField({
      name: 'table',
      title: 'Table',
      type: 'table',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      rows: 'table.rows',
    },
    prepare({ title, rows }) {
      const count = Array.isArray(rows) ? rows.length : 0
      return {
        title: title || 'Table Section',
        subtitle: `${count} ${count === 1 ? 'row' : 'rows'}`,
      }
    },
  },
})
