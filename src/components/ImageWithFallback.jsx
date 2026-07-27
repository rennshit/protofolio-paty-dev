import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "../lib/utils";

export default function ImageWithFallback({ src, alt, className }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={cn("flex items-center justify-center bg-white/5 text-muted", className)}>
        <ImageOff className="h-6 w-6" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
