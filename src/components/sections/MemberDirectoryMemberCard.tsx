import MemberDirectoryLogo from "@/components/sections/MemberDirectoryLogo";
import type { MemberDirectoryItem } from "@/components/sections/MemberDirectoryGrid";

interface MemberDirectoryMemberCardProps {
  member: MemberDirectoryItem;
}

export function MemberDirectoryMemberCard({ member }: MemberDirectoryMemberCardProps) {
  const hasWebsite =
    member.website &&
    typeof member.website === "string" &&
    member.website.startsWith("http");

  return (
    <li className="group flex flex-col bg-cream border border-warm-gray rounded-xl p-6 md:p-8 hover:border-navy/20 hover:shadow-md transition-all duration-200">
      <div className="flex flex-col items-start gap-4">
        {member.logoUrl ? (
          <MemberDirectoryLogo logoUrl={member.logoUrl} businessName={member.businessName} />
        ) : (
          <div className="h-14 flex items-center">
            <span className="font-normal text-lg text-navy">{member.businessName}</span>
          </div>
        )}
        {member.logoUrl && (
          <h3 className="font-normal text-lg text-navy leading-snug">{member.businessName}</h3>
        )}
        {member.address && (
          <p className="font-body text-sm text-slate leading-relaxed">{member.address}</p>
        )}
        {member.phone && (
          <a
            href={`tel:${member.phone.replace(/\D/g, "")}`}
            className="font-body text-sm text-red hover:text-navy transition-colors no-underline"
          >
            {member.phone}
          </a>
        )}
        {hasWebsite && (
          <a
            href={member.website!}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body font-semibold text-xs uppercase tracking-wide text-red hover:text-navy transition-colors no-underline inline-flex items-center gap-1 mt-auto"
          >
            Visit Website
            <span aria-hidden>→</span>
          </a>
        )}
      </div>
    </li>
  );
}
