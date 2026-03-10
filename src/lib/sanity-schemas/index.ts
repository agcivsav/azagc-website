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
import { homePageSingleton } from './singletons/homePage'
import { policyPrioritySchema } from './policyPriority'
import { educationProgramSchema } from './educationProgram'
import { resourceArticleSchema } from './resourceArticle'
import { faqItemSchema } from './faqItem'

// Object schemas
import { seoObject } from './objects/seo'
import { blockContentObject } from './objects/blockContent'
import { ctaBlockObject } from './objects/ctaBlock'
import { internalLinkObject } from './objects/internalLink'
import { homeHeroObject } from './objects/homeHero'
import { promotionBarObject } from './objects/promotionBar'
import { homeMembershipSectionObject } from './objects/homeMembershipSection'
import { homeEventsSectionObject } from './objects/homeEventsSection'
import { homeNewsSectionObject } from './objects/homeNewsSection'
import { homeBottomCtaObject } from './objects/homeBottomCta'
import { homeBenefitsSectionObject } from './objects/homeBenefitsSection'
import { membershipCard } from './objects/cards'
import { teamSectionObject } from './objects/teamSection'
// Singletons
import { navigationSingleton } from './singletons/navigation'
import { seoDefaultsSingleton } from './singletons/seoDefaults'
import { ourTeamPageSingleton } from './singletons/ourTeamPage'
import { testimonialsPageSingleton } from './singletons/testimonialsPage'
import { committeesPageSingleton } from './singletons/committeesPage'
import { policyPrioritiesPageSingleton } from './singletons/policyPrioritiesPage'
import { takeActionPageSingleton } from './singletons/takeActionPage'
import { voterToolsPageSingleton } from './singletons/voterToolsPage'
import { contributePageSingleton } from './singletons/contributePage'

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
  homeHeroObject,
  promotionBarObject,
  homeMembershipSectionObject,
  homeEventsSectionObject,
  homeNewsSectionObject,
  homeBottomCtaObject,
  homeBenefitsSectionObject,
  teamSectionObject,
  // Singletons
  navigationSingleton,
  seoDefaultsSingleton,
  homePageSingleton,
  ourTeamPageSingleton,
  testimonialsPageSingleton,
  committeesPageSingleton,
  policyPrioritiesPageSingleton,
  takeActionPageSingleton,
  voterToolsPageSingleton,
  contributePageSingleton,
  membershipCard,
]
