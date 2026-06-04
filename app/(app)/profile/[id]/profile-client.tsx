"use client";

import { UImg, Stars } from "@/components/photohub/helpers";
import { Award, MapPin, Users, Star, CheckCircle, Banknote, Heart, Share2 } from "lucide-react";
import {
  getPhotographerById,
  getPhotographerMarketplaceItems,
  getPhotographerPortfolio,
  getPhotographerTestimonials,
} from "@/lib/photohub-data";
import { useState } from "react";
import { GradBtn, GlassBtn } from "@/components/photohub/btn";
import { formatHourlyRate, formatMoney } from "@/lib/site-config";
import { useRouter, usePathname } from "next/navigation";

type Props = {
  id: string;
};

export function ProfileClient({ id }: Props) {
  const [activeTab, setActiveTab] = useState("Portfolio");
  const p = getPhotographerById(id);

  const router = useRouter();
  const pathname = usePathname();

  if (!p) {
    return <div>Photographer not found</div>;
  }

  const tabs = ["Portfolio", "About", "Reviews", "Marketplace"];
  const portfolio = getPhotographerPortfolio(p.id);
  const reviews = getPhotographerTestimonials(p.id);
  const marketplaceItems = getPhotographerMarketplaceItems(p.id);

  return (
    <div className="min-h-screen">
      {/* Cover */}
      <div className="relative h-72 md:h-[380px]">
        <UImg name={p.cover} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.1) 0%, rgba(5,5,5,0.6) 70%, var(--background) 100%)" }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-24 relative z-10">
        {/* Profile header */}
        <div className="flex flex-col md:flex-row items-start md:items-end gap-5 mb-8">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-[22px] overflow-hidden border-4 border-[var(--background)] flex-shrink-0 shadow-2xl">
            <UImg name={p.avatar} alt={p.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">{p.name}</h1>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--primary), var(--chart-5))" }}>
                    <Award size={13} className="text-white" />
                  </div>
                </div>
                <p className="text-white/55 font-medium">{p.specialty}</p>
                <div className="flex items-center gap-1 mt-1.5 text-sm text-white/35">
                  <MapPin size={12} /> {p.location}
                </div>
              </div>
              <div className="flex gap-2.5">
                <GlassBtn className="px-5 py-2.5 rounded-xl text-sm">Follow</GlassBtn>
                <GradBtn onClick={() => router.push(`${pathname}/booking`)} className="px-5 py-2.5 rounded-xl text-sm">Book Now</GradBtn>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Followers", value: p.followers, Icon: Users, color: "var(--primary)" },
            { label: "Rating", value: `${p.rating}/5.0`, Icon: Star, color: "var(--chart-3)" },
            { label: "Reviews", value: `${p.reviews}`, Icon: CheckCircle, color: "var(--chart-2)" },
            { label: "Rate", value: formatHourlyRate(p.priceHourly), Icon: Banknote, color: "var(--chart-4)" },
          ].map(({ label, value, Icon, color }) => (
            <div key={label} className="p-4 rounded-2xl bg-muted border border-white/5">
              <div className="flex items-center gap-2 mb-1.5">
                <Icon size={13} style={{ color }} />
                <span className="text-xs text-white/35">{label}</span>
              </div>
              <p className="font-display text-xl font-bold text-white">{value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-white/8 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
                activeTab === tab ? "border-primary text-white" : "border-transparent text-white/35 hover:text-white/65"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Portfolio */}
        {activeTab === "Portfolio" && (
          <div className="columns-2 md:columns-3 [column-gap:0.75rem] mb-14">
            {portfolio.map(({ id, h, title }) => (
              <div
                key={id}
                className="group relative rounded-xl overflow-hidden mb-3 cursor-pointer break-inside-avoid"
                style={{ height: h }}
              >
                <UImg name={id} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                  <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-sm border border-white/20 hover:bg-white/25 transition-all">
                    <Heart size={13} />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-sm border border-white/20 hover:bg-white/25 transition-all">
                    <Share2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* About */}
        {activeTab === "About" && (
          <div className="max-w-2xl space-y-5 mb-14">
            <div className="p-6 rounded-2xl bg-muted border border-white/5">
              <h3 className="font-semibold text-white mb-3">Biography</h3>
              <p className="text-white/55 leading-relaxed text-sm">
                {p.bio} With a keen eye for detail and an intuitive understanding of light, {p.name.split(" ")[0]} has built a reputation for creating photographs that tell deeply personal stories. Work featured in exhibitions across Lagos, Abuja, Accra, and Johannesburg.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-muted border border-white/5">
              <h3 className="font-semibold text-white mb-4">Specializations</h3>
              <div className="flex flex-wrap gap-2">
                {p.specializations.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-white/55 border border-white/8">{s}</span>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-muted border border-white/5">
              <h3 className="font-semibold text-white mb-4">Equipment</h3>
              <div className="space-y-2.5">
                {p.equipment.map((e) => (
                  <div key={e} className="flex items-center gap-2 text-sm text-white/45">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {e}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reviews */}
        {activeTab === "Reviews" && (
          <div className="space-y-4 mb-14 max-w-2xl">
            {reviews.map((t) => (
              <div key={t.id} className="p-5 rounded-2xl bg-muted border border-white/5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                      <UImg name={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{t.name}</p>
                      <p className="text-xs text-white/35">{t.role}</p>
                    </div>
                  </div>
                  <Stars rating={t.rating} />
                </div>
                <p className="text-sm text-white/55 leading-relaxed">"{t.text}"</p>
              </div>
            ))}
          </div>
        )}

        {/* Marketplace */}
        {activeTab === "Marketplace" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-14">
            {marketplaceItems.map((item) => (
              <div key={item.id} className="group relative rounded-2xl overflow-hidden cursor-pointer" style={{ height: 240 }}>
                <UImg name={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                  <GradBtn className="px-5 py-2.5 rounded-xl text-sm">Buy {formatMoney(item.priceAmount)}</GradBtn>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-3.5" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92), transparent)" }}>
                  <p className="text-sm font-semibold text-white truncate">{item.title}</p>
                  <span className="text-sm font-bold text-primary">{formatMoney(item.priceAmount)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
