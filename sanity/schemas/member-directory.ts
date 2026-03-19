import { defineType, defineField } from 'sanity'

export const memberDirectorySchema = defineType({
  name: 'memberDirectory',
  title: 'Member Directory',
  type: 'document',
  fields: [
    defineField({
      name: 'businessName',
      title: 'Business Name',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'phone',
      title: 'Phone No',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'businessName', media: 'logo' },
    prepare({ title, media }) {
      return { title: title || 'Untitled', media }
    },
  },
})
