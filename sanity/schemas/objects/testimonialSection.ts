import { defineField, defineType } from 'sanity'

export const testimonialsSection = defineType({
    name: 'testimonialsSection',
    title: 'Testimonials Section',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'intro',
            title: 'Intro',
            type: 'simpleContent',
        }),
        defineField({
            name: 'testimonials',
            title: 'Testimonials',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
        }),
    ],
    preview: {
        select: {
            heading: 'heading',
        },
        prepare: ({ heading }) => ({
            title: heading ? `Testimonials section: ${heading}` : 'Testimonials section',
        }),
    },
})