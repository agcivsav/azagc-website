import { defineField, defineType } from 'sanity'

export const tabsTestimonialSection = defineType({
    name: 'tabsTestimonialSection',
    title: 'Tabs Testimonial Section',
    type: 'object',
    options: { collapsible: true, collapsed: false },
    fields: [
        defineField({
            name: 'heading',
            title: 'Section heading',
            type: 'string',
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'intro',
            title: 'Intro text (optional)',
            type: 'simpleContent',
            description: 'Short text above the tabs.',
        }),
        defineField({
            name: 'tabs',
            title: 'Tabs',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'tabItem',
                    fields: [
                        { name: 'title', type: 'string', title: 'Tab label', validation: (R) => R.required() },
                        defineField({
                            name: 'testimonials',
                            title: 'Testimonials',
                            type: 'array',
                            of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
                        }),
                    ],
                    preview: {
                        select: { title: 'title' },
                        prepare: ({ title }: { title?: string }) => ({ title: title ?? 'Tab' }),
                    },
                },
            ],
        }),
    ],
    preview: {
        select: { heading: 'heading' },
        prepare: ({ heading }: { heading?: string }) => ({
            title: heading ? `Tabs Testimonial: ${heading}` : 'Tabs Testimonial section',
        }),
    },
})