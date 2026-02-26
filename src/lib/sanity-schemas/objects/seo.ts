export const seoObject = {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Appears in browser tab and Google search results (50–60 chars)',
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      description: 'Google search result snippet (140–155 chars)',
    },
    {
      name: 'ogImage',
      title: 'OG / Social Share Image',
      type: 'image',
      description: 'Recommended: 1200×630px',
    },
    {
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      description: 'Exclude this page from search engines',
      initialValue: false,
    },
  ],
}
