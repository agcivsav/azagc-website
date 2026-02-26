export const ctaBlockObject = {
  name: 'ctaBlock',
  title: 'CTA Block',
  type: 'object',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (r: { required: () => unknown }) => r.required(),
    },
    {
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
    },
    {
      name: 'formSource',
      title: 'Form Source ID',
      type: 'string',
      description: 'Passed to LeadForm source prop for tracking (e.g. "homepage-mid-cta")',
    },
    {
      name: 'submitLabel',
      title: 'Submit Button Label',
      type: 'string',
    },
    {
      name: 'variant',
      title: 'Display Variant',
      type: 'string',
      options: {
        list: [
          { value: 'card', title: 'Card (default)' },
          { value: 'inline', title: 'Inline' },
          { value: 'compact', title: 'Compact' },
        ],
        layout: 'radio',
      },
    },
  ],
}
