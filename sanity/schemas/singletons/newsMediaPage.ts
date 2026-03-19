import { defineField, defineType } from 'sanity'

export const newsMediaPageSingleton = defineType({
  name: 'newsMediaPage',
  title: 'News & Media Page',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
      options: { collapsible: true, collapsed: true },
      validation: (R) => R.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'News & Media' }),
  },
})
