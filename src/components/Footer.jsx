import { Instagram, Github, Youtube, Globe, MessageCircle } from "lucide-react";
import Logo from "./Logo";
import { siteConfig } from "../config/siteConfig";
import { currentYear } from "../lib/utils";

const TikTokIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M16.6 5.82a4.28 4.28 0 0 1-3.03-2.09h-3.06v12.6a2.55 2.55 0 1 1-1.75-2.42V10.8a5.65 5.65 0 1 0 4.9 5.6v-6.2a7.35 7.35 0 0 0 3.94 1.15V8.25a4.28 4.28 0 0 1-1-.05v-2.4Z" />
  </svg>
);

function SocialRow({ links }) {
  const items = [
    { key: "instagram", icon: Instagram, href: links.instagram },
    { key: "tiktok", icon: TikTokIcon, href: links.tiktok },
    { key: "youtube", icon: Youtube, href: links.youtube },
    { key: "github", icon: Github, href: links.github },
    { key: "discord", icon: MessageCircle, href: links.discord },
    { key: "website", icon: Globe, href: links.website },
  ].filter((i) => i.href);

  if (items.length === 0) return <p className="text-xs text-muted">Social links coming soon.</p>;

  return (
    <div className="flex gap-2">
      {items.map(({ key, icon: Icon, href }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border/10 text-muted transition-colors hover:border-secondary/40 hover:text-secondary"
        >
          <Icon className="h-3.5 w-3.5" />
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-border/8 bg-black/20">
      <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <Logo src={siteConfig.team.logo} alt={siteConfig.team.name} size="sm" />
              <span className="font-display text-base font-bold">{siteConfig.team.name}</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              A student developer team from {siteConfig.school.name}.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Logo src={siteConfig.school.logo} alt={siteConfig.school.name} size="sm" />
              <span className="text-xs text-muted">{siteConfig.school.name}</span>
            </div>
          </div>

          <div>
            <h4 className="font-display text-xs font-semibold uppercase tracking-widest text-muted">
              Respaty Dev
            </h4>
            <div className="mt-4">
              <SocialRow links={siteConfig.team.social} />
            </div>
          </div>

          <div>
            <h4 className="font-display text-xs font-semibold uppercase tracking-widest text-muted">
              {siteConfig.school.name}
            </h4>
            <div className="mt-4">
              <SocialRow links={siteConfig.school.social} />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/8 pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {currentYear()} {siteConfig.team.name}. A student developer team from{" "}
            {siteConfig.school.name}.
          </p>
          <a href="#home" className="hover:text-foreground">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
