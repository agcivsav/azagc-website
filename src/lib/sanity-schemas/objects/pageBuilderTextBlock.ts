import { defineField, defineType } from 'sanity'

export const pageBuilderTextBlockObject = defineType({
  name: 'pageBuilderTextBlock',
  title: 'Text Block Section',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button Label',
      type: 'string',
      description: 'Optional. Single button below the body (e.g. "Learn More & Apply Here").',
    }),
    defineField({
      name: 'ctaHref',
      title: 'Button URL',
      type: 'string',
      description: 'Required if button label is set.',
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare: ({ heading }: { heading?: string }) => ({ title: heading ? `Text: ${heading}` : 'Text block' }),
  },
})
