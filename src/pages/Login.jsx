import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Lock, LogIn } from "lucide-react";
import GlassCard from "../components/GlassCard";
import Button from "../components/Button";
import Logo from "../components/Logo";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { siteConfig } from "../config/siteConfig";

export default function Login() {
  const { user, signIn, isDemo, loading } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (!loading && user) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await signIn(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Login failed. Check your credentials.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-grid flex min-h-screen items-center justify-center px-4">
      <GlassCard className="glow-ring w-full max-w-sm p-8">
        <div className="flex items-center gap-3">
          <Logo src={siteConfig.team.logo} alt={siteConfig.team.name} size="md" glow />
          <div>
            <p className="font-display text-sm font-semibold">{siteConfig.team.name}</p>
            <p className="text-xs text-muted">Admin panel</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div>
            <label htmlFor="email" className="text-xs font-medium text-muted">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border/12 bg-white/5 px-3.5 py-2.5 text-sm outline-none placeholder:text-muted/50 focus:border-secondary/40"
              placeholder="admin@respatydev.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-xs font-medium text-muted">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border/12 bg-white/5 px-3.5 py-2.5 text-sm outline-none placeholder:text-muted/50 focus:border-secondary/40"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <Button type="submit" variant="glow" className="w-full" disabled={busy}>
            {busy ? "Signing in…" : <>Sign in <LogIn className="h-4 w-4" /></>}
          </Button>
        </form>

        {isDemo && (
          <p className="mt-5 flex items-start gap-2 rounded-lg border border-secondary/20 bg-secondary/5 p-3 text-[11px] leading-relaxed text-muted">
            <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" />
            Demo mode: Supabase isn't connected yet, so any email/password opens the panel locally.
            Connect Supabase to enable real authentication — see README.md.
          </p>
        )}
      </GlassCard>
    </div>
  );
}
