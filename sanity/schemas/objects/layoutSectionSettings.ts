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
      description:
        'PNG or WebP recommended. SVG in this field often never finishes loading in Studio; use a raster logo.',
      options: {
        hotspot: true,
        accept: 'image/png,image/jpeg,image/jpg,image/webp,image/gif',
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
      description:
        'PNG or WebP recommended. SVG in this field often never finishes loading in Studio; use a raster logo.',
      options: {
        hotspot: true,
        accept: 'image/png,image/jpeg,image/jpg,image/webp,image/gif',
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
      name: 'contactOrganizationName',
      title: 'Contact — organization name',
      type: 'string',
      description: 'Legal or display name (e.g. chapter name). Shown with shield icon.',
    }),
    defineField({
      name: 'contactAddress',
      title: 'Contact — address',
      type: 'text',
      rows: 2,
      description: 'Street and city/state (shown with map pin icon).',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact — phone',
      type: 'string',
      description: 'Display number; used for a clickable tel: link.',
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
      name: 'legalLinks',
      title: 'Legal / utility links (footer bar)',
      type: 'array',
      description:
        'Shown beside the copyright row (e.g. Privacy Policy → /privacy-policy/, Accessibility → /accessibility-statement/).',
      of: [{ type: 'navigationLink' }],
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
    }),
    defineField({
      name: 'bottomCtaHref',
      title: 'Bottom CTA Path / URL',
      type: 'string',
    }),
  ],
})
