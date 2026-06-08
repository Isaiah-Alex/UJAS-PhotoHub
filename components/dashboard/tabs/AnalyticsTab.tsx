"use client";

import { Eye, Heart } from "lucide-react";
import { UImg } from "@/components/photohub/Helpers";
import { RevenueChart } from "@/components/dashboard/charts/RevenueChart";
import { revenueData, dashPortfolio } from "@/lib/photohub-data";

export function AnalyticsTab() {
    return (
        <div className="space-y-5">
            {/* Top metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
                { label: "Profile Views",      value: "12,840", change: "+24%",   color: "var(--primary)"  },
    { label: "Conversion Rate",    value: "6.8%",   change: "+1.2%",  color: "var(--chart-2)"  },
    { label: "Avg. Session Value", value: "₦680K",  change: "+₦42K",  color: "var(--chart-4)"  },
    { label: "Repeat Clients",     value: "38%",    change: "+5%",    color: "var(--chart-3)"  },
].map(({ label, value, change, color }) => (
        <div key={label} className="p-5 rounded-2xl border border-border bg-card">
    <p className="text-xs text-muted-foreground mb-2">{label}</p>
        <p className="font-display text-2xl font-bold text-white">{value}</p>
        <p className="text-xs font-semibold mt-1" style={{ color }}>{change} vs last month</p>
    </div>
))}
    </div>

    {/* Revenue trend */}
    <div className="p-5 rounded-2xl border border-border bg-card">
    <div className="flex items-center justify-between mb-6">
    <div>
        <h3 className="font-display font-bold text-white">Revenue Trend</h3>
    <p className="text-xs text-muted-foreground mt-0.5">Monthly breakdown · Jan–Aug 2026</p>
    </div>
    <div className="text-right">
    <p className="font-display text-2xl font-bold text-white">₦34.9M</p>
    <p className="text-xs text-chart-2">+28% year to date</p>
    </div>
    </div>
    <RevenueChart data={revenueData} view="revenue" />
        </div>

    {/* Traffic sources + top photos */}
    <div className="grid lg:grid-cols-2 gap-4">
        {/* Traffic sources */}
        <div className="p-5 rounded-2xl border border-border bg-card">
    <h3 className="font-display font-bold text-white text-sm mb-4">Traffic Sources</h3>
    <div className="space-y-3">
        {[
                { source: "Direct search",    pct: 42, color: "var(--primary)"  },
    { source: "Platform explore", pct: 31, color: "var(--chart-4)"  },
    { source: "Social media",     pct: 18, color: "#3B9EFF"         },
    { source: "Referrals",        pct: 9,  color: "var(--chart-2)"  },
].map(({ source, pct, color }) => (
        <div key={source}>
        <div className="flex justify-between text-xs mb-1">
        <span className="text-white/60">{source}</span>
            <span className="font-semibold text-white">{pct}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/6 overflow-hidden">
    <div
        className="h-full rounded-full transition-all"
    style={{ width: `${pct}%`, background: color }}
    />
    </div>
    </div>
))}
    </div>
    </div>

    {/* Top performing photos */}
    <div className="p-5 rounded-2xl border border-border bg-card">
    <h3 className="font-display font-bold text-white text-sm mb-4">Top Performing Photos</h3>
    <div className="space-y-3">
        {dashPortfolio.slice(0, 5).map((photo, i) => (
                <div key={photo.id} className="flex items-center gap-3">
            <span className="text-sm font-bold text-white/20 w-4 flex-shrink-0">{i + 1}</span>
                <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0">
            <UImg name={photo.img} alt={photo.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white/80 truncate">{photo.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
            <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
            <Eye size={9} />{photo.views.toLocaleString()}
    </span>
    <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
    <Heart size={9} />{photo.likes}
    </span>
    </div>
    </div>
    <div className="flex-shrink-0">
    <div className="h-1 w-16 rounded-full bg-white/6 overflow-hidden">
    <div
        className="h-full rounded-full"
    style={{
        width: `${(photo.views / 5210) * 100}%`,
            background: "linear-gradient(90deg, var(--primary), var(--accent))",
    }}
    />
    </div>
    </div>
    </div>
))}
    </div>
    </div>
    </div>
    </div>
);
}