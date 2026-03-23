import { ICTABand } from "@/types/common";
import Button from "../layout/Button";

interface CTABandProps {
  content: ICTABand;
}

export default function CTABand({ content }: CTABandProps) {
  return (
    <section className="bg-primary py-14">
      <div className="container-site flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="text-center lg:text-left">
          <h2 className="font-normal text-3xl text-white mb-2">
            {content.headline}
          </h2>
          <p className="font-body text-white/80 text-base max-w-xl">
            {content.subtext}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          {content.button?.label && (
            <Button button={content.button} variant="secondary" />
          )}
          {content.button2?.label && (
            <Button button={content.button2} variant="dark" />
          )}
        </div>
      </div>
    </section>
  );
}
