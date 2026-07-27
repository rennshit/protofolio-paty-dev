// Thin wrapper around import.meta.env so the rest of the app never
// touches Vite's env API directly — makes it trivial to swap the
// build tool later without hunting through every component.
const env = import.meta.env;

export const getEnv = (key, fallback = "") => env[key] ?? fallback;

export const hasSupabase = Boolean(
  getEnv("VITE_SUPABASE_URL") && getEnv("VITE_SUPABASE_ANON_KEY")
);
