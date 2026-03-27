import { defineField, defineType } from 'sanity'

export const footerLinkGroupObject = defineType({
  name: 'footerLinkGroup',
  title: 'Footer Link Group',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Group Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{ type: 'navigationLink' }],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      links: 'links',
    },
    prepare({ title, links }) {
      const count = Array.isArray(links) ? links.length : 0
      return {
        title,
        subtitle: `${count} link${count === 1 ? '' : 's'}`,
      }
    },
  },
})
