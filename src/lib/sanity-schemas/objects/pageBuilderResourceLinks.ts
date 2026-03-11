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
        {
          type: 'object',
          name: 'resourceGroup',
          fields: [
            { name: 'title', type: 'string', title: 'Group Heading', validation: (R: { required: () => unknown }) => R.required() },
            {
              name: 'links',
              type: 'array',
              title: 'Links',
              of: [
                {
                  type: 'object',
                  name: 'resourceLink',
                  fields: [
                    { name: 'label', type: 'string', title: 'Label', validation: (R: { required: () => unknown }) => R.required() },
                    { name: 'url', type: 'string', title: 'URL', validation: (R: { required: () => unknown }) => R.required() },
                  ],
                  preview: { select: { label: 'label' }, prepare: ({ label }: { label?: string }) => ({ title: label ?? 'Link' }) },
                },
              ],
            },
          ],
          preview: { select: { title: 'title' }, prepare: ({ title }: { title?: string }) => ({ title: title ?? 'Resource group' }) },
        },
      ],
      description: 'e.g. "State And Local Resources", "AGC Of America Resources" with their links.',
    }),
  ],
  preview: {
    select: { body: 'body' },
    prepare: ({ body }: { body?: string }) => ({
      title: 'Resource links',
      subtitle: body ? body.slice(0, 50) + '…' : undefined,
    }),
  },
})
