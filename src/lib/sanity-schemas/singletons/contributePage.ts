import { defineField, defineType } from 'sanity'

export const contributePageSingleton = defineType({
  name: 'contributePage',
  title: 'Contribute Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'Contribute',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      initialValue:
        "Support AZAGC's political action committee to elect pro-construction candidates in Arizona.",
    }),
    defineField({
      name: 'body',
      title: 'Page Content',
      type: 'text',
      rows: 10,
      description: 'Main copy shown next to the form (PAC description, disclaimer, etc.).',
      initialValue:
        "The AZAGC Political Action Committee (PAC) was established to allow us to pool voluntary contributions to help elect candidates who support construction industry priorities. The AZAGC PAC is non-partisan in its support of candidates. The AZAGC PAC is funded by individual contributions and by transfers from other business PACs. By supporting the AZAGC PAC, members have a collective voice in influencing the outcome of key political races.\n\nPlease note: The AZAGC PAC accepts contributions from individuals only. By law, corporations cannot make contributions to the AZAGC PAC. Contributions to the AZAGC PAC are not tax deductible. For the most recent limits on PAC contributions contact the AZAGC office at 602-252-3926.",
    }),
    defineField({
      name: 'formHeadline',
      title: 'Form Headline',
      type: 'string',
      initialValue: 'Make a Contribution',
    }),
    defineField({
      name: 'formSubheadline',
      title: 'Form Subheadline',
      type: 'text',
      rows: 2,
      initialValue: 'Complete the form below and we’ll follow up with contribution details and options.',
    }),
    defineField({
      name: 'formSubmitLabel',
      title: 'Submit Button Label',
      type: 'string',
      initialValue: 'Submit →',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Contribute Page',
      subtitle: 'Advocacy → Contribute',
    }),
  },
})
