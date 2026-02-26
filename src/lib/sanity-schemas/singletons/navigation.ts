export const navigationSingleton = {
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'mainNav',
      title: 'Main Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label', validation: (r: { required: () => unknown }) => r.required() },
            { name: 'path', type: 'string', title: 'Path', validation: (r: { required: () => unknown }) => r.required() },
            {
              name: 'children',
              type: 'array',
              title: 'Dropdown Items',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', type: 'string', title: 'Label' },
                    { name: 'path', type: 'string', title: 'Path' },
                  ],
                  preview: { select: { title: 'label', subtitle: 'path' } },
                },
              ],
            },
          ],
          preview: { select: { title: 'label', subtitle: 'path' } },
        },
      ],
    },
    {
      name: 'footerNav',
      title: 'Footer Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'columnTitle', type: 'string', title: 'Column Title' },
            {
              name: 'links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', type: 'string', title: 'Label' },
                    { name: 'path', type: 'string', title: 'Path' },
                  ],
                  preview: { select: { title: 'label', subtitle: 'path' } },
                },
              ],
            },
          ],
          preview: { select: { title: 'columnTitle' } },
        },
      ],
    },
    {
      name: 'ctaLabel',
      title: 'Nav CTA Label',
      type: 'string',
      description: 'Text for the "Join Now" nav button',
      initialValue: 'Join Now',
    },
    {
      name: 'ctaPath',
      title: 'Nav CTA Path',
      type: 'string',
      initialValue: '/join/',
    },
  ],
  preview: { prepare: () => ({ title: 'Navigation' }) },
}
