import { defineField, defineType } from 'sanity'

export const pageBuilderResourceLinksObject = defineType({
  name: 'pageBuilderResourceLinks',
  title: 'Resource Links Section (Text + CTA + Link Groups)',
  type: 'object',
  options: { collapsible: true, collapsed: false },

  fields: [
    defineField({
      name: 'body',
      title: 'Left Column – Body Text',
      type: 'text',
      rows: 6,
      description: 'Intro text (e.g. staying informed on environmental and green issues).',
    }),

    defineField({
      name: 'ctaLabel',
      title: 'Button Label',
      type: 'string',
      description: 'e.g. "AZAGC ENVIRONMENTAL PROFESSIONALS COUNCIL"',
    }),

    defineField({
      name: 'ctaHref',
      title: 'Button URL',
      type: 'string',
      description: 'Required if button label is set.',
    }),

    defineField({
      name: 'resourceGroups',
      title: 'Right Column – Resource Groups',
      type: 'array',

      of: [
        defineField({
          name: 'resourceGroup',
          type: 'object',

          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Group Heading',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'links',
              type: 'array',
              title: 'Links',

              of: [
                defineField({
                  name: 'resourceLink',
                  type: 'object',

                  fields: [
                    defineField({
                      name: 'label',
                      type: 'string',
                      title: 'Label',
                      validation: (Rule) => Rule.required(),
                    }),

                    defineField({
                      name: 'url',
                      type: 'string',
                      title: 'URL',
                      validation: (Rule) => Rule.required(),
                    }),
                  ],

                  preview: {
                    select: { label: 'label' },
                    prepare: ({ label }) => ({
                      title: label ?? 'Link',
                    }),
                  },
                }),
              ],
            }),
          ],

          preview: {
            select: { title: 'title' },
            prepare: ({ title }) => ({
              title: title ?? 'Resource group',
            }),
          },
        }),
      ],

      description:
        'e.g. "State And Local Resources", "AGC Of America Resources" with their links.',
    }),
  ],

  preview: {
    select: { body: 'body' },
    prepare: ({ body }) => ({
      title: 'Resource links',
      subtitle: body ? body.slice(0, 50) + '…' : undefined,
    }),
  },
})