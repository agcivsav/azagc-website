import { defineType, defineField } from 'sanity'

export const pageSchema = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
      options: { collapsible: true, collapsed: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'pageBuilderSections',
      title: 'Page Builder Sections',
      type: 'array',
      of: [
        { type: 'featuresSection' },
        { type: 'contentSection' },
        { type: 'imageContent' },
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
        { type: 'ctaBand' },
        { type: 'carouselSection' },
      ],
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'slug.current' } },
})
