export const faqItemSchema = {
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    { name: 'question', title: 'Question', type: 'string', validation: (r: { required: () => unknown }) => r.required() },
    { name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (r: { required: () => unknown }) => r.required() },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'displayOrder', title: 'Display Order', type: 'number' },
  ],
  preview: { select: { title: 'question', subtitle: 'category' } },
}
