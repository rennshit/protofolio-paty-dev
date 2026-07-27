import { useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import GlassCard from "../GlassCard";
import Button from "../Button";
import ImageWithFallback from "../ImageWithFallback";
import ConfirmDialog from "../ConfirmDialog";
import { useCollection } from "../../hooks/useCollection";
import { useToast } from "../../hooks/useToast";

const emptyFromFields = (fields) =>
  Object.fromEntries(fields.map((f) => [f.name, f.type === "tags" ? [] : ""]));

function Field({ field, value, onChange }) {
  const common = {
    id: field.name,
    className:
      "mt-1.5 w-full rounded-lg border border-border/12 bg-white/5 px-3.5 py-2.5 text-sm outline-none placeholder:text-muted/50 focus:border-secondary/40",
    placeholder: field.placeholder || "",
  };

  return (
    <div className={field.type === "textarea" ? "sm:col-span-2" : ""}>
      <label htmlFor={field.name} className="text-xs font-medium text-muted">
        {field.label} {field.required && <span className="text-red-400">*</span>}
      </label>
      {field.type === "textarea" ? (
        <textarea
          rows={3}
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...common}
        />
      ) : field.type === "select" ? (
        <select
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...common}
        >
          <option value="" disabled>
            Select…
          </option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : field.type === "tags" ? (
        <input
          type="text"
          value={Array.isArray(value) ? value.join(", ") : value}
          onChange={(e) => onChange(e.target.value.split(",").map((v) => v.trim()).filter(Boolean))}
          {...common}
          placeholder={field.placeholder || "Comma separated, e.g. React, Node.js"}
        />
      ) : (
        <input
          type={field.type || "text"}
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...common}
        />
      )}
    </div>
  );
}

export default function CrudPanel({ table, fallbackData, fields, title, renderSummary, emptyIcon: EmptyIcon }) {
  const { rows, loading, error, insert, update, remove } = useCollection(table, fallbackData);
  const { push } = useToast();

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyFromFields(fields));
  const [saving, setSaving] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const openCreate = () => {
    setForm(emptyFromFields(fields));
    setEditingId(null);
    setFormOpen(true);
  };

  const openEdit = (row) => {
    setForm({ ...emptyFromFields(fields), ...row });
    setEditingId(row.id);
    setFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await update(editingId, form);
        push(`${title} updated.`);
      } else {
        await insert(form);
        push(`${title} added.`);
      }
      setFormOpen(false);
    } catch (err) {
      push(err.message || "Something went wrong.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await remove(pendingDelete.id);
      push(`${title} deleted.`);
      setPendingDelete(null);
    } catch (err) {
      push(err.message || "Failed to delete.", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">{title}</h2>
        <Button size="sm" variant="glow" onClick={openCreate}>
          <Plus className="h-4 w-4" /> Add {title}
        </Button>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      {loading ? (
        <div className="mt-6 space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-white/5" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/12 py-16 text-center">
          {EmptyIcon && <EmptyIcon className="h-7 w-7 text-muted" />}
          <p className="mt-3 text-sm font-medium">Nothing here yet.</p>
          <p className="mt-1 text-xs text-muted">Click "Add {title}" to create the first entry.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {rows.map((row) => (
            <GlassCard key={row.id} className="flex items-center gap-4 p-4">
              {"image" in row || "thumbnail" in row || "avatar" in row ? (
                <ImageWithFallback
                  src={row.image || row.thumbnail || row.avatar}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-lg object-cover"
                />
              ) : null}
              <div className="min-w-0 flex-1">{renderSummary(row)}</div>
              <div className="flex shrink-0 gap-1.5">
                <button
                  onClick={() => openEdit(row)}
                  aria-label={`Edit ${title}`}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/10 text-muted hover:text-foreground"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setPendingDelete(row)}
                  aria-label={`Delete ${title}`}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/10 text-muted hover:border-red-400/40 hover:text-red-400"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {formOpen && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm">
          <GlassCard className="glow-ring max-h-[85vh] w-full max-w-lg overflow-y-auto scrollbar-thin p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-semibold">
                {editingId ? `Edit ${title}` : `Add ${title}`}
              </h3>
              <button onClick={() => setFormOpen(false)} className="text-muted hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
              {fields.map((field) => (
                <Field
                  key={field.name}
                  field={field}
                  value={form[field.name]}
                  onChange={(v) => setForm((prev) => ({ ...prev, [field.name]: v }))}
                />
              ))}
              <div className="mt-2 flex justify-end gap-2 sm:col-span-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setFormOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="glow" size="sm" disabled={saving}>
                  {saving ? "Saving…" : "Save"}
                </Button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title={`Delete this ${title.toLowerCase()}?`}
        description="This action cannot be undone."
        busy={deleting}
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
