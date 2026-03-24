import { defineField, defineType } from 'sanity'

export const testimonialSchema = defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (R) => R.required(),
        }),
        defineField({
            name: 'designation',
            title: 'Designation',
            type: 'string',
        }),
        defineField({
            name: 'companyLogo',
            title: 'Company Logo',
            type: 'image',
            options: { hotspot: true },
            description: 'Company logo shown on the testimonial card.',
        }),
        defineField({
            name: 'quote',
            title: 'Quote',
            type: 'text',
            validation: (R) => R.required(),
        }),
    ],
    preview: {
        select: {
            name: 'name',
        },
        prepare: ({ name }) => ({
            title: name ? `Testimonial: ${name}` : 'Testimonial',
        }),
    },
})