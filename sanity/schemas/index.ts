// Document schemas
import { pageSchema } from './page'
import { memberDirectorySchema } from './member-directory'
import { eventSchema } from './event'
import { teamMemberSchema } from './teamMember'
import { siteSettingsSchema } from './siteSettings'
import { newsArticleSchema } from './newsArticle'
import { committeeSchema } from './committee'
import { homePageSingleton } from './singletons/homePage'
import { policyPrioritySchema } from './policyPriority'
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
import { teamSectionObject } from './objects/teamSection'
import { teamSectionByRole } from './objects/teamSectionByRole'
import { hero } from './objects/pageBuilderHero'
import { contentSection } from './objects/contentSection'
import { imageContent } from './objects/imageContent'
import { awardSection } from './objects/awardSection'
import { videoSection } from './objects/videoSection'
import { splitContentSection } from './objects/splitContentSection'
import { splitImagesSection } from './objects/splitImagesSection'
import { resourceLinksSection } from './objects/resourceLinksSection'
import { simpleContentObject } from './objects/simpleContent'
// Singletons
import { testimonialsPage } from './singletons/testimonialsPage'
import { newsMediaPageSingleton } from './singletons/newsMediaPage'
import { newsSection } from './objects/newsSection'
import { tabsSection } from './objects/tabsSection'
import { memberDirectoryPageSingleton } from './singletons/membershipPage'
import { ctaBandSingleton } from './singletons/ctaBand'
import button from './objects/button'
import { featuresSection } from './objects/featuresSection'
import { servicesSection } from './objects/servicesSection'
import { formSection } from './objects/formSection'
import { committeesSection } from './objects/commiteSection'
import { carouselSection } from './objects/carouselSection'

export const schemaTypes = [
  // Core documents
  pageSchema,
  siteSettingsSchema,
  // Content
  memberDirectorySchema,
  newsArticleSchema,
  eventSchema,
  // Membership
  // People & orgs
  teamMemberSchema,
  committeeSchema,
  // Advocacy
  policyPrioritySchema,
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
  teamSectionByRole,
  simpleContentObject,
  featuresSection,
  servicesSection,
  formSection,
  committeesSection,
  carouselSection,
  // Singletons
  // navigationSingleton,
  // seoDefaultsSingleton,
  homePageSingleton,
  testimonialsPage,
  // policyPrioritiesPageSingleton,
  // takeActionPageSingleton,
  // voterToolsPageSingleton,
  // contributePageSingleton,
  // membershipCard,
  hero,
  contentSection,
  imageContent,
  awardSection,
  videoSection,
  splitContentSection,
  splitImagesSection,
  resourceLinksSection,
  newsSection,
  // pageBuilderEventsListObject,
  tabsSection,
  memberDirectoryPageSingleton,
  // advocacyPageSingleton,
  // educationTrainingPageSingleton,
  // workforceDevelopmentPageSingleton,
  // apprenticeshipProgramsPageSingleton,
  // erosionControlTrainingPageSingleton,
  // agcOfAmericaEducationPageSingleton,
  // studentResourcesPageSingleton,
  // industryResourcesPageSingleton,
  // transportationInfrastructurePageSingleton,
  // environmentPageSingleton,
  // laborHrPageSingleton,
  // safetyPageSingleton,
  newsMediaPageSingleton,
  // eventsCalendarPageSingleton,
  ctaBandSingleton,

  button,
]
