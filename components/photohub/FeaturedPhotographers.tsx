"use client"

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Users, MapPin, Bookmark } from "lucide-react";
import { UImg } from "./Helpers";
import { photographers } from "@/lib/photohub-data";
import { Stars } from "./Helpers";
import { GradBtn } from "./Btn";
import { formatHourlyRate } from "@/lib/site-config";

export default function FeaturedPhotographers() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3">Featured Artists</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">Top Photographers</h2>
        </div>
        <Link
          href="/explore"
          className="hidden md:flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors"
        >
          View all <ChevronRight size={15} />
        </Link>
      </div>

      {/* Large cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
        {photographers.slice(0, 3).map((p) => (
          <div
            key={p.id}
            className="group relative rounded-[28px] overflow-hidden cursor-pointer"
            style={{ height: 420 }}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <Link href={`/profile/${p.id}`} className="absolute inset-0 z-20" aria-label={`View ${p.name}'s profile`} />
            <UImg name={p.cover} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
            <div
              className="absolute inset-0 transition-all duration-500"
              style={{ background: hovered === p.id ? "linear-gradient(to top, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.15) 100%)" : "linear-gradient(to top, rgba(0,0,0,0.82) 30%, transparent 65%)" }}
            />

            <div className="absolute inset-x-0 bottom-0 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0">
                    <UImg name={p.avatar} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-white text-lg leading-tight">{p.name}</p>
                    <p className="text-xs text-white/55">{p.specialty}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${p.available ? "bg-chart-2/20 text-chart-2" : "bg-white/10 text-white/40"}`}>
                  {p.available ? "Available" : "Booked"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-white/40">
                    <Users size={11} /> {p.followers}
                  </span>
                  <Stars rating={p.rating} />
                </div>
                <GradBtn className="px-3.5 py-1.5 rounded-lg text-xs">Hire</GradBtn>
              </div>

              <div className={`overflow-hidden transition-all duration-500 ${hovered === p.id ? "max-h-12 mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="flex items-center gap-1 text-xs text-white/40 border-t border-white/10 pt-3">
                  <MapPin size={10} />
                  <span>{p.location}</span>
                  <span className="ml-2 font-semibold" style={{ color: "var(--primary)" }}>{formatHourlyRate(p.priceHourly)}</span>
                </div>
              </div>
            </div>

            <button className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-white border border-white/10 transition-all opacity-0 group-hover:opacity-100">
              <Bookmark size={13} />
            </button>
          </div>
        ))}
      </div>

      {/* Compact row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {photographers.slice(3, 6).map((p) => (
          <Link
            key={p.id}
            href={`/profile/${p.id}`}
            className="group flex items-center gap-3 p-3.5 rounded-2xl bg-muted border border-white/5 hover:border-white/15 cursor-pointer transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
              <UImg name={p.avatar} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white text-sm">{p.name}</p>
              <p className="text-xs text-white/40 truncate">{p.specialty}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <Stars rating={p.rating} />
                <span className="text-[10px] text-white/25">{p.reviews} reviews</span>
              </div>
            </div>
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${p.available ? "bg-chart-2" : "bg-white/20"}`} />
          </Link>
        ))}
      </div>
    </section>
  );
}
