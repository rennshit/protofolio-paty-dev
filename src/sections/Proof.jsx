import { MessageSquareQuote } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import ProofCard from "../components/ProofCard";
import { useCollection } from "../hooks/useCollection";
import { sampleProofs } from "../data/sampleData";

export default function Proof() {
  const { rows: proofs, loading } = useCollection("proofs", sampleProofs);

  return (
    <section id="proof" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <SectionHeading
          eyebrow="Proof & Reviews"
          title="Evidence, not promises."
          description="Dokumentasi hasil kerja dan review yang dikelola langsung oleh admin Respaty Dev."
        />

        {loading ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-72 animate-pulse rounded-2xl bg-white/5" />
            ))}
          </div>
        ) : proofs.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/12 py-20 text-center">
            <MessageSquareQuote className="h-8 w-8 text-muted" />
            <p className="mt-3 text-sm font-medium">Proof and reviews will appear here.</p>
            <p className="mt-1 text-xs text-muted">Managed from the admin panel as projects wrap up.</p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {proofs.map((proof) => (
              <ProofCard key={proof.id} proof={proof} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
