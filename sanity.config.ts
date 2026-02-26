import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/lib/sanity-schemas'

export default defineConfig({
  name: 'azagc',
  title: 'AZAGC Website',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('AZAGC Content')
          .items([
            S.listItem().title('📄 Pages').child(S.documentTypeList('page').title('Pages')),
            S.listItem().title('📰 News & Updates').child(S.documentTypeList('post').title('News & Updates')),
            S.listItem().title('🗓️ Events').child(S.documentTypeList('event').title('Events')),
            S.listItem().title('👥 Team Members').child(S.documentTypeList('teamMember').title('Team')),
            S.listItem().title('🏆 Sponsors').child(S.documentTypeList('sponsor').title('Sponsors')),
            S.listItem().title('⚙️ Site Settings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
          ]),
    }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],
  schema: {
    types: schemaTypes,
  },
})
