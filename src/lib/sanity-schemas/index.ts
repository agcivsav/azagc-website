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
import { teamImageCardSectionObject } from './objects/teamImageCardSection'
import { pageBuilderHeroObject } from './objects/pageBuilderHero'
import { pageBuilderTextBlockObject } from './objects/pageBuilderTextBlock'
import { pageBuilderTwoColumnObject } from './objects/pageBuilderTwoColumn'
import { pageBuilderStaffListObject } from './objects/pageBuilderStaffList'
import { pageBuilderVideoObject } from './objects/pageBuilderVideo'
import { pageBuilderCourseCardObject } from './objects/pageBuilderCourseCard'
import { pageBuilderTwoImagesObject } from './objects/pageBuilderTwoImages'
import { pageBuilderResourceLinksObject } from './objects/pageBuilderResourceLinks'
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
import { aboutPageSingleton } from './singletons/aboutPage'
import { awardsPageSingleton } from './singletons/awardsPage'
import { pageBuilderNewsGridObject } from './objects/pageBuilderNewsGrid'
import { pageBuilderEventsListObject } from './objects/pageBuilderEventsList'
import { pageBuilderTabsObject } from './objects/pageBuilderTabs'
import { pageBuilderAwardWinnersListObject } from './objects/pageBuilderAwardWinnersList'
import { membershipPageSingleton } from './singletons/membershipPage'
import { advocacyPageSingleton } from './singletons/advocacyPage'
import { educationTrainingPageSingleton } from './singletons/educationTrainingPage'

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
  teamImageCardSectionObject,
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
  pageBuilderHeroObject,
  pageBuilderTextBlockObject,
  pageBuilderTwoColumnObject,
  pageBuilderStaffListObject,
  pageBuilderVideoObject,
  pageBuilderCourseCardObject,
  pageBuilderTwoImagesObject,
  pageBuilderResourceLinksObject,
  pageBuilderNewsGridObject,
  pageBuilderEventsListObject,
  pageBuilderTabsObject,
  pageBuilderAwardWinnersListObject,
  aboutPageSingleton,
  awardsPageSingleton,
  membershipPageSingleton,
  advocacyPageSingleton,
  educationTrainingPageSingleton,
  workforceDevelopmentPageSingleton,
  apprenticeshipProgramsPageSingleton,
  erosionControlTrainingPageSingleton,
  agcOfAmericaEducationPageSingleton,
  studentResourcesPageSingleton,
  industryResourcesPageSingleton,
  transportationInfrastructurePageSingleton,
  environmentPageSingleton,
  laborHrPageSingleton,
  safetyPageSingleton,
  newsMediaPageSingleton,
  eventsCalendarPageSingleton,
]
