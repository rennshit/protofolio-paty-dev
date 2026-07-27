import { useCallback, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

const DEMO_SESSION_KEY = "respaty_demo_admin_session";

/**
 * In production, admin auth is handled entirely by Supabase Auth —
 * no password ever lives in frontend code. Create the admin user from
 * the Supabase dashboard (Authentication > Users), see README.md.
 *
 * Without Supabase configured, the panel falls back to a local-only
 * demo session so the admin UI stays explorable. This path never
 * checks a real password and must not be treated as secure.
 */
export function useAdminAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data }) => {
        setUser(data.session?.user ?? null);
        setLoading(false);
      });
      const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });
      return () => sub.subscription.unsubscribe();
    }
    const demo = sessionStorage.getItem(DEMO_SESSION_KEY);
    setUser(demo ? JSON.parse(demo) : null);
    setLoading(false);
  }, []);

  const signIn = useCallback(async (email, password) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setUser(data.user);
      return data.user;
    }
    // Demo mode: any non-empty credentials open the panel locally so the
    // UI can be reviewed before Supabase is connected.
    if (!email || !password) throw new Error("Email dan password wajib diisi.");
    const demoUser = { email, demo: true };
    sessionStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
    return demoUser;
  }, []);

  const signOut = useCallback(async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    } else {
      sessionStorage.removeItem(DEMO_SESSION_KEY);
    }
    setUser(null);
  }, []);

  return { user, loading, signIn, signOut, isDemo: !isSupabaseConfigured };
}
