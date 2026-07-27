import GlassCard from "./GlassCard";
import ImageWithFallback from "./ImageWithFallback";

export default function TeamCard({ member }) {
  return (
    <GlassCard hover className="flex flex-col p-6">
      <div className="flex items-center gap-4">
        <ImageWithFallback
          src={member.avatar}
          alt={member.name}
          className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-border/10"
        />
        <div>
          <h3 className="font-display text-base font-semibold">{member.name}</h3>
          <p className="text-xs text-secondary">{member.role}</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">{member.bio}</p>

      {member.skills?.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-1.5">
          {member.skills.map((s) => (
            <span
              key={s}
              className="rounded-full border border-border/10 bg-white/[0.02] px-2.5 py-1 text-[11px] text-muted"
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </GlassCard>
  );
}
