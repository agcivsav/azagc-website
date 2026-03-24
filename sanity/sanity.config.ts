import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

import { netlifyWidget } from 'sanity-plugin-dashboard-widget-netlify'
import { dashboardTool, projectInfoWidget } from '@sanity/dashboard'

export default defineConfig({
  name: 'azagc',
  title: 'AZAGC Website',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0ez9wjpc',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('AZAGC Content')
          .items([
            S.listItem()
              .title('Homepage')
              .child(S.document().schemaType('homePage').documentId('homePage')),

            S.listItem()
              .title('Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

            S.listItem()
              .title('Member Directory Page')
              .child(S.document().schemaType('memberDirectoryPage').documentId('memberDirectoryPage')),

            S.listItem()
              .title('News & Media Page')
              .child(S.document().schemaType('newsMediaPage').documentId('newsMediaPage')),

            S.listItem()
              .title('News Media Policy Page')
              .child(S.document().schemaType('newsMediaPolicyPage').documentId('newsMediaPolicyPage')),


            // S.listItem()
            //   .title('Take Action Page')
            //   .child(S.document().schemaType('takeActionPage').documentId('takeActionPage')),

            // S.listItem()
            //   .title('Voter Tools Page')
            //   .child(S.document().schemaType('voterToolsPage').documentId('voterToolsPage')),

            // S.listItem()
            //   .title('Contribute Page')
            //   .child(S.document().schemaType('contributePage').documentId('contributePage')),

            // S.listItem()
            //   .title('Workforce Development Page')
            //   .child(S.document().schemaType('workforceDevelopmentPage').documentId('workforceDevelopmentPage')),

            // S.listItem()
            //   .title('Apprenticeship Programs Page')
            //   .child(S.document().schemaType('apprenticeshipProgramsPage').documentId('apprenticeshipProgramsPage')),

            // S.listItem()
            //   .title('Erosion Control Training Page')
            //   .child(S.document().schemaType('erosionControlTrainingPage').documentId('erosionControlTrainingPage')),

            // S.listItem()
            //   .title('AGC of America Education Page')
            //   .child(S.document().schemaType('agcOfAmericaEducationPage').documentId('agcOfAmericaEducationPage')),

            // S.listItem()
            //   .title('Student Resources Page')
            //   .child(S.document().schemaType('studentResourcesPage').documentId('studentResourcesPage')),

            // S.listItem()
            //   .title('Industry Resources Page')
            //   .child(S.document().schemaType('industryResourcesPage').documentId('industryResourcesPage')),

            // S.listItem()
            //   .title('Transportation & Infrastructure Page')
            //   .child(S.document().schemaType('transportationInfrastructurePage').documentId('transportationInfrastructurePage')),

            // S.listItem()
            //   .title('Environment Page')
            //   .child(S.document().schemaType('environmentPage').documentId('environmentPage')),

            // S.listItem()
            //   .title('Labor & HR Page')
            //   .child(S.document().schemaType('laborHrPage').documentId('laborHrPage')),

            // S.listItem()
            //   .title('Safety Page')
            //   .child(S.document().schemaType('safetyPage').documentId('safetyPage')),


            // S.listItem()
            //   .title('Events Calendar Page')
            //   .child(S.document().schemaType('eventsCalendarPage').documentId('eventsCalendarPage')),

            // S.listItem()
            //   .title('Membership Page')
            //   .child(S.document().schemaType('membershipPage').documentId('membershipPage')),

            // S.listItem()
            //   .title('Advocacy Page')
            //   .child(S.document().schemaType('advocacyPage').documentId('advocacyPage')),

            // S.listItem()
            //   .title('Education & Training Page')
            //   .child(S.document().schemaType('educationTrainingPage').documentId('educationTrainingPage')),

            S.divider(),

            S.listItem()
              .title('Pages')
              .child(S.documentTypeList('page').title('Pages')),

            S.listItem()
              .title('News Articles')
              .child(S.documentTypeList('newsArticle').title('News Articles')),

            S.listItem()
              .title('News Media Policies')
              .child(S.documentTypeList('newsMediaPolicies').title('News Media Policies')),

            S.listItem()
              .title('Events')
              .child(S.documentTypeList('agcEvent').title('Events')),

            S.listItem()
              .title('Member Directory')
              .child(S.documentTypeList('memberDirectory').title('Member Directory')),

            S.divider(),



            S.listItem()
              .title('Team Members')
              .child(S.documentTypeList('teamMember').title('Team Members')),

            S.listItem()
              .title('Testimonials')
              .child(S.documentTypeList('testimonial').title('Testimonials')),

            S.listItem()
              .title('Committees')
              .child(S.documentTypeList('committee').title('Committees')),

            S.divider(),

            S.listItem()
              .title('Policy Priorities')
              .child(S.documentTypeList('policyPriority').title('Policy Priorities')),

            S.divider(),

            ...S.documentTypeListItems().filter(
              (item) =>
                ![
                  'homePage',
                  'siteSettings',
                  'page',
                  'newsMediaPage',
                  'newsMediaPolicyPage',
                  'memberDirectoryPage',
                  'eventsCalendarPage',
                  'membershipPage',
                  'advocacyPage',
                  'educationTrainingPage',
                  'agcEvent',
                  'newsArticle',
                  'newsMediaPolicies',
                  'memberDirectory',
                  'testimonial',
                  'teamMember',
                  'testimonial',
                  'committee',
                  'policyPriority',
                ].includes(item.getId()!)
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
    dashboardTool({
      widgets: [
        netlifyWidget({
          title: 'AZAGC Website',
          sites: [
            {
              title: 'AZAGC Website',
              apiId: 'a17c19bb-bace-4e8b-bde1-7aca91df711a',
              buildHookId: '69c2d219f570cbc2151b32be',
              name: 'azagc-website',
              url: 'https://azagc.netlify.app/',
              branch: 'main',
            },
          ],
        }),
        projectInfoWidget(),
      ]
    })
  ],
  schema: {
    types: schemaTypes,
  },
})
