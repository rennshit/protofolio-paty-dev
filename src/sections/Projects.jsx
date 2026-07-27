import { useMemo, useState } from "react";
import { FolderGit2 } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import { useCollection } from "../hooks/useCollection";
import { sampleProjects } from "../data/sampleData";

const CATEGORIES = ["All", "Website", "Bot", "Design", "System", "Automation"];

export default function Projects() {
  const { rows: projects, loading } = useCollection("projects", sampleProjects);
  const [category, setCategory] = useState("All");

  const filtered = useMemo(
    () => (category === "All" ? projects : projects.filter((p) => p.category === category)),
    [projects, category]
  );

  return (
    <section id="projects" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Projects"
            title="Selected Projects"
            description="Beberapa hasil kerja dan struktur project yang pernah kami bangun."
          />
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  category === c
                    ? "border-secondary/40 bg-secondary/10 text-secondary"
                    : "border-border/10 text-muted hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-80 animate-pulse rounded-2xl bg-white/5" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/12 py-20 text-center">
            <FolderGit2 className="h-8 w-8 text-muted" />
            <p className="mt-3 text-sm font-medium">No projects in this category yet.</p>
            <p className="mt-1 text-xs text-muted">New work gets added here as it ships.</p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
