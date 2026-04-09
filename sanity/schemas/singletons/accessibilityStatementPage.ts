import { defineField, defineType } from 'sanity'

export const accessibilityStatementPageSingleton = defineType({
  name: 'accessibilityStatementPage',
  title: 'Accessibility Statement Page',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: 'heading',
      title: 'Page heading',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'body',
      title: 'Content',
      type: 'blockContent',
      // validation: (R) => R.required().min(1),
    }),
    defineField({
      name: 'pageBuilderSections',
      title: 'Extra page sections',
      description:
        'Optional blocks (same as interior pages). Shown below the main content.',
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
    prepare: () => ({ title: 'Accessibility Statement' }),
  },
})
