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
            defineField({
              name: 'entries',
              title: 'Listing',
              type: 'array',
              of: [
                defineField({
                  name: 'entry',
                  title: 'Entry',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'content',
                      title: 'Tab content',
                      type: 'simpleContent',
                    }),
                    defineField({
                      name: 'link',
                      title: 'Link for image (external)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'logo',
                      title: 'Logo / Image',
                      type: 'image',
                      description: 'Company logo or image shown on the right side.',
                      options: { hotspot: true },
                    }),
                  ],
                  preview: {
                    prepare: () => ({ title: 'Tab Entry' }),
                  },
                }),
              ],
            }),
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