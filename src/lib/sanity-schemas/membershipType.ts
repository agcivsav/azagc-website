export const membershipTypeSchema = {
  name: 'membershipType',
  title: 'Membership Type',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r: { required: () => unknown }) => r.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r: { required: () => unknown }) => r.required(),
    },
    {
      name: 'memberCategory',
      title: 'Member Category',
      type: 'string',
      options: {
        list: [
          { value: 'Contractor', title: 'Contractor' },
          { value: 'Affiliate', title: 'Affiliate' },
          { value: 'YCF', title: 'Young Constructors Forum (YCF)' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'annualDues',
      title: 'Base Annual Dues ($)',
      type: 'number',
    },
    {
      name: 'benefitsList',
      title: 'Benefits List',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'memberCategory' },
  },
}
