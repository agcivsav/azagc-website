'use client'
/**
 * Embedded Sanity Studio at /studio
 * Access: azagc.org/studio
 */
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
