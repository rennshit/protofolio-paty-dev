import GlassCard from "./GlassCard";
import ImageWithFallback from "./ImageWithFallback";
import { formatDate } from "../lib/utils";

export default function ProofCard({ proof }) {
  return (
    <GlassCard hover className="overflow-hidden">
      <div className="aspect-video overflow-hidden">
        <ImageWithFallback src={proof.image} alt={proof.title} className="h-full w-full object-cover" />
      </div>
      <div className="p-5">
        <h3 className="font-display text-sm font-semibold">{proof.title}</h3>
        {proof.description && (
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{proof.description}</p>
        )}
        <div className="mt-3 flex items-center justify-between text-[11px] text-muted">
          {proof.source && <span>{proof.source}</span>}
          {proof.date && <span>{formatDate(proof.date)}</span>}
        </div>
      </div>
    </GlassCard>
  );
}
