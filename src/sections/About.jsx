import GlassCard from "../components/GlassCard";
import SectionHeading from "../components/SectionHeading";
import Logo from "../components/Logo";
import { siteConfig } from "../config/siteConfig";

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <SectionHeading
          eyebrow="About"
          title="A student team, run like a real studio."
          description="Respaty Dev adalah tim kreatif dan developer yang dibangun oleh siswa SMK Respati 1. Kami menggabungkan kemampuan programming, backend system, design, dan ide kreatif untuk membuat berbagai project digital."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <GlassCard className="p-8">
            <p className="text-[15px] leading-relaxed text-muted">
              Kami percaya bahwa project yang bagus bukan hanya tentang kode, tetapi juga tentang
              ide, desain, sistem, dan pengalaman pengguna.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-3">
                <Logo src={siteConfig.school.logo} alt={siteConfig.school.name} size="md" />
                <div>
                  <p className="text-sm font-semibold">{siteConfig.school.name}</p>
                  <p className="text-xs text-muted">Origin school</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Logo src={siteConfig.team.logo} alt={siteConfig.team.name} size="md" glow />
                <div>
                  <p className="text-sm font-semibold">{siteConfig.team.name}</p>
                  <p className="text-xs text-muted">Developer team</p>
                </div>
              </div>
            </div>
          </GlassCard>

          <div className="grid grid-cols-2 gap-4">
            {siteConfig.stats.map((s) => (
              <GlassCard key={s.label} hover className="flex flex-col justify-center p-6">
                <p className="font-display text-2xl font-bold text-gradient">{s.value}</p>
                <p className="mt-1 text-xs text-muted">{s.label}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
