"use client";

import Image from "next/image";

type Props = {
  logoUrl: string;
  businessName: string;
};

export default function MemberDirectoryLogo({
  logoUrl,
  businessName,
}: Props) {
  return (
    <div className="w-full max-w-[240px] min-h-[3.5rem] flex items-center justify-start overflow-visible">
      <Image
        src={logoUrl}
        alt={`${businessName} logo`}
        width={800}
        height={400}
        quality={90}
        className="h-auto w-auto max-h-32 md:max-h-36 max-w-full object-contain object-left overflow-visible"
        sizes="(max-width: 768px) min(85vw, 320px), 240px"
      />
    </div>
  );
}
