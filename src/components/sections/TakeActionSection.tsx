'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export type TakeActionTab = {
  label: string
  value: string
  content?: string | null
  imageUrl?: string | null
}

interface TakeActionSectionProps {
  heading: string
  intro: string
  tabs: TakeActionTab[]
  className?: string
}

export default function TakeActionSection({
  heading,
  intro,
  tabs,
  className,
}: TakeActionSectionProps) {
  const [activeValue, setActiveValue] = useState(tabs[0]?.value ?? '')
  const activeTab = tabs.find((t) => t.value === activeValue) ?? tabs[0]
  const hasContent = tabs.some((t) => t.content && t.content.trim())

  if (!tabs.length) return null

  return (
    <section className={cn('bg-white py-16', className)} aria-labelledby="take-action-heading">
      <div className="container-site max-w-4xl">
        <h2 id="take-action-heading" className="font-normal text-3xl text-navy mb-4">
          {heading}
        </h2>
        <p className="font-body text-slate text-base leading-relaxed mb-10">{intro}</p>

        <div role="tablist" aria-label="Action categories" className="border-b border-warm-gray">
          <div className="flex flex-wrap gap-1 -mb-px">
            {tabs.map((tab) => {
              const isActive = activeValue === tab.value
              return (
                <button
                  key={tab.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.value}`}
                  id={`tab-${tab.value}`}
                  onClick={() => setActiveValue(tab.value)}
                  className={cn(
                    'font-body text-sm font-semibold px-4 py-3 border-b-2 transition-colors min-h-[44px]',
                    isActive
                      ? 'border-navy text-navy'
                      : 'border-transparent text-slate hover:text-navy hover:border-warm-gray',
                  )}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        <div
          id={`panel-${activeValue}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeValue}`}
          className="mt-8 min-h-[200px]"
        >
          {activeTab?.imageUrl && (
            <div className="relative w-full max-w-2xl aspect-video mb-6 rounded-xl overflow-hidden bg-warm-gray/30">
              <Image
                src={activeTab.imageUrl}
                alt=""
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
          )}
          {activeTab?.content?.trim() ? (
            <div className="font-body text-slate text-base leading-relaxed whitespace-pre-wrap">
              {activeTab.content}
            </div>
          ) : hasContent ? (
            <p className="font-body text-slate/70">No content for this tab yet.</p>
          ) : !activeTab?.imageUrl ? (
            <div className="border border-warm-gray rounded-xl p-10 text-center">
              <p className="font-body text-slate text-sm">Add content or an image for this tab in Sanity.</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
