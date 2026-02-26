export const resourceArticleSchema = {
  name: 'resourceArticle',
  title: 'Resource Article',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (r: { required: () => unknown }) => r.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r: { required: () => unknown }) => r.required() },
    { name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'publishedAt', title: 'Published Date', type: 'datetime' },
    { name: 'lastUpdated', title: 'Last Updated', type: 'datetime' },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { value: 'Safety', title: 'Safety' },
          { value: 'Compliance', title: 'Compliance' },
          { value: 'Workforce', title: 'Workforce' },
          { value: 'Infrastructure', title: 'Infrastructure' },
          { value: 'Industry Data', title: 'Industry Data' },
          { value: 'Other', title: 'Other' },
        ],
      },
    },
    { name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 2 },
        { name: 'ogImage', type: 'image', title: 'OG Image' },
        { name: 'noIndex', type: 'boolean', title: 'No Index', initialValue: false },
      ],
    },
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question', validation: (r: { required: () => unknown }) => r.required() },
            { name: 'answer', type: 'text', title: 'Answer', rows: 3, validation: (r: { required: () => unknown }) => r.required() },
          ],
          preview: { select: { title: 'question' } },
        },
      ],
    },
  ],
  preview: { select: { title: 'title', subtitle: 'category', media: 'featuredImage' } },
}
