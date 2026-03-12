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
    <section className={cn('bg-white py-20', className)}>
      <div className="container-site max-w-5xl">

        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-4">
            {heading}
          </h2>
          <p className="text-slate leading-relaxed max-w-2xl">
            {intro}
          </p>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          className="flex flex-wrap gap-3 mb-10"
        >
          {tabs.map((tab) => {
            const isActive = activeValue === tab.value

            return (
              <button
                key={tab.value}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveValue(tab.value)}
                className={cn(
                  "px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200",
                  isActive
                    ? "bg-navy text-white shadow-md"
                    : "bg-warm-gray/40 text-slate hover:bg-warm-gray"
                )}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content Card */}
        <div className="bg-white border border-warm-gray/40 rounded-2xl p-6 md:p-8 shadow-sm">

          {activeTab?.imageUrl && (
            <div className="relative w-full mb-6 rounded-xl overflow-hidden bg-warm-gray/20">
              <Image
                src={activeTab.imageUrl}
                alt=""
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
              />
            </div>
          )}

          {activeTab?.content?.trim() ? (
            <div className="text-slate leading-relaxed whitespace-pre-wrap">
              {activeTab.content}
            </div>
          ) : hasContent ? (
            <p className="text-slate/60">No content for this tab yet.</p>
          ) : !activeTab?.imageUrl ? (
            <div className="border border-dashed border-warm-gray rounded-xl p-10 text-center">
              <p className="text-slate text-sm">
                Add content or an image for this tab in Sanity.
              </p>
            </div>
          ) : null}

        </div>

      </div>
    </section>
  )
}