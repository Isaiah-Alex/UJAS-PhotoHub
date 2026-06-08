"use client"

import { useState } from "react";
import { Search, Filter, Heart, Share2, Download } from "lucide-react";
import { filterMarketplaceItems } from "@/lib/photohub-data";
import { GradBtn } from "@/components/photohub/Btn";
import { UImg } from "@/components/photohub/Helpers";
import { formatMoney } from "@/lib/site-config";

export default function MarketplacePage() {
  const [activeFilter, setActiveFilter] = useState("Popular");
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState<number[]>([]);

  const filters = ["Popular", "Latest", "Price: Low", "Price: High", "Top Rated"];
  const heights = [280, 340, 300, 260, 320, 290, 310, 270, 330, 285, 315, 260, 300, 340, 275, 295];

  const allItems = filterMarketplaceItems({
    search,
    sort: activeFilter as Parameters<typeof filterMarketplaceItems>[0]["sort"],
  });

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">Photo Marketplace</h1>
          <p className="text-white/40 text-sm">License premium photography for your creative projects</p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search photos, themes, styles..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted border border-white/8 text-sm text-white placeholder-white/25 outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted border border-white/8 text-sm text-white/50 hover:text-white transition-all">
            <Filter size={14} /> Category
          </button>
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === f ? "text-white" : "bg-muted border border-white/8 text-white/45 hover:text-white"
              }`}
              style={activeFilter === f ? { background: "linear-gradient(135deg, var(--primary), var(--chart-5))" } : {}}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Masonry-style photo grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 [column-gap:0.75rem] mb-16">
          {allItems.map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className="group relative rounded-2xl overflow-hidden cursor-pointer mb-3 break-inside-avoid"
              style={{ height: heights[i % heights.length] }}
            >
              <UImg name={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2.5 p-3">
                <GradBtn className="w-full py-2.5 rounded-xl text-sm">Buy {formatMoney(item.priceAmount)}</GradBtn>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); setSaved((s) => s.includes(item.id) ? s.filter((x) => x !== item.id) : [...s, item.id]); }}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all ${saved.includes(item.id) ? "bg-primary/20 border-primary/30 text-primary" : "bg-white/10 border-white/20 text-white hover:bg-white/20"}`}
                  >
                    <Heart size={13} className={saved.includes(item.id) ? "fill-primary" : ""} />
                  </button>
                  <button className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all">
                    <Share2 size={13} />
                  </button>
                  <button className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all">
                    <Download size={13} />
                  </button>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-3" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92), transparent)" }}>
                <p className="font-semibold text-white text-[13px] truncate">{item.title}</p>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-[11px] text-white/40">{item.seller}</span>
                  <span className="text-sm font-bold text-primary">{formatMoney(item.priceAmount)}</span>
                </div>
                <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download size={10} className="text-white/30" />
                  <span className="text-[10px] text-white/30">{item.downloads}</span>
                </div>
              </div>

              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-sm text-[10px] font-medium text-white/55 border border-white/10">
                {item.category}
              </div>
            </div>
          ))}
        </div>

        {allItems.length === 0 && (
          <div className="mb-16 rounded-2xl border border-white/8 bg-muted p-8 text-center">
            <p className="font-display text-2xl font-bold text-white">No marketplace items found</p>
            <p className="mt-2 text-sm text-white/40">Try another search term or sort option.</p>
          </div>
        )}
      </div>
    </div>
  );
}
