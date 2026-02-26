export const seoDefaultsSingleton = {
  name: 'seoDefaults',
  title: 'SEO Defaults',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'defaultTitle',
      title: 'Default Meta Title Suffix',
      type: 'string',
      description: 'Appended to page titles (e.g. "AZAGC")',
      initialValue: 'AZAGC',
    },
    {
      name: 'defaultDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 2,
      description: 'Used when a page has no custom meta description',
      initialValue: 'AZAGC — Arizona Chapter of the Associated General Contractors of America. Supporting Arizona contractors through advocacy, education, and industry resources since 1934.',
    },
    {
      name: 'defaultOgImage',
      title: 'Default OG Image',
      type: 'image',
      description: 'Fallback social share image (1200×630px)',
    },
    {
      name: 'twitterHandle',
      title: 'Twitter/X Handle',
      type: 'string',
      description: 'Without the @ symbol',
    },
    {
      name: 'googleSiteVerification',
      title: 'Google Search Console Verification',
      type: 'string',
    },
  ],
  preview: { prepare: () => ({ title: 'SEO Defaults' }) },
}
