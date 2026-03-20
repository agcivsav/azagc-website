import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "AZAGC accessibility statement and our commitment to digital inclusion.",
};

export default function Page() {
  return (
    <>
      {/* ── BREADCRUMB ─────────────────────────────────────────── */}
      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <Link
            href="/"
            className="hover:text-navy transition-colors no-underline"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href="/accessibility-statement"
            className="hover:text-navy transition-colors no-underline"
          >
            Accessibility Statement
          </Link>
        </div>
      </div>

      {/* ── PAGE HEADER ─────────────────────────────────────────── */}
      <section className="bg-navy py-16">
        <div className="container-site">
          <SectionLabel color="gold" className="mb-3">
            AZAGC
          </SectionLabel>
          <SectionTitle as="h1" className="text-white">
            Accessibility Statement
          </SectionTitle>
          <p className="font-body text-white/60 mt-3 max-w-2xl text-base">
            {/* TODO: Pull from Sanity siteSettings or page.heroSubtitle */}
            AZAGC accessibility statement and our commitment to digital
            inclusion.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ────────────────────────────────────────── */}
      <section className="bg-cream py-16">
        <div className="container-site max-w-4xl">
          {/* TODO: Add <PortableTextRenderer blocks={page.body} /> once Sanity is connected */}
          <div className="bg-white border border-warm-gray p-10">
            <p className="font-body text-slate text-sm text-center">
              Content managed via{" "}
              <Link href="/studio" className="text-red hover:underline">
                /studio
              </Link>{" "}
              — connect Sanity to populate this section.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
