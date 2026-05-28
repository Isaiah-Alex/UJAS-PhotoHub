"use client"

import { photographers } from "@/lib/photohub-data";
import { UImg } from "./helpers";
import { Zap } from "lucide-react";
import { GradBtn, GlassBtn } from "./btn";
import { ArrowRight, Play, CheckCircle, TrendingUp, ShoppingCart } from "lucide-react";
import { formatMoney, SITE_STATS } from "@/lib/site-config";
import { PAGE_PATHS, useNavigate } from "@/lib/pageNavigation";


export default function Hero() {
  const setPage = useNavigate();
  const featured = photographers[0];
  const booked = photographers[1];
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* Cinematic background */}
      <div className="absolute inset-0">
        <UImg name="hero" alt="Photography event" className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(100deg, var(--background) 45%, rgba(5,5,5,0.75) 70%, rgba(5,5,5,0.25) 100%)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--background) 0%, transparent 55%)" }} />
      </div>

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15 pointer-events-none" style={{ background: "var(--primary)" }} />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full blur-[100px] opacity-10 pointer-events-none" style={{ background: "var(--chart-5)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center py-16 w-full">
        {/* Left: copy */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
            <Zap size={13} className="text-primary" />
            <span className="text-sm font-medium text-primary">Premium Photography Platform</span>
          </div>

          <h1 className="font-display text-5xl lg:text-[72px] font-bold text-white leading-[1.04] tracking-tight">
            Discover,{" "}
            <span style={{ backgroundImage: "linear-gradient(135deg, var(--primary), var(--chart-5))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Book
            </span>{" "}
            &{" "}
            <br />
            Showcase{" "}
            <span style={{ backgroundImage: "linear-gradient(135deg, var(--primary), var(--chart-5))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Excellence
            </span>
          </h1>

          <p className="text-lg text-white/55 max-w-lg leading-relaxed">
            Connect with world-class photographers, build your creative identity, and explore visual stories that move the world.
          </p>

          <div className="flex flex-wrap gap-3">
            <GradBtn
              onClick={() => setPage("explore")}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm group"
            >
              Explore Photographers
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </GradBtn>
            <GlassBtn className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm">
              <Play size={15} />
              Start Selling
            </GlassBtn>
          </div>

          <div className="flex gap-10 pt-2">
            {[
              { v: "12,400+", l: "Photographers" },
              { v: "840K+", l: "Photos Listed" },
              { v: "98.2%", l: "Satisfaction" },
            ].map(({ v, l }) => (
              <div key={l}>
                <p className="font-display text-2xl font-bold text-white">{v}</p>
                <p className="text-xs text-white/35 mt-0.5 tracking-wide">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: layered cards composition */}
        <div className="relative hidden md:block h-[600px]">
          {/* Main portrait card */}
          <div
            className="absolute top-8 right-0 w-64 h-[420px] rounded-3xl overflow-hidden border border-white/10"
            style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.7)" }}
          >
            <UImg name={featured.avatar} alt="Portrait" className="w-full h-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 p-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 60%, transparent)" }}>
              <p className="font-display font-bold text-white text-lg leading-tight">{featured.name}</p>
              <p className="text-xs text-white/50 mt-0.5">{featured.specialty} · {featured.city}</p>
            </div>
          </div>

          {/* Secondary image card */}
          <div
            className="absolute top-0 left-8 w-44 h-60 rounded-2xl overflow-hidden border border-white/10"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}
          >
            <UImg name="fashion-1" alt="Fashion" className="w-full h-full object-cover" />
          </div>

          {/* Booking confirmed card */}
          <div
            className="absolute bottom-32 left-0 w-52 rounded-2xl p-3.5 border border-white/10"
            style={{ background: "rgba(10,10,10,0.85)", backdropFilter: "blur(20px)", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}
          >
            <div className="flex items-center gap-1.5 mb-2.5">
              <CheckCircle size={13} className="text-chart-2" />
              <span className="text-xs font-semibold text-chart-2">Booking Confirmed</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-white/15 flex-shrink-0">
                <UImg name={booked.avatar} alt="Photographer" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{booked.name}</p>
                <p className="text-[11px] text-white/40">Wedding · Jun 15, 2026</p>
              </div>
            </div>
          </div>

          {/* Earnings card */}
          <div
            className="absolute bottom-8 right-4 w-44 rounded-2xl p-3.5 border border-white/10"
            style={{ background: "rgba(10,10,10,0.85)", backdropFilter: "blur(20px)", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}
          >
            <p className="text-[11px] text-white/35 mb-1">Monthly Earnings</p>
            <p className="font-display text-2xl font-bold text-white">{formatMoney(SITE_STATS.monthlyEarnings)}</p>
            <div className="flex items-center gap-1 mt-1.5">
              <TrendingUp size={11} className="text-chart-2" />
              <span className="text-[11px] text-chart-2 font-medium">+18.4% this month</span>
            </div>
          </div>

          {/* Followers badge */}
          <div
            className="absolute top-28 right-[-12px] rounded-xl px-3 py-2 flex items-center gap-2 border border-white/10"
            style={{ background: "rgba(10,10,10,0.85)", backdropFilter: "blur(20px)" }}
          >
            <div className="flex -space-x-1.5">
              {photographers.slice(0, 3).map((p, i) => (
                <div key={i} className="w-6 h-6 rounded-full overflow-hidden border-2 border-black">
                  <UImg name={p.avatar} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <span className="text-xs font-semibold text-white whitespace-nowrap">+48.2K</span>
          </div>

          {/* Sale notification */}
          <div
            className="absolute bottom-[220px] right-[-8px] rounded-xl px-3 py-2 flex items-center gap-2 border border-primary/25"
            style={{ background: "rgba(10,10,10,0.85)", backdropFilter: "blur(20px)", boxShadow: "0 8px 24px rgba(255,107,0,0.12)" }}
          >
            <ShoppingCart size={13} className="text-primary" />
            <div>
              <p className="text-[11px] font-semibold text-white">Photo Sold</p>
              <p className="text-[10px] text-white/40">+{formatMoney(SITE_STATS.recentSaleAmount)} · Fashion Editorial</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: "linear-gradient(to top, var(--background), transparent)" }} />
    </section>
  );
}