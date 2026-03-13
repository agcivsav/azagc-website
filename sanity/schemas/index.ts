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
import { seoDefaultsSingleton } from './singletons/seoDefaults'
import { ourTeamPage } from './singletons/ourTeamPage'
import { testimonialsPage } from './singletons/testimonialsPage'
import { committeesPage } from './singletons/committeesPage'
import { policyPrioritiesPageSingleton } from './singletons/policyPrioritiesPage'
import { takeActionPageSingleton } from './singletons/takeActionPage'
import { voterToolsPageSingleton } from './singletons/voterToolsPage'
import { contributePageSingleton } from './singletons/contributePage'
import { workforceDevelopmentPageSingleton } from './singletons/workforceDevelopmentPage'
import { apprenticeshipProgramsPageSingleton } from './singletons/apprenticeshipProgramsPage'
import { erosionControlTrainingPageSingleton } from './singletons/erosionControlTrainingPage'
import { agcOfAmericaEducationPageSingleton } from './singletons/agcOfAmericaEducationPage'
import { studentResourcesPageSingleton } from './singletons/studentResourcesPage'
import { industryResourcesPageSingleton } from './singletons/industryResourcesPage'
import { transportationInfrastructurePageSingleton } from './singletons/transportationInfrastructurePage'
import { environmentPageSingleton } from './singletons/environmentPage'
import { laborHrPageSingleton } from './singletons/laborHrPage'
import { safetyPageSingleton } from './singletons/safetyPage'
import { newsMediaPageSingleton } from './singletons/newsMediaPage'
import { eventsCalendarPageSingleton } from './singletons/eventsCalendarPage'
import { aboutPage } from './singletons/aboutPage'
import { awardsPage } from './singletons/awardsPage'
import { newsSection } from './objects/newsSection'
import { pageBuilderEventsListObject } from './objects/pageBuilderEventsList'
import { tabsSection } from './objects/tabsSection'
import { pageBuilderAwardWinnersListObject } from './objects/pageBuilderAwardWinnersList'
import { membershipPageSingleton } from './singletons/membershipPage'
import { advocacyPageSingleton } from './singletons/advocacyPage'
import { educationTrainingPageSingleton } from './singletons/educationTrainingPage'
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
  ourTeamPage,
  testimonialsPage,
  committeesPage,
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
  aboutPage,
  awardsPage,
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
  // newsMediaPageSingleton,
  // eventsCalendarPageSingleton,
  ctaBandSingleton,

  button,
]
