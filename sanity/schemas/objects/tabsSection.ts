import { defineField, defineType } from 'sanity'

export const tabsSection = defineType({
  name: 'tabsSection',
  title: 'Tabs Section',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'heading',
      title: 'Section heading',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro text (optional)',
      type: 'simpleContent',
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
            { name: 'content', type: 'simpleContent', title: 'Tab content' },
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
