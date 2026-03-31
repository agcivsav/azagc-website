"use client";

import { useState, useMemo } from "react";
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
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("all");

  // 🔍 Filter logic
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        member.businessName.toLowerCase().includes(search.toLowerCase()) ||
        member.address?.toLowerCase().includes(search.toLowerCase()) ||
        member.phone?.toLowerCase().includes(search.toLowerCase());

      if (selected === "all") return matchesSearch;

      return matchesSearch && member.businessName === selected;
    });
  }, [members, search, selected]);

  // 🧹 Clear filters
  const clearFilters = () => {
    setSearch("");
    setSelected("all");
  };

  return (
    <section className={cn("bg-white py-12 md:py-16", className)}>
      <div className="container-site">
        {heading && (
          <h2 className="font-normal text-2xl text-navy mb-10">
            {heading}
          </h2>
        )}

        {/* 🔍 Search + 📂 Dropdown + 🧹 Clear */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search Business ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-warm-gray rounded-lg px-4 py-2 w-full md:w-1/2 focus:outline-none focus:border-navy"
          />
<div className="w-full lg:flex justify-end gap-2">
  {/* Dropdown */}
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="border  border-warm-gray rounded-lg px-4 py-2 w-full md:w-1/2 focus:outline-none focus:border-navy"
          >
            <option value="all">All Business</option>
            {members.map((member) => (
              <option key={member._id} value={member.businessName}>
                {member.businessName}
              </option>
            ))}
          </select>

          {/* Clear Button */}
          <button
            onClick={clearFilters}
            className="px-4 py-2 lg:mt-0 mt-2 rounded-lg border bg-primary text-white border-warm-gray text-sm font-medium  hover:bg-navy hover:text-white transition-all w-full md:w-auto"
          >
            Clear Filters
          </button>
</div>
        
        </div>

        {/* 🚫 Empty State */}
        {filteredMembers.length === 0 ? (
          <p className="font-body text-slate text-center py-12">
            No matching members found.
          </p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredMembers.map((member) => {
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
                    {/* Logo or Name */}
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

                    {/* Name (if logo exists) */}
                    {member.logoUrl && (
                      <h3 className="font-normal text-lg text-navy leading-snug">
                        {member.businessName}
                      </h3>
                    )}

                    {/* Address */}
                    {member.address && (
                      <p className="font-body text-sm text-slate leading-relaxed">
                        {member.address}
                      </p>
                    )}

                    {/* Phone */}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone.replace(/\D/g, "")}`}
                        className="font-body text-sm text-red hover:text-navy transition-colors no-underline"
                      >
                        {member.phone}
                      </a>
                    )}

                    {/* Website */}
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