import { cn } from "@/lib/utils";
import MemberDirectoryLogo from "@/components/sections/MemberDirectoryLogo";

export type MemberDirectoryItem = {
  _id: string;
  businessName: string;
  logoUrl?: string | null;
  website?: string | null;
  address?: string | null;
  phone?: string | null;
};

interface MemberDirectoryGridProps {
  members: MemberDirectoryItem[];
  heading?: string | null;
  className?: string;
}

export default function MemberDirectoryGrid({
  members,
  heading,
  className,
}: MemberDirectoryGridProps) {
  return (
    <section className={cn("bg-white py-12 md:py-16", className)}>
      <div className="container-site">
        {heading && (
          <h2 className="font-normal text-2xl text-navy mb-10">{heading}</h2>
        )}
        {members.length === 0 ? (
          <p className="font-body text-slate text-center py-12">
            No members in the directory yet. Add content in Sanity under Member
            Directory.
          </p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {members.map((member) => {
              const hasWebsite =
                member.website &&
                typeof member.website === "string" &&
                member.website.startsWith("http");

              return (
                <li
                  key={member._id}
                  className="group flex flex-col bg-cream border border-warm-gray rounded-xl p-6 md:p-8 hover:border-navy/20 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex flex-col items-start gap-4">
                    {member.logoUrl ? (
                      <MemberDirectoryLogo
                        memberId={member._id}
                        logoUrl={member.logoUrl}
                        businessName={member.businessName}
                      />
                    ) : (
                      <div className="h-14 flex items-center">
                        <span className="font-normal text-lg text-navy">
                          {member.businessName}
                        </span>
                      </div>
                    )}
                    {member.logoUrl && (
                      <h3 className="font-normal text-lg text-navy leading-snug">
                        {member.businessName}
                      </h3>
                    )}
                    {member.address && (
                      <p className="font-body text-sm text-slate leading-relaxed">
                        {member.address}
                      </p>
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
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
