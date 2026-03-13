import { defineType, defineField } from 'sanity'

const CATEGORY_OPTIONS = [
  { title: 'Contractors', value: 'contractors' },
  { title: 'Affiliates', value: 'affiliates' },
  { title: 'Young Constructors Forum (YCF)', value: 'ycf' },
  { title: 'Industry Partners & Owners', value: 'industry-partners' },
]

export const testimonialSchema = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'personName',
      title: 'Person Name',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'personTitle',
      title: 'Title / Position',
      type: 'string',
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      options: { hotspot: false },
    }),
    defineField({
      name: 'companyUrl',
      title: 'Company Website',
      type: 'url',
    }),
    defineField({
      name: 'headshot',
      title: 'Headshot',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'category',
      title: 'Category (Tab)',
      type: 'string',
      options: { list: CATEGORY_OPTIONS, layout: 'dropdown' },
      description: 'Determines which tab this testimonial appears under.',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first within the tab.',
    }),
  ],
  preview: {
    select: { title: 'personName', subtitle: 'companyName', category: 'category' },
    prepare: ({ title, subtitle, category }) => ({
      title: title ?? 'Untitled',
      subtitle: [subtitle, category].filter(Boolean).join(' · ') || undefined,
    }),
  },
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'displayOrder', direction: 'asc' }] },
    { title: 'Display order desc', name: 'orderDesc', by: [{ field: 'displayOrder', direction: 'desc' }] },
  ],
})
