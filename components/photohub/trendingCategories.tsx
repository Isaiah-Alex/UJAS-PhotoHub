"use client"

import Link from "next/link";
import { UImg } from "./helpers";
import { categories } from "@/lib/photohub-data";



export default function TrendingCategories() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3">Browse by Style</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">Trending Categories</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Large featured */}
        <Link
          href="/explore"
          className="group relative rounded-[24px] overflow-hidden cursor-pointer md:row-span-2 col-span-1"
          style={{ height: 380, minHeight: 380 }}
        >
          <UImg name={categories[0].image} alt={categories[0].name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-500" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="font-display font-bold text-white text-2xl">{categories[0].name}</p>
            <p className="text-xs text-white/50 mt-1">{categories[0].count}</p>
          </div>
        </Link>

        {/* Medium cards */}
        {categories.slice(1, 7).map((cat) => (
          <Link
            key={cat.name}
            href="/explore"
            className="group relative rounded-[20px] overflow-hidden cursor-pointer"
            style={{ height: 180 }}
          >
            <UImg name={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]" />
            <div className="absolute inset-0 bg-black/45 group-hover:bg-black/25 transition-all duration-500" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="font-display font-bold text-white text-lg">{cat.name}</p>
              <p className="text-[11px] text-white/50">{cat.count}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
