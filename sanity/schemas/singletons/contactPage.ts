import { defineField, defineType } from 'sanity'

export const contactPageSingleton = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
      options: { collapsible: true, collapsed: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'contactHeading',
      title: 'Contact section heading',
      type: 'string',
      description: 'Heading above the contact details and map (e.g. “Get in touch”).',
      initialValue: 'Contact us',
    }),
    defineField({
      name: 'intro',
      title: 'Intro (optional)',
      type: 'blockContent',
      description: 'Short copy shown above the contact details.',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (R) =>
        R.custom((value) => {
          if (!value || !String(value).trim()) return true
          const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim())
          return ok || 'Enter a valid email address'
        }),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Mailing address',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Map embed URL',
      type: 'url',
      description:
        'Google Maps: Share → Embed a map → copy only the iframe src URL (https://www.google.com/maps/embed?...).',
      validation: (R) =>
        R.custom((value) => {
          if (value === undefined || value === null || String(value).trim() === '') return true
          const str = String(value).trim()
          try {
            const u = new URL(str)
            if (u.protocol !== 'https:') return 'URL must use https'
            const host = u.hostname.replace(/^www\./, '')
            const allowed =
              host === 'google.com' ||
              host.endsWith('.google.com') ||
              host === 'maps.google.com' ||
              host === 'openstreetmap.org' ||
              host.endsWith('.openstreetmap.org')
            return allowed || 'Use an embed URL from Google Maps or OpenStreetMap'
          } catch {
            return 'Invalid URL'
          }
        }),
    }),
    defineField({
      name: 'leadFormSection',
      title: 'Lead form section',
      description: 'Copy beside the contact form (below contact details and map).',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow label',
          type: 'string',
          initialValue: 'Reach out',
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Send us a message',
        }),
        defineField({
          name: 'intro',
          title: 'Intro text',
          type: 'text',
          rows: 4,
          initialValue:
            'Tell us what you need and our team will follow up. You can also call or email using the contact details above.',
        }),
        // defineField({
        //   name: 'bulletPoints',
        //   title: 'Bullet points',
        //   type: 'array',
        //   description: 'Leave empty to hide the bullet list.',
        //   of: [
        //     {
        //       type: 'string',
        //       validation: (R) => R.required().min(1),
        //     },
        //   ],
        //   initialValue: [
        //     'Membership questions, events, and chapter information',
        //     'We aim to respond within one business day',
        //     'Your details are used only to follow up on your request',
        //   ],
        // }),
      ],
    }),
    defineField({
      name: 'pageBuilderSections',
      title: 'Extra page sections',
      description: 'Optional blocks (same as interior pages). Shown below the contact area.',
      type: 'array',
      of: [
        { type: 'featuresSection' },
        { type: 'contentSection' },
        { type: 'imageContent' },
        { type: 'imageCarouselContent' },
        { type: 'videoSection' },
        { type: 'splitImagesSection' },
        { type: 'awardSection' },
        { type: 'resourceLinksSection' },
        { type: 'splitContentSection' },
        { type: 'teamSectionByRole' },
        { type: 'servicesSection' },
        { type: 'newsSection' },
        { type: 'formSection' },
        { type: 'committeesSection' },
        { type: 'tabsSection' },
        { type: 'tabsTestimonialSection' },
        { type: 'ctaBand' },
        { type: 'carouselSection' },
        { type: 'testimonialsSection' },
        { type: 'photoGalleriesSection' },
        { type: 'embedPanelsSection' },
        { type: 'faqSection' },
        { type: 'sponsorLogosSection' },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Contact' }),
  },
})
