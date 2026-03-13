import { defineField, defineType } from 'sanity'

export const resourceLinksSection = defineType({
  name: 'resourceLinksSection',
  title: 'Resource Links Section (Text + CTA + Link Groups)',
  type: 'object',
  options: { collapsible: true, collapsed: false },

  fields: [
    defineField({
      name: 'body',
      title: 'Left Column – Body Text',
      type: 'simpleContent',
      description: 'Intro text (e.g. staying informed on environmental and green issues).',
    }),

    defineField({
      name: 'button',
      title: 'Button Label',
      type: 'button',
      options: { collapsible: true, collapsed: true },
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