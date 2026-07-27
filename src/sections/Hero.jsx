import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Terminal } from "lucide-react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { siteConfig, whatsappLink } from "../config/siteConfig";

const snippetLines = [
  { t: "const", c: "team" },
  { t: "=", c: "" },
  { t: "'Respaty Dev'", c: "" },
];

export default function Hero() {
  const orderHref = whatsappLink() || "#contact";

  return (
    <section
      id="home"
      className="bg-grid bg-noise relative flex min-h-screen items-center overflow-hidden pt-32 pb-20"
    >
      {/* ambient glow, kept subtle per brief */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="relative mx-auto grid max-w-content items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/10 bg-white/5 px-3.5 py-1.5"
          >
            <Logo src={siteConfig.school.logo} alt={siteConfig.school.name} size="sm" className="h-5 w-5" />
            <span className="text-xs font-medium text-muted">
              {siteConfig.school.name} Student Developer Team
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-7 flex items-center gap-4"
          >
            <Logo src={siteConfig.team.logo} alt={siteConfig.team.name} size="xl" glow />
            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              {siteConfig.team.name.toUpperCase()}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gradient mt-5 max-w-xl font-display text-xl font-semibold sm:text-2xl"
          >
            {siteConfig.team.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted"
          >
            We build websites, digital experiences, bots, systems, and creative solutions.{" "}
            {siteConfig.team.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.36 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button as="a" href={orderHref} target="_blank" rel="noreferrer" variant="glow" size="lg">
              Start a Project <ArrowRight className="h-4 w-4" />
            </Button>
            <Button as="a" href="#projects" variant="outline" size="lg">
              Explore Our Work
            </Button>
          </motion.div>
        </div>

        {/* Signature element: a small glass "terminal" card that reflects the
            team's identity as developers, standing in for a generic gradient orb. */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glow-ring glass-strong relative mx-auto w-full max-w-sm rounded-2xl p-5"
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            <span className="ml-auto flex items-center gap-1 text-[11px] text-muted">
              <Terminal className="h-3 w-3" /> team.js
            </span>
          </div>

          <div className="mt-4 space-y-1.5 font-mono text-[13px]">
            <p className="text-muted">
              <span className="text-secondary">const</span> team = ["Raditia", "Syahdan", "Fatiha"];
            </p>
            <p className="text-muted">
              <span className="text-secondary">const</span> school ={" "}
              <span className="text-foreground/80">"{siteConfig.school.name}"</span>;
            </p>
            <p className="text-muted">
              team.<span className="text-secondary">build</span>(idea);
            </p>
            <p className="flex items-center gap-1.5 text-foreground/70">
              <Sparkles className="h-3.5 w-3.5 text-secondary" /> shipping...
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 border-t border-border/8 pt-4 text-center">
            {siteConfig.stats.slice(0, 2).map((s) => (
              <div key={s.label}>
                <p className="font-display text-lg font-bold">{s.value}</p>
                <p className="text-[10px] uppercase tracking-wide text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
