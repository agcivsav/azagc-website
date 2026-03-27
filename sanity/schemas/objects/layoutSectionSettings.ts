import { defineField, defineType } from 'sanity'

export const topBarSettingsObject = defineType({
  name: 'topBarSettings',
  title: 'Top Bar Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Show Top Bar',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Displayed on the left side of the top bar.',
    }),
    defineField({
      name: 'announcement',
      title: 'Announcement Text',
      type: 'string',
      description: 'Short brand/supporting line shown next to the phone number.',
    }),
    defineField({
      name: 'memberLoginLabel',
      title: 'Member Login Label',
      type: 'string',
      initialValue: 'Member Login',
    }),
    defineField({
      name: 'memberLoginUrl',
      title: 'Member Login URL',
      type: 'url',
    }),
  ],
})

export const headerSettingsObject = defineType({
  name: 'headerSettings',
  title: 'Header Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo Alt Text',
      type: 'string',
      description: 'Used for accessibility when the logo is rendered in the header.',
    }),
    defineField({
      name: 'navigationItems',
      title: 'Navigation Items',
      type: 'array',
      of: [{ type: 'headerNavigationItem' }],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'primaryCtaLabel',
      title: 'Primary CTA Label',
      type: 'string',
      initialValue: 'Join Now',
    }),
    defineField({
      name: 'primaryCtaHref',
      title: 'Primary CTA Path / URL',
      type: 'string',
      description: 'Used for the desktop and mobile header CTA.',
    }),
  ],
})

export const footerSettingsObject = defineType({
  name: 'footerSettings',
  title: 'Footer Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'logo',
      title: 'Footer Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'logoAlt',
      title: 'Footer Logo Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Footer Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{ type: 'socialLink' }],
    }),
    defineField({
      name: 'linkGroups',
      title: 'Footer Link Groups',
      type: 'array',
      of: [{ type: 'footerLinkGroup' }],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      description: 'You can include {{year}} to inject the current year.',
    }),
    defineField({
      name: 'bottomCtaLabel',
      title: 'Bottom CTA Label',
      type: 'string',
      initialValue: 'Become a Member',
    }),
    defineField({
      name: 'bottomCtaHref',
      title: 'Bottom CTA Path / URL',
      type: 'string',
    }),
  ],
})
