import { defineField, defineType } from 'sanity'

export const homePageSingleton = defineType({
  name: 'homePage',
  title: 'Homepage',
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
      title: 'Homepage Hero',
      type: 'homeHero',
    }),
    defineField({
      name: 'promotionBar',
      title: 'Promotion Bar',
      type: 'promotionBar',
    }),
    defineField({
      name: 'benefitsSection',
      title: 'Benefits Section',
      type: 'homeBenefitsSection',
    }),
    defineField({
      name: 'membershipSection',
      title: 'Membership Section',
      type: 'homeMembershipSection',
    }),
    defineField({
      name: 'eventsSection',
      title: 'Events Section',
      type: 'homeEventsSection',
    }),
    defineField({
      name: 'newsSection',
      title: 'News Section',
      type: 'homeNewsSection',
    }),
    defineField({
      name: 'pageBuilderSections',
      title: 'Extra page sections',
      description:
        'Optional blocks (same as interior pages). Shown after News and before the bottom signup section. Leave empty to hide.',
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
    defineField({
      name: 'bottomCta',
      title: 'Bottom CTA Section',
      type: 'homeBottomCta',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Homepage Content',
    }),
  },
})