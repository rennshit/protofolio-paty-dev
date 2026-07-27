import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import Button from "./Button";
import { siteConfig, whatsappLink } from "../config/siteConfig";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const orderHref = whatsappLink() || "#contact";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between rounded-2xl border border-transparent px-4 transition-all duration-300 sm:px-6">
        <div
          className={`flex w-full items-center justify-between rounded-2xl px-3 py-2 transition-all duration-300 ${
            scrolled ? "glass" : ""
          }`}
        >
          <a href="#home" className="flex items-center gap-2.5">
            <Logo src={siteConfig.team.logo} alt={siteConfig.team.name} size="sm" />
            <span className="font-display text-[15px] font-bold tracking-tight">
              {siteConfig.team.name}
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[13px] font-medium text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button as="a" href={orderHref} target="_blank" rel="noreferrer" variant="glow" size="sm">
              Order Project
            </Button>
          </div>

          <button
            className="text-foreground md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-4 mt-2 overflow-hidden rounded-2xl sm:mx-6"
          >
            <div className="glass-strong flex flex-col gap-1 p-3">
              {siteConfig.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:bg-white/5 hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
              <Button
                as="a"
                href={orderHref}
                target="_blank"
                rel="noreferrer"
                variant="glow"
                size="sm"
                className="mt-2"
              >
                Order Project
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
