import { defineField, defineType } from 'sanity'

export const navigationLinkObject = defineType({
  name: 'navigationLink',
  title: 'Navigation Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Path / URL',
      type: 'string',
      description: 'Use a relative path like /about or a full external URL when needed.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'href',
    },
  },
})
