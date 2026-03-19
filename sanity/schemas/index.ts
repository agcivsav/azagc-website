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
import { membershipCard } from './objects/cards'
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
import { navigationSingleton } from './singletons/navigation'
import { testimonialsPage } from './singletons/testimonialsPage'
import { policyPrioritiesPageSingleton } from './singletons/policyPrioritiesPage'
import { workforceDevelopmentPageSingleton } from './singletons/workforceDevelopmentPage'
import { apprenticeshipProgramsPageSingleton } from './singletons/apprenticeshipProgramsPage'
import { erosionControlTrainingPageSingleton } from './singletons/erosionControlTrainingPage'
import { agcOfAmericaEducationPageSingleton } from './singletons/agcOfAmericaEducationPage'
import { environmentPageSingleton } from './singletons/environmentPage'
import { newsMediaPageSingleton } from './singletons/newsMediaPage'
import { eventsCalendarPageSingleton } from './singletons/eventsCalendarPage'
import { newsSection } from './objects/newsSection'
import { pageBuilderEventsListObject } from './objects/pageBuilderEventsList'
import { tabsSection } from './objects/tabsSection'
import { pageBuilderAwardWinnersListObject } from './objects/pageBuilderAwardWinnersList'
import { membershipPageSingleton } from './singletons/membershipPage'
import { ctaBandSingleton } from './singletons/ctaBand'
import button from './objects/button'
import { featuresSection } from './objects/featuresSection'
import { servicesSection } from './objects/servicesSection'
import { formSection } from './objects/formSection'
import { committeesSection } from './objects/commiteSection'

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
  // Singletons
  // navigationSingleton,
  // seoDefaultsSingleton,
  // homePageSingleton,
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
  // membershipPageSingleton,
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
