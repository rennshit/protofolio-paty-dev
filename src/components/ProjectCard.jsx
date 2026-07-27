import { ExternalLink, Github, FlaskConical } from "lucide-react";
import GlassCard from "./GlassCard";
import ImageWithFallback from "./ImageWithFallback";

export default function ProjectCard({ project }) {
  return (
    <GlassCard hover className="group flex flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden">
        <ImageWithFallback
          src={project.thumbnail}
          alt={project.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {project.isSample && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-secondary backdrop-blur-sm">
            <FlaskConical className="h-3 w-3" /> Sample
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full border border-border/15 bg-black/50 px-2.5 py-1 text-[10px] font-medium text-foreground/80 backdrop-blur-sm">
          {project.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="font-mono text-[11px] uppercase tracking-widest text-secondary">
          {project.category}
        </span>
        <h3 className="mt-1.5 font-display text-lg font-semibold">{project.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

        {project.technology?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technology.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border/10 px-2.5 py-1 text-[11px] text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {(project.demoUrl || project.sourceUrl) && (
          <div className="mt-5 flex gap-4 border-t border-border/8 pt-4">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:text-secondary"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Live demo
              </a>
            )}
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:text-secondary"
              >
                <Github className="h-3.5 w-3.5" /> Source
              </a>
            )}
          </div>
        )}
      </div>
    </GlassCard>
  );
}
