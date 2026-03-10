'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

export type TeamMemberCard = {
  _id: string
  name: string
  title?: string | null
  companyName?: string | null
  photoUrl?: string | null
}

type TeamCardProps = {
  member: TeamMemberCard
}

function TeamCard({ member }: TeamCardProps) {
  const subtitle = member.companyName ?? member.title ?? ''
  const isCompany = Boolean(member.companyName)
  const photoUrl = member.photoUrl

  return (
    <article className="bg-white rounded-xl overflow-hidden border border-warm-gray transition-all duration-300 hover:shadow-lg hover:border-red/30">
      <div className="aspect-[3/4] relative bg-warm-gray/30">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={member.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-navy/40 font-body text-sm">
            No photo
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-navy text-lg leading-tight">{member.name}</h3>
        {subtitle && (
          <p
            className={cn(
              'font-body text-sm mt-1',
              isCompany && 'border border-red rounded px-2 py-1.5 inline-block text-red font-medium',
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </article>
  )
}

export type TeamSectionData = {
  sectionTitle: string
  description?: string | null
  columns?: string | null
  members: TeamMemberCard[]
}

interface TeamCardsProps {
  section: TeamSectionData
  className?: string
}

export default function TeamCards({ section, className }: TeamCardsProps) {
  const cols = section.columns === '4' ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'
  const members = section.members?.filter((m): m is TeamMemberCard => !!m && !!m.name) ?? []

  if (members.length === 0) return null

  return (
    <section className={cn('py-12', className)}>
      <div className="container-site">
        <h2 className="font-normal text-2xl sm:text-3xl text-navy mb-2">{section.sectionTitle}</h2>
        {section.description && (
          <p className="font-body text-slate text-base mb-8 max-w-2xl">{section.description}</p>
        )}
        <ul className={cn('grid grid-cols-1 gap-6', cols)} aria-label={`Team: ${section.sectionTitle}`}>
          {members.map((member) => (
            <li key={member._id}>
              <TeamCard member={member} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
