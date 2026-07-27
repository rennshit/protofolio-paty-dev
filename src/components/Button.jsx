import { cn } from "../lib/utils";

const variants = {
  primary:
    "bg-foreground text-background hover:bg-foreground/90 shadow-[0_0_0_1px_rgb(var(--border)/0.1)]",
  glow:
    "bg-primary text-white hover:bg-primary/90 shadow-[0_0_30px_-8px_rgb(var(--glow)/0.7)]",
  outline:
    "border border-border/15 text-foreground hover:border-border/30 hover:bg-white/5",
  ghost: "text-muted hover:text-foreground",
};

const sizes = {
  sm: "px-3.5 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-sm",
};

export default function Button({
  as: Component = "button",
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
