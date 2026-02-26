import { pageSchema } from './page'
import { postSchema } from './post'
import { eventSchema } from './event'
import { teamMemberSchema } from './teamMember'
import { sponsorSchema } from './sponsor'
import { siteSettingsSchema } from './siteSettings'

export const schemaTypes = [
  pageSchema,
  postSchema,
  eventSchema,
  teamMemberSchema,
  sponsorSchema,
  siteSettingsSchema,
]
