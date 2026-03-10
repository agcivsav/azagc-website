import { defineField, defineType } from 'sanity'

export const homePageSingleton = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
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