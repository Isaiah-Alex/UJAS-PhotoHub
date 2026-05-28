"use client"
import { useNavigate } from "@/lib/pageNavigation";
import { useState } from "react";
import { Search, Filter, MapPin, Bookmark } from "lucide-react";
import { photographers } from "@/lib/photohub-data";
import { UImg, Stars } from "@/components/photohub/helpers";



export default function ExplorePage() {
  const setPage = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const cats = ["All", "Portrait", "Wedding", "Street", "Nature", "Fashion", "Corporate", "Lifestyle"];

  const heights = [340, 420, 280, 390, 350, 260, 410, 300, 370, 310, 440, 290];

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">Explore Photographers</h1>
          <p className="text-white/40 text-sm">Discover talented visual storytellers from around the world</p>
        </div>

        {/* Search + filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search photographers, styles, locations..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted border border-white/8 text-sm text-white placeholder-white/25 outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted border border-white/8 text-sm text-white/50 hover:text-white transition-all">
            <Filter size={14} /> Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted border border-white/8 text-sm text-white/50 hover:text-white transition-all">
            <MapPin size={14} /> Location
          </button>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap mb-8 overflow-x-auto pb-1">
          {cats.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat ? "text-white" : "bg-muted border border-white/8 text-white/45 hover:text-white hover:border-white/20"
              }`}
              style={activeCategory === cat ? { background: "linear-gradient(135deg, var(--primary), var(--chart-5))" } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-gap:1rem] mb-16">
          {[...photographers, ...photographers].map((p, i) => (
            <div
              key={`${p.id}-${i}`}
              className="group relative rounded-2xl overflow-hidden cursor-pointer mb-4 break-inside-avoid"
              style={{ height: heights[i % heights.length] }}
              onClick={() => setPage("profile")}
            >
              <UImg name={p.cover} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
              <div className="absolute inset-0 transition-all duration-400" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 55%)" }} />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300" />

              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 flex-shrink-0">
                    <UImg name={p.avatar} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm leading-tight">{p.name}</p>
                    <p className="text-[11px] text-white/45">{p.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <div className="flex items-center gap-1.5">
                    <Stars rating={p.rating} />
                    <span className="text-[10px] text-white/40">{p.rating}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${p.available ? "bg-chart-2/20 text-chart-2" : "bg-white/10 text-white/40"}`}>
                    {p.available ? "Available" : "Booked"}
                  </span>
                </div>
              </div>

              <button className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-white border border-white/10 transition-all opacity-0 group-hover:opacity-100">
                <Bookmark size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}