import { defineType, defineField } from 'sanity'

export const sponsorSchema = defineType({
  name: 'sponsor',
  title: 'Sponsor',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Organization Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'website', title: 'Website URL', type: 'url' }),
    defineField({ name: 'tier', title: 'Sponsorship Tier', type: 'string', options: { list: ['Platinum', 'Gold', 'Silver', 'Bronze', 'Partner'] } }),
    defineField({ name: 'active', title: 'Active', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: { select: { title: 'name', subtitle: 'tier', media: 'logo' } },
})
