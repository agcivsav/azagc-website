import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'
import { createClient } from '@sanity/client'

const rootDir = process.cwd()

for (const envFile of ['.env.production', '.env.development', '.env']) {
  const envPath = path.join(rootDir, envFile)
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath, override: false })
  }
}

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId || !token) {
  console.error('Missing Sanity credentials. Set SANITY_PROJECT_ID (or NEXT_PUBLIC_SANITY_PROJECT_ID) and SANITY_API_TOKEN.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const createKey = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)

const toNavLink = ({ label, href }) => ({
  _key: createKey(`${label}-${href}`),
  _type: 'navigationLink',
  label,
  href,
})

const toHeaderItem = ({ label, href, children }) => ({
  _key: createKey(`${label}-${href}`),
  _type: 'headerNavigationItem',
  label,
  href,
  ...(children?.length
    ? {
        children: children.map(toNavLink),
      }
    : {}),
})

const toFooterGroup = ({ title, links }) => ({
  _key: createKey(title),
  _type: 'footerLinkGroup',
  title,
  links: links.map(toNavLink),
})

const toSocialLink = ({ platform, url, label }) => ({
  _key: createKey(`${platform}-${label || url}`),
  _type: 'socialLink',
  platform,
  url,
  ...(label ? { label } : {}),
})

const headerNavigationItems = [
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Committees', href: '/about/committees' },
      { label: 'Our Team', href: '/about/our-team' },
      { label: 'Testimonials', href: '/about/testimonials' },
      { label: 'Awards Program', href: '/about/awards-program' },
    ],
  },
  {
    label: 'Membership',
    href: '/membership',
    children: [
      { label: 'Contractor Members', href: '/membership/contractor' },
      { label: 'Affiliate Members', href: '/membership/affiliate' },
      { label: 'Benefits', href: '/membership/benefits' },
      { label: 'Member Directory', href: '/membership/member-directory' },
    ],
  },
  {
    label: 'Advocacy',
    href: '/advocacy',
    children: [
      { label: 'Policy Priorities', href: '/advocacy/policy-priorities' },
      { label: 'Take Action', href: '/advocacy/take-action' },
      { label: 'Voter Tools', href: '/advocacy/voter-tools' },
      { label: 'Contribute', href: '/advocacy/contribute' },
    ],
  },
  {
    label: 'Education',
    href: '/education-training',
    children: [
      {
        label: 'Apprenticeship Programs',
        href: '/education-training/apprenticeship-programs',
      },
      {
        label: 'Workforce Development Programs',
        href: '/education-training/workforce-development-programs',
      },
      {
        label: 'Erosion Control Coordinator Training',
        href: '/education-training/erosion-control-coordinator-training',
      },
      {
        label: 'AGC of America Education',
        href: '/education-training/agc-of-america-education',
      },
      {
        label: 'Student Resources',
        href: '/education-training/student-resources',
      },
    ],
  },
  {
    label: 'Industry Resources',
    href: '/industry-resources',
    children: [
      { label: 'News Media', href: '/news-media' },
      {
        label: 'Transportation Infrastructure',
        href: '/industry-resources/transportation-infrastructure',
      },
      { label: 'Environment', href: '/industry-resources/environment' },
      {
        label: 'Arizona Construction Outlook',
        href: '/industry-resources/arizona-construction-outlook',
      },
      { label: 'Labor & HR', href: '/industry-resources/labor-hr' },
      { label: 'Safety', href: '/industry-resources/safety' },
    ],
  },
  {
    label: 'Events',
    href: '/events',
    children: [{ label: 'Events Calendar', href: '/events/events-calendar' }],
  },
  { label: 'Contact', href: '/contact' },
]

const footerLinkGroups = [
  {
    title: 'Membership',
    links: [
      { label: 'Contractor Membership', href: '/membership/contractor' },
      { label: 'Affiliate Membership', href: '/membership/affiliate' },
      { label: 'Member Benefits', href: '/membership/benefits' },
      { label: 'Join Now', href: '/join' },
      { label: 'Member Portal', href: '/member-portal' },
    ],
  },
  {
    title: 'Organization',
    links: [
      { label: 'About AZAGC', href: '/about' },
      { label: 'Leadership', href: '/about/leadership' },
      { label: 'Board of Directors', href: '/about/board' },
      { label: 'Advocacy', href: '/advocacy' },
      { label: 'Education', href: '/education' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Events', href: '/events' },
      { label: 'News', href: '/news' },
      { label: 'Sponsorship', href: '/sponsorship' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
]

const footerSocialLinks = [
  { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/AZAGC/' },
  { platform: 'x', label: 'Instagram', url: 'https://x.com/azagc' },
  { platform: 'linkedin', label: 'LinkedIn', url: '#' },
  { platform: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/azagc1934' },
]

const validFooterSocialLinks = footerSocialLinks.filter(({ url }) => /^https?:\/\//.test(url))

const siteSettingsData = {
  _type: 'siteSettings',
  siteName: 'Arizona Chapter AGC',
  topBar: {
    _type: 'topBarSettings',
    enabled: true,
    phone: '(602) 252-3926',
    announcement: "Arizona's Premier Construction Association — Since 1934",
    memberLoginLabel: 'Member Login',
    memberLoginUrl: 'https://membersonly.azagc.org',
  },
  header: {
    _type: 'headerSettings',
    navigationItems: headerNavigationItems.map(toHeaderItem),
    primaryCtaLabel: 'Join Now',
    primaryCtaHref: '/join',
  },
  footer: {
    _type: 'footerSettings',
    description:
      'The Arizona Chapter of the Associated General Contractors of America. Building Arizona safer, better, together since 1934.',
    socialLinks: validFooterSocialLinks.map(toSocialLink),
    linkGroups: footerLinkGroups.map(toFooterGroup),
    copyrightText: '© {{year}} Arizona Chapter AGC. All rights reserved.',
    bottomCtaLabel: 'Become a Member',
    bottomCtaHref: '/join',
  },
}

async function run() {
  const publishedDoc = {
    _id: 'siteSettings',
    ...siteSettingsData,
  }

  const draftDoc = {
    _id: 'drafts.siteSettings',
    ...siteSettingsData,
  }

  const result = await client
    .transaction()
    .createOrReplace(publishedDoc)
    .createOrReplace(draftDoc)
    .commit({ visibility: 'sync' })

  const savedDocs = await client.getDocuments(['siteSettings', 'drafts.siteSettings'])
  const [savedPublishedDoc, savedDraftDoc] = savedDocs

  console.log(`Imported site settings into Sanity project ${projectId}, dataset ${dataset}.`)
  console.log(`Header nav items: ${headerNavigationItems.length}`)
  console.log(`Footer link groups: ${footerLinkGroups.length}`)
  console.log(`Footer social links: ${validFooterSocialLinks.length} imported (${footerSocialLinks.length - validFooterSocialLinks.length} placeholder link skipped).`)
  console.log(`Mutation transaction id: ${result.transactionId}`)
  console.log(`Published doc present: ${savedPublishedDoc ? 'yes' : 'no'}`)
  console.log(`Draft doc present: ${savedDraftDoc ? 'yes' : 'no'}`)
}

run().catch((error) => {
  console.error('Failed to import site settings.')
  console.error(error)
  process.exit(1)
})
