import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import GlassCard from "../GlassCard";
import Button from "../Button";
import { useCollection } from "../../hooks/useCollection";
import { useToast } from "../../hooks/useToast";
import { siteConfig } from "../../config/siteConfig";

const SETTINGS_ID = "social-links";

const defaultValues = {
  id: SETTINGS_ID,
  school_instagram: siteConfig.school.social.instagram,
  school_tiktok: siteConfig.school.social.tiktok,
  school_youtube: siteConfig.school.social.youtube,
  school_website: siteConfig.school.social.website,
  team_instagram: siteConfig.team.social.instagram,
  team_tiktok: siteConfig.team.social.tiktok,
  team_github: siteConfig.team.social.github,
  team_discord: siteConfig.team.social.discord,
  owner_whatsapp: siteConfig.owner.whatsapp,
  owner_email: siteConfig.owner.email,
  owner_instagram: siteConfig.owner.instagram,
};

const FIELD_GROUPS = [
  {
    title: "SMK Respati 1",
    fields: [
      ["school_instagram", "Instagram"],
      ["school_tiktok", "TikTok"],
      ["school_youtube", "YouTube"],
      ["school_website", "Website"],
    ],
  },
  {
    title: "Respaty Dev",
    fields: [
      ["team_instagram", "Instagram"],
      ["team_tiktok", "TikTok"],
      ["team_github", "GitHub"],
      ["team_discord", "Discord"],
    ],
  },
  {
    title: "Order / Contact",
    fields: [
      ["owner_whatsapp", "WhatsApp number"],
      ["owner_email", "Email"],
      ["owner_instagram", "Instagram (owner)"],
    ],
  },
];

export default function SocialSettingsPanel() {
  const { rows, loading, insert, update } = useCollection("settings", [defaultValues]);
  const { push } = useToast();
  const [form, setForm] = useState(defaultValues);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading) {
      const existing = rows.find((r) => r.id === SETTINGS_ID);
      if (existing) setForm(existing);
    }
  }, [loading, rows]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const existing = rows.find((r) => r.id === SETTINGS_ID);
      if (existing) {
        await update(SETTINGS_ID, form);
      } else {
        await insert(form);
      }
      push("Social links updated. Note: env vars still control the values shown until the site is rebuilt with matching NEXT_PUBLIC_/VITE_ variables, unless your data layer reads from settings directly.");
    } catch (err) {
      push(err.message || "Failed to save.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 className="font-display text-lg font-semibold">Social Media & Contact</h2>
      <p className="mt-1 text-xs text-muted">
        These values are stored so they can be wired into the live site's data source.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {FIELD_GROUPS.map((group) => (
          <GlassCard key={group.title} className="p-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-secondary">
              {group.title}
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {group.fields.map(([name, label]) => (
                <div key={name}>
                  <label htmlFor={name} className="text-xs font-medium text-muted">
                    {label}
                  </label>
                  <input
                    id={name}
                    type="text"
                    value={form[name] || ""}
                    onChange={(e) => setForm((prev) => ({ ...prev, [name]: e.target.value }))}
                    className="mt-1.5 w-full rounded-lg border border-border/12 bg-white/5 px-3.5 py-2.5 text-sm outline-none placeholder:text-muted/50 focus:border-secondary/40"
                  />
                </div>
              ))}
            </div>
          </GlassCard>
        ))}

        <Button type="submit" variant="glow" disabled={saving}>
          {saving ? "Saving…" : <>Save changes <Save className="h-4 w-4" /></>}
        </Button>
      </form>
    </div>
  );
}
