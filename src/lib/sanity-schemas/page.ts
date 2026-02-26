import { defineType, defineField } from 'sanity'

export const pageSchema = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'title' }, validation: (R) => R.required() }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Meta Title' },
        { name: 'description', type: 'text', title: 'Meta Description', rows: 3 },
        { name: 'noIndex', type: 'boolean', title: 'No Index', initialValue: false },
      ],
    }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text', rows: 2 }),
    defineField({ name: 'body', title: 'Page Content', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),
  ],
  preview: { select: { title: 'title', subtitle: 'slug.current' } },
})
