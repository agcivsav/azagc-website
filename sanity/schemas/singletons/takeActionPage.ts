import { defineField, defineType } from 'sanity'

export const takeActionPageSingleton = defineType({
  name: 'takeActionPage',
  title: 'Take Action Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'Take Action',
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'contentHeading',
      title: 'Content Section Heading',
      type: 'string',
      initialValue: 'Make Your Voice Heard',
    }),
    defineField({
      name: 'contentIntro',
      title: 'Intro Paragraph',
      type: 'text',
      rows: 5,
    }),

    defineField({
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'takeActionTab',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Tab Label',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              type: 'string',
              title: 'Tab Value (unique)',
              description: 'e.g. campaigns, surveys, events, federal',
            }),
            defineField({
              name: 'content',
              type: 'text',
              title: 'Tab Content',
              rows: 6,
            }),
          ],
          preview: {
            select: { label: 'label' },
            prepare: ({ label }) => ({
              title: label ?? 'Tab',
            }),
          },
        }),
      ],
      initialValue: [
        { label: 'State and Local - Campaigns', value: 'campaigns' },
        { label: 'State and Local - Surveys', value: 'surveys' },
        { label: 'State and Local - Events', value: 'events' },
        { label: 'Federal Issues', value: 'federal' },
      ],
    }),
  ],

  preview: {
    prepare: () => ({
      title: 'Take Action Page',
      subtitle: 'Advocacy → Take Action',
    }),
  },
})