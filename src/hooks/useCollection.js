import { useCallback, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

const storageKey = (table) => `respaty_${table}`;

const readLocal = (table, fallback) => {
  try {
    const raw = localStorage.getItem(storageKey(table));
    if (!raw) {
      localStorage.setItem(storageKey(table), JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const writeLocal = (table, rows) => {
  localStorage.setItem(storageKey(table), JSON.stringify(rows));
};

/**
 * useCollection abstracts CRUD for one "table" so components never care
 * whether data actually lives in Supabase or in localStorage demo mode.
 * Swapping to a different backend later only means changing this file.
 */
export function useCollection(table, fallbackData = [], { orderBy } = {}) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (isSupabaseConfigured) {
        let query = supabase.from(table).select("*");
        if (orderBy) query = query.order(orderBy, { ascending: false });
        const { data, error: err } = await query;
        if (err) throw err;
        setRows(data ?? []);
      } else {
        setRows(readLocal(table, fallbackData));
      }
    } catch (err) {
      setError(err.message ?? "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [table, orderBy]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    load();
  }, [load]);

  const insert = async (row) => {
    if (isSupabaseConfigured) {
      const { data, error: err } = await supabase.from(table).insert(row).select().single();
      if (err) throw err;
      setRows((prev) => [data, ...prev]);
      return data;
    }
    const newRow = { ...row, id: row.id || crypto.randomUUID(), created_at: new Date().toISOString() };
    const next = [newRow, ...rows];
    setRows(next);
    writeLocal(table, next);
    return newRow;
  };

  const update = async (id, patch) => {
    if (isSupabaseConfigured) {
      const { data, error: err } = await supabase.from(table).update(patch).eq("id", id).select().single();
      if (err) throw err;
      setRows((prev) => prev.map((r) => (r.id === id ? data : r)));
      return data;
    }
    const next = rows.map((r) => (r.id === id ? { ...r, ...patch } : r));
    setRows(next);
    writeLocal(table, next);
    return next.find((r) => r.id === id);
  };

  const remove = async (id) => {
    if (isSupabaseConfigured) {
      const { error: err } = await supabase.from(table).delete().eq("id", id);
      if (err) throw err;
    }
    const next = rows.filter((r) => r.id !== id);
    setRows(next);
    if (!isSupabaseConfigured) writeLocal(table, next);
  };

  return { rows, loading, error, insert, update, remove, reload: load };
}
