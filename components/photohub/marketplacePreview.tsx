"use client"

import Link from "next/link";
import { ChevronRight, Heart, Download } from "lucide-react";
import { marketplaceItems } from "@/lib/photohub-data";
import { UImg } from "./helpers";
import { GradBtn } from "./btn";
import { formatMoney } from "@/lib/site-config";



export default function MarketplacePreview() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3">Digital Store</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">Photo Marketplace</h2>
          </div>
          <Link
            href="/marketplace"
            className="hidden md:flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors"
          >
            Browse all <ChevronRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {marketplaceItems.slice(0, 4).map((item, i) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ height: i % 2 === 0 ? 300 : 260 }}
            >
              <UImg name={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
              <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2 flex-col">
                <GradBtn className="px-5 py-2.5 rounded-xl text-sm">Buy {formatMoney(item.priceAmount)}</GradBtn>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all">
                    <Heart size={13} />
                  </button>
                  <button className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all">
                    <Download size={13} />
                  </button>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3.5" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92), transparent)" }}>
                <p className="font-semibold text-white text-sm truncate">{item.title}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-white/40">{item.seller}</span>
                  <span className="text-sm font-bold text-primary">{formatMoney(item.priceAmount)}</span>
                </div>
              </div>
              <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-[10px] font-medium text-white/60 border border-white/10">
                {item.category}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
