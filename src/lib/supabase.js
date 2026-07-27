import { createClient } from "@supabase/supabase-js";
import { getEnv, hasSupabase } from "../config/env";

// The whole app is written to work with or without Supabase configured.
// Without it, the admin panel runs in local demo mode (data lives in
// localStorage) so the site is still fully explorable out of the box.
// Add VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY to go live for real.
export const supabase = hasSupabase
  ? createClient(getEnv("VITE_SUPABASE_URL"), getEnv("VITE_SUPABASE_ANON_KEY"))
  : null;

export const isSupabaseConfigured = hasSupabase;
