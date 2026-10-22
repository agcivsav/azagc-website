import { defineField, defineType } from 'sanity'

/** Inline Q&A for news article FAQ sections (distinct from document-type faqItem). */
export const newsFaqItem = defineType({
  name: 'newsFaqItem',
  title: 'FAQ Item',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'answer',
    },
    prepare({ title, subtitle }) {
      return {
        title: title ?? 'FAQ Item',
        subtitle,
      }
    },
  },
})
