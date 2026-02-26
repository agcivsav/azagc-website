export const committeeSchema = {
  name: 'committee',
  title: 'Committee',
  type: 'document',
  fields: [
    { name: 'name', title: 'Committee Name', type: 'string', validation: (r: { required: () => unknown }) => r.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (r: { required: () => unknown }) => r.required() },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
    { name: 'chair', title: 'Chair', type: 'string' },
    { name: 'meetingSchedule', title: 'Meeting Schedule', type: 'string' },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
  ],
  preview: { select: { title: 'name', subtitle: 'chair' } },
}
