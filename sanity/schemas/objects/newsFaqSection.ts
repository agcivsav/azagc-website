import { defineArrayMember, defineField, defineType } from 'sanity'

export const newsFaqSection = defineType({
  name: 'newsFaqSection',
  title: 'FAQ Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional heading displayed above the questions.',
    }),
    defineField({
      name: 'items',
      title: 'Questions',
      type: 'array',
      of: [defineArrayMember({ type: 'newsFaqItem' })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({ title, items }) {
      const count = Array.isArray(items) ? items.length : 0
      return {
        title: title || 'FAQ Section',
        subtitle: `${count} ${count === 1 ? 'question' : 'questions'}`,
      }
    },
  },
})
