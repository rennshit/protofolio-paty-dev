import { Instagram, Github, Youtube, Globe, MessageCircle, Mail, Phone } from "lucide-react";
import GlassCard from "../components/GlassCard";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import { siteConfig, whatsappLink } from "../config/siteConfig";

const TikTokIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M16.6 5.82a4.28 4.28 0 0 1-3.03-2.09h-3.06v12.6a2.55 2.55 0 1 1-1.75-2.42V10.8a5.65 5.65 0 1 0 4.9 5.6v-6.2a7.35 7.35 0 0 0 3.94 1.15V8.25a4.28 4.28 0 0 1-1-.05v-2.4Z" />
  </svg>
);

function SocialGroup({ name, logo, links }) {
  const items = [
    { key: "instagram", icon: Instagram, label: "Instagram", href: links.instagram },
    { key: "tiktok", icon: TikTokIcon, label: "TikTok", href: links.tiktok },
    { key: "youtube", icon: Youtube, label: "YouTube", href: links.youtube },
    { key: "github", icon: Github, label: "GitHub", href: links.github },
    { key: "discord", icon: MessageCircle, label: "Discord", href: links.discord },
    { key: "website", icon: Globe, label: "Website", href: links.website },
  ].filter((i) => i.href);

  return (
    <GlassCard className="p-6">
      <h3 className="font-display text-sm font-semibold">{name}</h3>
      {items.length === 0 ? (
        <p className="mt-4 text-xs text-muted">No social links added yet.</p>
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          {items.map(({ key, icon: Icon, label, href }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-border/10 px-3 py-1.5 text-xs text-muted transition-colors hover:border-secondary/40 hover:text-secondary"
            >
              <Icon className="h-3.5 w-3.5" /> {label}
            </a>
          ))}
        </div>
      )}
    </GlassCard>
  );
}

export default function Contact() {
  const wa = whatsappLink();

  return (
    <section id="contact" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <SectionHeading
          eyebrow="Connect With Us"
          title="Have a project in mind?"
          description="Let's turn your idea into something real."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <SocialGroup name={siteConfig.school.name} links={siteConfig.school.social} />
          <SocialGroup name={siteConfig.team.name} links={siteConfig.team.social} />
        </div>

        <GlassCard className="glow-ring mt-8 flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-secondary">Order a project</p>
            <p className="mt-2 font-display text-xl font-semibold">{siteConfig.owner.name}</p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              {siteConfig.owner.whatsapp && (
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" /> {siteConfig.owner.whatsapp}
                </span>
              )}
              {siteConfig.owner.email && (
                <a href={`mailto:${siteConfig.owner.email}`} className="flex items-center gap-1.5 hover:text-foreground">
                  <Mail className="h-3.5 w-3.5" /> {siteConfig.owner.email}
                </a>
              )}
              {siteConfig.owner.instagram && (
                <a href={siteConfig.owner.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-foreground">
                  <Instagram className="h-3.5 w-3.5" /> Instagram
                </a>
              )}
            </div>
          </div>

          <Button
            as="a"
            href={wa || "#"}
            target={wa ? "_blank" : undefined}
            rel="noreferrer"
            variant="glow"
            size="lg"
            className={!wa ? "pointer-events-none opacity-50" : ""}
          >
            Order a Project
          </Button>
        </GlassCard>
      </div>
    </section>
  );
}
