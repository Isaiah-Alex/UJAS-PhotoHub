import { testimonials } from "@/lib/photohub-data";
import { Star } from "lucide-react";
import { UImg } from "./helpers";


export default function Testimonials() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3">Real Stories</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">What They Say</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border border-white/5 hover:border-white/12 transition-all duration-300 group"
            style={{ background: "rgba(15,15,15,0.8)" }}
          >
            <div className="flex gap-0.5 mb-5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={13} className="fill-primary text-primary" />
              ))}
            </div>
            <p className="text-white/65 leading-relaxed mb-6 text-sm">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <UImg name={t.avatar} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">{t.name}</p>
                <p className="text-xs text-white/35">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}