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

export const schemaTypes = [
  // Core
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
]
