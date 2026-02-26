// Document schemas
import { pageSchema } from './page'
import { postSchema } from './post'
import { eventSchema } from './event'
import { teamMemberSchema } from './teamMember'
import { sponsorSchema } from './sponsor'
import { siteSettingsSchema } from './siteSettings'
import { testimonialSchema } from './testimonial'
import { membershipTypeSchema } from './membershipType'
import { newsArticleSchema } from './newsArticle'
import { committeeSchema } from './committee'
import { policyPrioritySchema } from './policyPriority'
import { educationProgramSchema } from './educationProgram'
import { resourceArticleSchema } from './resourceArticle'
import { faqItemSchema } from './faqItem'

// Object schemas
import { seoObject } from './objects/seo'
import { blockContentObject } from './objects/blockContent'
import { ctaBlockObject } from './objects/ctaBlock'
import { internalLinkObject } from './objects/internalLink'

// Singletons
import { navigationSingleton } from './singletons/navigation'
import { seoDefaultsSingleton } from './singletons/seoDefaults'

export const schemaTypes = [
  // Core documents
  pageSchema,
  siteSettingsSchema,
  // Content
  postSchema,
  newsArticleSchema,
  eventSchema,
  // Membership
  membershipTypeSchema,
  testimonialSchema,
  // People & orgs
  teamMemberSchema,
  committeeSchema,
  sponsorSchema,
  // Advocacy
  policyPrioritySchema,
  // Education
  educationProgramSchema,
  // Resources
  resourceArticleSchema,
  faqItemSchema,
  // Objects (reusable)
  seoObject,
  blockContentObject,
  ctaBlockObject,
  internalLinkObject,
  // Singletons
  navigationSingleton,
  seoDefaultsSingleton,
]
