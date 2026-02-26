export const testimonialSchema = {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (r: { required: () => unknown }) => r.required(),
    },
    {
      name: 'personName',
      title: 'Person Name',
      type: 'string',
      validation: (r: { required: () => unknown }) => r.required(),
    },
    {
      name: 'personTitle',
      title: 'Title / Position',
      type: 'string',
    },
    {
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
    },
    {
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
    },
    {
      name: 'companyUrl',
      title: 'Company Website',
      type: 'url',
    },
    {
      name: 'headshot',
      title: 'Headshot',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
    },
  ],
  preview: {
    select: { title: 'personName', subtitle: 'companyName' },
  },
}
