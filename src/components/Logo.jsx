import { useState } from "react";
import { cn } from "../lib/utils";

const SIZES = {
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-14 w-14",
  xl: "h-20 w-20",
};

export default function Logo({ src, alt, size = "md", glow = false, className }) {
  const [failed, setFailed] = useState(false);

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-card/60",
        SIZES[size],
        glow && "glow-ring",
        className
      )}
    >
      {glow && (
        <span className="absolute inset-0 -z-10 animate-glow-pulse rounded-xl bg-primary/20 blur-xl" />
      )}
      {!failed && src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain p-1"
        />
      ) : (
        <span className="font-display text-xs font-bold text-muted">
          {alt?.slice(0, 2).toUpperCase() || "RD"}
        </span>
      )}
    </span>
  );
}
