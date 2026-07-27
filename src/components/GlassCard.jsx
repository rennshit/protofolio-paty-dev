import { cn } from "../lib/utils";

export default function GlassCard({ as: Component = "div", className, children, hover = false, ...props }) {
  return (
    <Component
      className={cn(
        "glass rounded-2xl",
        hover &&
          "transition-all duration-300 hover:border-border/20 hover:shadow-[0_0_40px_-12px_rgb(var(--glow)/0.4)] hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
