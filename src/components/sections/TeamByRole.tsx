"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { sanityImageUrl, CARD_IMAGE_MAX_WIDTH } from "@/lib/sanity";
import { IButton, ITeamSectionByRole } from "@/types/common";
import PortableText from "../ui/PortableText";
import { PortableTextBlock } from "next-sanity";
import Button from "../layout/Button";
import { useRef, useEffect, useState } from "react";

type CardMember = {
  name: string;
  title?: string;
  company?: string;
  companyName?: string;
  committeeRole?: string | null;
  committeeCompany?: string | null;
  button?: IButton;
  photo?: { asset?: { url?: string } };
};

interface TeamByRoleProps {
  content: ITeamSectionByRole;
  className?: string;
  committeeLabelsOnly?: boolean;
}

function MemberCard({
  member,
  index,
  isVisible,
  committeeLabelsOnly,
}: {
  member: CardMember;
  index: number;
  isVisible: boolean;
  committeeLabelsOnly: boolean;
}) {
  const photoUrl = sanityImageUrl(member.photo, CARD_IMAGE_MAX_WIDTH);
  const company = member.company ?? member.companyName;
  const subtitle = company ?? member.title ?? "";
  const hasMemberButton =
    !!member.button?.label &&
    (member.button.btnType === "none" ||
      (member.button.btnType === "upload" &&
        !!member.button.upload?.asset?.url) ||
      ((member.button.btnType === "internal" ||
        member.button.btnType === "external") &&
        !!member.button.link));

  const roleLine =
    member.committeeRole && String(member.committeeRole).trim()
      ? String(member.committeeRole).trim()
      : null;
  const companyLine =
    member.committeeCompany && String(member.committeeCompany).trim()
      ? String(member.committeeCompany).trim()
      : null;

  const committeePhotoAlt =
    [member.name, roleLine, companyLine].filter(Boolean).join(", ") ||
    "Committee member";
  const committeeInitial =
    member.name?.charAt(0) ??
    roleLine?.charAt(0) ??
    companyLine?.charAt(0) ??
    "?";

  return (
    <article
      className={cn(
        "group bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-400",
        "hover:shadow-[0_12px_40px_-12px_rgba(35,31,32,0.15)] hover:-translate-y-1.5",
        "opacity-0 translate-y-4 transition-all duration-500 ease-out",
        isVisible && "opacity-100 translate-y-0",
      )}
      style={{ transitionDelay: isVisible ? `${index * 60}ms` : "0ms" }}
    >
      <div className="aspect-[4/5] relative bg-warm-gray/40 overflow-hidden">
        {photoUrl ? (
          <>
            <Image
              src={photoUrl}
              alt={committeeLabelsOnly ? committeePhotoAlt : member.name}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-warm-gray/50">
            <span className="font-normal text-5xl text-navy/25">
              {committeeLabelsOnly ? committeeInitial : member.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-navy text-lg leading-tight">
          {member.name}
        </h3>
        {committeeLabelsOnly ? (
          <>
            {roleLine ? (
              <p className="font-body text-sm mt-2 text-slate leading-snug">
                {roleLine}
              </p>
            ) : null}
            {companyLine ? (
              <p
                className={cn(
                  "font-body text-sm text-navy font-semibold leading-snug tracking-tight",
                  roleLine ? "mt-3 border-t border-warm-gray pt-3" : "mt-1",
                )}
              >
                {companyLine}
              </p>
            ) : null}
          </>
        ) : (
          subtitle && (
            <p
              className={cn(
                "font-body text-sm mt-2 flex items-center gap-2",
                company ? "text-red font-medium" : "text-slate",
              )}
            >
              {company && (
                <span
                  className="shrink-0 w-1.5 h-1.5 rounded-full bg-red"
                  aria-hidden
                />
              )}
              {subtitle}
            </p>
          )
        )}

        {!committeeLabelsOnly && hasMemberButton && member.button ? (
          <div className="mt-5">
            <Button button={member.button} variant="primary" />
          </div>
        ) : null}
      </div>
    </article>
  );
}

function RoleGroup({
  role,
  members,
  columns,
  isVisible,
  groupIndex,
  isAlternate,
  committeeLabelsOnly,
}: {
  role: string;
  members: CardMember[];
  columns: "3" | "4";
  isVisible: boolean;
  groupIndex: number;
  isAlternate: boolean;
  committeeLabelsOnly: boolean;
}) {
  const cols =
    columns === "4"
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  const filtered = members.filter((m) => m?.name);

  if (filtered.length === 0) return null;

  return (
    <div
      className={cn(
        "rounded-2xl px-6 py-8 md:px-10 md:py-12 transition-all duration-600 ease-out",
        isAlternate ? "bg-white/80 shadow-sm" : "bg-warm-gray/30",
        "opacity-0 translate-y-6",
        isVisible && "opacity-100 translate-y-0",
      )}
      style={{ transitionDelay: isVisible ? `${groupIndex * 120}ms` : "0ms" }}
    >
      <div className="flex items-center gap-4 mb-8">
        <span className="inline-block px-4 py-1.5 rounded-full bg-navy text-white font-body text-xs font-semibold uppercase tracking-wider">
          {role}
        </span>
        <div className="flex-1 h-px bg-warm-gray" aria-hidden />
      </div>
      <ul
        className={cn("grid gap-6", cols)}
        aria-label={`Team members: ${role}`}
      >
        {filtered.map((member, i) => (
          <li key={`${member.name}-${i}`}>
            <MemberCard
              member={member}
              index={i}
              isVisible={isVisible}
              committeeLabelsOnly={committeeLabelsOnly}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TeamByRole({
  content,
  className,
  committeeLabelsOnly = false,
}: TeamByRoleProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0, rootMargin: "80px 0px 120px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const groups =
    content.teamByRole?.filter((g) => g?.role && g?.members?.length) ?? [];

  if (groups.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className={cn("py-10 md:py-5 bg-cream", className)}
      aria-label={content.sectionTitle || "Team by role"}
    >
      <div className="container-site">
        <div className="mb-12 md:mb-16">
          {content.sectionTitle && (
            <h2 className="font-normal text-2xl md:text-3xl text-navy mb-4">
              {content.sectionTitle}
            </h2>
          )}
          {content.description && (
            <div className="font-body text-slate text-base max-w-2xl leading-relaxed">
              <PortableText
                value={content.description as PortableTextBlock[]}
              />
            </div>
          )}
        </div>

        <div className="space-y-6 md:space-y-8">
          {groups.map((group, idx) => (
            <RoleGroup
              key={group.role}
              role={group.role}
              members={(group.members ?? []) as CardMember[]}
              columns={content.columns ?? "3"}
              isVisible={isVisible}
              groupIndex={idx}
              isAlternate={idx % 2 === 0}
              committeeLabelsOnly={committeeLabelsOnly}
            />
          ))}
        </div>

        {content.button?.label && (
          <div className="mt-12">
            <Button button={content.button} variant="primary" />
          </div>
        )}
      </div>
    </section>
  );
}
