import { defineField, defineType } from 'sanity'

export const pageBuilderTabsObject = defineType({
  name: 'pageBuilderTabs',
  title: 'Tab Section (e.g. Awards)',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'heading',
      title: 'Section heading',
      type: 'string',
      validation: (R) => R.required(),
      description: 'e.g. "Awards"',
    }),
    defineField({
      name: 'intro',
      title: 'Intro text (optional)',
      type: 'text',
      rows: 3,
      description: 'Short text above the tabs.',
    }),
    defineField({
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'tabItem',
          fields: [
            { name: 'title', type: 'string', title: 'Tab label', validation: (R) => R.required() },
            { name: 'content', type: 'text', title: 'Tab content', rows: 8 },
            { name: 'image', type: 'image', title: 'Image', description: 'Optional image shown above or with the tab content.', options: { hotspot: true } },
          ],
          preview: {
            select: { title: 'title' },
            prepare: ({ title }: { title?: string }) => ({ title: title ?? 'Tab' }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare: ({ heading }: { heading?: string }) => ({
      title: heading ? `Tabs: ${heading}` : 'Tab section',
    }),
  },
})
