export const policyPrioritySchema = {
  name: 'policyPriority',
  title: 'Policy Priority',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (r: { required: () => unknown }) => r.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'description', title: 'Summary', type: 'text', rows: 3 },
    { name: 'iconName', title: 'Icon Name (lucide-react)', type: 'string' },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
    { name: 'displayOrder', title: 'Display Order', type: 'number' },
    { name: 'active', title: 'Active', type: 'boolean', initialValue: true },
  ],
  preview: { select: { title: 'title', subtitle: 'description' } },
}
