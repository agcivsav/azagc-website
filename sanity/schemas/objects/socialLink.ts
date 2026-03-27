import { defineField, defineType } from 'sanity'

const SOCIAL_PLATFORMS = [
  { title: 'Facebook', value: 'facebook' },
  { title: 'Instagram', value: 'instagram' },
  { title: 'X / Twitter', value: 'x' },
  { title: 'LinkedIn', value: 'linkedin' },
  { title: 'YouTube', value: 'youtube' },
  { title: 'TikTok', value: 'tiktok' },
]

export const socialLinkObject = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: SOCIAL_PLATFORMS,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Accessible Label',
      type: 'string',
      description: 'Optional override for screen readers. Defaults to the selected platform.',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'platform',
      subtitle: 'url',
      label: 'label',
    },
    prepare({ title, subtitle, label }) {
      return {
        title: label || title,
        subtitle,
      }
    },
  },
})
