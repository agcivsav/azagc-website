import { defineField, defineType } from 'sanity'

export const accessibilityStatementPageSingleton = defineType({
  name: 'accessibilityStatementPage',
  title: 'Accessibility Statement Page',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: 'heading',
      title: 'Page heading',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'body',
      title: 'Content',
      type: 'blockContent',
      validation: (R) => R.required().min(1),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Accessibility Statement' }),
  },
})
