'use client'

import TakeActionSection, { type TakeActionTab } from '@/components/sections/TakeActionSection'

function slug(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export type PageBuilderTabItem = {
  title: string
  content?: string | null
  imageUrl?: string | null
}

interface PageBuilderTabsProps {
  heading: string
  intro?: string | null
  tabs: PageBuilderTabItem[]
  className?: string
}

export default function PageBuilderTabs({
  heading,
  intro = '',
  tabs,
  className,
}: PageBuilderTabsProps) {
  const takeActionTabs: TakeActionTab[] = tabs.map((t) => ({
    label: t.title,
    value: slug(t.title) || `tab-${t.title.length}`,
    content: t.content ?? null,
    imageUrl: t.imageUrl ?? null,
  }))
  return (
    <TakeActionSection
      heading={heading}
      intro={intro ?? ''}
      tabs={takeActionTabs}
      className={className}
    />
  )
}
