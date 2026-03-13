export const educationProgramSchema = {
  name: 'educationProgram',
  title: 'Education Program',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (r: { required: () => unknown }) => r.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r: { required: () => unknown }) => r.required() },
    {
      name: 'programType',
      title: 'Program Type',
      type: 'string',
      options: {
        list: [
          { value: 'OSHA', title: 'OSHA Safety' },
          { value: 'Apprenticeship', title: 'Apprenticeship' },
          { value: 'Management', title: 'Management' },
          { value: 'Safety', title: 'Safety' },
          { value: 'Other', title: 'Other' },
        ],
        layout: 'radio',
      },
    },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
    { name: 'duration', title: 'Duration', type: 'string' },
    { name: 'cost', title: 'Cost', type: 'string' },
    { name: 'nextSessionDate', title: 'Next Session Date', type: 'datetime' },
    { name: 'registrationUrl', title: 'Registration URL', type: 'url' },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
    { name: 'featured', title: 'Featured', type: 'boolean', initialValue: false },
  ],
  preview: { select: { title: 'title', subtitle: 'programType' } },
}
