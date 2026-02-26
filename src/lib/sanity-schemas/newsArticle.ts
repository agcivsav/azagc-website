export const newsArticleSchema = {
  name: 'newsArticle',
  title: 'News Article',
  type: 'document',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (r: { required: () => unknown }) => r.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'headline' },
      validation: (r: { required: () => unknown }) => r.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { value: 'News', title: 'News' },
          { value: 'Press Release', title: 'Press Release' },
          { value: 'Industry Update', title: 'Industry Update' },
          { value: 'Member Spotlight', title: 'Member Spotlight' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (r: { max: (n: number) => unknown }) => r.max(200),
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
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
  ],
  preview: {
    select: { title: 'headline', subtitle: 'publishedAt', media: 'featuredImage' },
  },
}
