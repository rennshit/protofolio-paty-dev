import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Users, FolderGit2, ImageIcon, Share2, LogOut, ExternalLink } from "lucide-react";
import Logo from "../components/Logo";
import CrudPanel from "../components/admin/CrudPanel";
import SocialSettingsPanel from "../components/admin/SocialSettingsPanel";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { sampleTeam, sampleProjects, sampleProofs } from "../data/sampleData";
import { siteConfig } from "../config/siteConfig";

const TABS = [
  { id: "team", label: "Team", icon: Users },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "proof", label: "Proof", icon: ImageIcon },
  { id: "social", label: "Social Media", icon: Share2 },
];

const teamFields = [
  { name: "name", label: "Name", required: true },
  { name: "role", label: "Role", required: true },
  { name: "bio", label: "Bio", type: "textarea", required: true },
  { name: "skills", label: "Skills", type: "tags" },
  { name: "avatar", label: "Avatar image URL", type: "url" },
];

const projectFields = [
  { name: "name", label: "Project name", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  {
    name: "category",
    label: "Category",
    type: "select",
    required: true,
    options: ["Website", "Bot", "Design", "System", "Automation"],
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: ["Live", "In Progress", "Completed", "Sample"],
  },
  { name: "technology", label: "Technology", type: "tags", placeholder: "React, Node.js" },
  { name: "thumbnail", label: "Thumbnail image URL", type: "url" },
  { name: "demoUrl", label: "Demo link", type: "url" },
  { name: "sourceUrl", label: "Source code link", type: "url" },
];

const proofFields = [
  { name: "title", label: "Title", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "image", label: "Image URL", type: "url", required: true },
  { name: "source", label: "Client / source" },
  { name: "date", label: "Date", type: "date" },
];

export default function Admin() {
  const { user, loading, signOut, isDemo } = useAdminAuth();
  const [tab, setTab] = useState("team");

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-border/8 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-content items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Logo src={siteConfig.team.logo} alt={siteConfig.team.name} size="sm" />
            <div>
              <p className="font-display text-sm font-semibold">Admin Panel</p>
              <p className="text-[11px] text-muted">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="hidden items-center gap-1.5 text-xs text-muted hover:text-foreground sm:flex"
            >
              View site <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 rounded-full border border-border/12 px-3.5 py-2 text-xs font-medium text-muted hover:text-foreground"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      {isDemo && (
        <div className="border-b border-secondary/15 bg-secondary/5 px-4 py-2 text-center text-[11px] text-secondary sm:px-6">
          Demo mode — data is saved to this browser only. Connect Supabase to persist it for real.
        </div>
      )}

      <div className="mx-auto max-w-content px-4 py-8 sm:px-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                tab === id
                  ? "border-secondary/40 bg-secondary/10 text-secondary"
                  : "border-border/10 text-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" /> {label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "team" && (
            <CrudPanel
              table="team_members"
              fallbackData={sampleTeam}
              fields={teamFields}
              title="Team Member"
              emptyIcon={Users}
              renderSummary={(row) => (
                <>
                  <p className="truncate text-sm font-medium">{row.name}</p>
                  <p className="truncate text-xs text-muted">{row.role}</p>
                </>
              )}
            />
          )}
          {tab === "projects" && (
            <CrudPanel
              table="projects"
              fallbackData={sampleProjects}
              fields={projectFields}
              title="Project"
              emptyIcon={FolderGit2}
              renderSummary={(row) => (
                <>
                  <p className="truncate text-sm font-medium">{row.name}</p>
                  <p className="truncate text-xs text-muted">
                    {row.category} · {row.status}
                  </p>
                </>
              )}
            />
          )}
          {tab === "proof" && (
            <CrudPanel
              table="proofs"
              fallbackData={sampleProofs}
              fields={proofFields}
              title="Proof"
              emptyIcon={ImageIcon}
              renderSummary={(row) => (
                <>
                  <p className="truncate text-sm font-medium">{row.title}</p>
                  <p className="truncate text-xs text-muted">{row.source}</p>
                </>
              )}
            />
          )}
          {tab === "social" && <SocialSettingsPanel />}
        </div>
      </div>
    </div>
  );
}
