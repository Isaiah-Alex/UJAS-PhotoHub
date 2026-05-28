"use client"

import { GradBtn, GlassBtn } from './btn'
import { UImg } from './helpers';
import { photographers } from '@/lib/photohub-data';
import { useNavigate } from '@/lib/pageNavigation';

export default function Spotlight() {
  const setPage = useNavigate();
  const p = photographers[2];

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="relative rounded-[32px] overflow-hidden" style={{ minHeight: 520 }}>
        <UImg name={p.cover} alt="Spotlight" className="w-full h-full object-cover absolute inset-0" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(5,5,5,0.96) 35%, rgba(5,5,5,0.55) 65%, rgba(5,5,5,0.25) 100%)" }} />
        <div className="absolute left-1/2 top-1/2 w-72 h-72 rounded-full blur-[90px] opacity-25 pointer-events-none" style={{ background: "var(--primary)", transform: "translate(-80%, -50%)" }} />

        <div className="relative z-10 p-10 md:p-16 flex flex-col justify-center" style={{ minHeight: 520 }}>
          <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">Photographer Spotlight</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-3 max-w-lg tracking-tight">{p.name}</h2>
          <p className="text-white/55 text-lg mb-2 font-medium">{p.specialty}</p>
          <p className="text-white/40 max-w-md mb-8 leading-relaxed text-sm">{p.bio}</p>

          <div className="flex flex-wrap gap-8 mb-8">
            {[
              { label: "Followers", value: p.followers },
              { label: "Rating", value: `${p.rating}/5.0` },
              { label: "Reviews", value: `${p.reviews}+` },
              { label: "Based in", value: p.city },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-white/35 mt-0.5 tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <GradBtn onClick={() => setPage("profile")} className="px-6 py-3 rounded-xl text-sm">
              View Portfolio
            </GradBtn>
            <GlassBtn className="px-6 py-3 rounded-xl text-sm">
              Book Now
            </GlassBtn>
          </div>
        </div>
      </div>
    </section>
  );
}