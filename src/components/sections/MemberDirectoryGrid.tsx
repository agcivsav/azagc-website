"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Pagination from "@/components/ui/Pagination";
import { MemberDirectoryMemberCard } from "@/components/sections/MemberDirectoryMemberCard";

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
  /** Syncs with URL `?page=` on first load only; paging stays client-side so search/filter stay applied. */
  initialPage?: number;
  perPage?: number;
}

export default function MemberDirectoryGrid({
  members,
  heading,
  className,
  initialPage = 1,
  perPage = 15,
}: MemberDirectoryGridProps) {
  const searchInputId = useId();
  const businessSelectId = useId();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("all");
  const [page, setPage] = useState(() => Math.max(1, initialPage));
  const filtersTouched = useRef(false);

  useEffect(() => {
    setPage(Math.max(1, initialPage));
  }, [initialPage]);

  useEffect(() => {
    if (!filtersTouched.current) return;
    setPage(1);
  }, [search, selected]);

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

  const totalFilteredPages = Math.max(
    1,
    Math.ceil(filteredMembers.length / perPage),
  );
  const displayPage = Math.min(page, totalFilteredPages);

  useEffect(() => {
    if (page > totalFilteredPages) {
      setPage(totalFilteredPages);
    }
  }, [page, totalFilteredPages]);

  const pagedMembers = useMemo(
    () =>
      filteredMembers.slice(
        (displayPage - 1) * perPage,
        displayPage * perPage,
      ),
    [filteredMembers, displayPage, perPage],
  );

  // 🧹 Clear filters
  const clearFilters = () => {
    setSearch("");
    setSelected("all");
    setPage(1);
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
          <div className="flex w-full flex-col gap-1.5 md:w-1/2">
            <label htmlFor={searchInputId} className="font-body text-sm font-medium text-navy">
              Search directory
            </label>
            <input
              id={searchInputId}
              type="search"
              placeholder="Business name, address, or phone"
              value={search}
              onChange={(e) => {
                filtersTouched.current = true;
                setSearch(e.target.value);
              }}
              autoComplete="off"
              className="border border-warm-gray rounded-lg px-4 py-2 w-full focus:outline-none focus:border-navy"
            />
          </div>
<div className="w-full lg:flex justify-end gap-2">
  {/* Dropdown */}
          <div className="flex w-full flex-col gap-1.5 md:w-1/2">
            <label htmlFor={businessSelectId} className="font-body text-sm font-medium text-navy">
              Filter by business
            </label>
            <select
              id={businessSelectId}
              value={selected}
              onChange={(e) => {
                filtersTouched.current = true;
                setSelected(e.target.value);
              }}
              className="border  border-warm-gray rounded-lg px-4 py-2 w-full focus:outline-none focus:border-navy"
            >
            <option value="all">All Business</option>
            {members.map((member) => (
              <option key={member._id} value={member.businessName}>
                {member.businessName}
              </option>
            ))}
          </select>
          </div>

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
            {pagedMembers.map((member) => (
              <MemberDirectoryMemberCard key={member._id} member={member} />
            ))}
          </ul>
        )}

        {filteredMembers.length > 0 ? (
          <Pagination
            mode="buttons"
            currentPage={displayPage}
            totalPages={totalFilteredPages}
            onPageChange={setPage}
            ariaLabel="Member directory pagination"
            className="pt-0"
          />
        ) : null}
      </div>
    </section>
  );
}