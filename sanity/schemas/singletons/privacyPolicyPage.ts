import { defineField, defineType } from 'sanity'

export const privacyPolicyPageSingleton = defineType({
  name: 'privacyPolicyPage',
  title: 'Privacy Policy Page',
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
    prepare: () => ({ title: 'Privacy Policy' }),
  },
})
