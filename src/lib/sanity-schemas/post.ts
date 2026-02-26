import { defineType, defineField } from 'sanity'

export const postSchema = defineType({
  name: 'post',
  title: 'News & Updates',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (R) => R.required() }),
    defineField({ name: 'publishedAt', title: 'Published Date', type: 'datetime' }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'string' }], options: { list: ['Industry News', 'Events', 'Member Spotlight', 'Policy & Advocacy', 'Workforce', 'Press Release'] } }),
    defineField({ name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'title', subtitle: 'publishedAt', media: 'coverImage' } },
  orderings: [{ title: 'Newest First', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
})
