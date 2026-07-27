import SectionHeading from "../components/SectionHeading";
import TeamCard from "../components/TeamCard";
import { useCollection } from "../hooks/useCollection";
import { sampleTeam } from "../data/sampleData";

export default function Team() {
  const { rows: team, loading } = useCollection("team_members", sampleTeam);

  return (
    <section id="team" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <SectionHeading
          eyebrow="Team"
          title="The people behind Respaty Dev."
          description="Tiga siswa SMK Respati 1 dengan peran berbeda, satu arah yang sama."
        />

        {loading ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-64 animate-pulse rounded-2xl bg-white/5" />
            ))}
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
