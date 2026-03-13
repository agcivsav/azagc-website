import { defineField, defineType } from 'sanity'

export const contributePageSingleton = defineType({
  name: 'contributePage',
  title: 'Contribute Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'body',
      title: 'Page Content',
      type: 'text',
      rows: 10,
      description: 'Main copy shown next to the form.',
    }),
    defineField({
      name: 'formHeadline',
      title: 'Form Headline',
      type: 'string',
    }),
    defineField({
      name: 'formSubheadline',
      title: 'Form Subheadline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'formSubmitLabel',
      title: 'Submit Button Label',
      type: 'string',
    }),

    // Page Builder
    defineField({
      name: 'sections',
      title: 'Page Builder Sections',
      type: 'array',
      of: [
        { type: 'pageBuilderTextBlock' },
        { type: 'ctaBand' },
      ],
    }),
  ],

  preview: {
    prepare: () => ({
      title: 'Contribute Page',
      subtitle: 'Advocacy → Contribute',
    }),
  },
})