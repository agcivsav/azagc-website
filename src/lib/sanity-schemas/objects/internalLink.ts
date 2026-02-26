export const internalLinkObject = {
  name: 'internalLink',
  title: 'Internal Link',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Link Label',
      type: 'string',
      validation: (r: { required: () => unknown }) => r.required(),
    },
    {
      name: 'path',
      title: 'Path',
      type: 'string',
      description: 'Relative path, e.g. /membership/ or /events/annual-gala/',
      validation: (r: { required: () => unknown }) => r.required(),
    },
  ],
}
