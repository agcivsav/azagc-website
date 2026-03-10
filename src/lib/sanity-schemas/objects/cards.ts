import { defineType, defineField } from 'sanity'

export const membershipCard = defineType({
  name: 'membershipCard',
  title: 'Membership Card',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'href', title: 'Link URL', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'image', title: 'Card Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'imgAlt', title: 'Image Alt Text', type: 'string' }),
  ],
})