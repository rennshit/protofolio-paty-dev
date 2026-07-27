import * as Icons from "lucide-react";
import GlassCard from "../components/GlassCard";
import SectionHeading from "../components/SectionHeading";
import { siteConfig } from "../config/siteConfig";

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <SectionHeading
          eyebrow="Services"
          title="What we work on."
          description="Lima bidang utama tempat Respaty Dev membangun solusi digital, dari ide hingga sistem yang berjalan."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.services.map((service) => {
            const Icon = Icons[service.icon] || Icons.Code2;
            return (
              <GlassCard key={service.id} hover className="p-6">
                <div className="glow-ring flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-secondary" />
                </div>
                <h3 className="mt-5 font-display text-base font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
