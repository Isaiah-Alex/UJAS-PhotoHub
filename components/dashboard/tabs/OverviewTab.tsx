"use client";

import {
  CalendarDays,
  CheckCircle,
  ChevronRight,
  Eye,
  ShoppingCart,
  Wallet,
} from "lucide-react";
import { UImg } from "@/components/photohub/Helpers";
import { RevenueChart } from "@/components/dashboard/charts/RevenueChart";
import { SparkBar } from "@/components/dashboard/charts/SparkBar";
import {
  statusStyle,
  activityColor,
  activityEmoji,
} from "@/components/dashboard/dashboard-constants";
import { revenueData, activityFeed, dashBookings } from "@/lib/photohub-data";
import type { DashTab } from "@/hooks/useDashboard";
import { useDashboard } from "@/hooks/useDashboard";

interface Props {
  confirmedCount: number;
  pendingCount: number;
  revenueView: "revenue" | "bookings";
  onRevenueViewChange: (v: "revenue" | "bookings") => void;
  onTabChange: (t: DashTab) => void;
}

export function OverviewTab({
  confirmedCount,
  revenueView,
  onRevenueViewChange,
  onTabChange,
}: Props) {
  const upcoming = dashBookings
    .filter((b) => b.status !== "completed")
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Earnings",
            value: "₦24.6M",
            sub: "+18.4% this month",
            icon: <Wallet size={18} />,
            color: "var(--primary)",
            spark: [280, 320, 290, 410, 380, 520, 470, 610],
          },
          {
            label: "Bookings",
            value: `${dashBookings.length}`,
            sub: `${confirmedCount} confirmed`,
            icon: <CalendarDays size={18} />,
            color: "var(--chart-2)",
            spark: [5, 8, 6, 11, 9, 14, 12, 17],
          },
          {
            label: "Profile Views",
            value: "12,840",
            sub: "+24% this week",
            icon: <Eye size={18} />,
            color: "var(--chart-4)",
            spark: [80, 110, 95, 140, 125, 160, 138, 184],
          },
          {
            label: "Photo Sales",
            value: "284",
            sub: "+₦1.2M revenue",
            icon: <ShoppingCart size={18} />,
            color: "var(--chart-3)",
            spark: [18, 24, 21, 30, 27, 35, 32, 40],
          },
        ].map(({ label, value, sub, icon, color, spark }) => (
          <div
            key={label}
            className="p-5 rounded-2xl border border-border bg-card space-y-3"
          >
            <div className="flex items-center justify-between">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: `color-mix(in srgb, ${color} 15%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${color} 22%, transparent)`,
                }}
              >
                <span style={{ color }}>{icon}</span>
              </div>
              <SparkBar data={spark} color={color} />
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-white">
                {value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
            <p className="text-[11px] font-semibold" style={{ color }}>
              {sub}
            </p>
          </div>
        ))}
      </div>

      {/* Revenue chart + activity feed */}
      <div className="grid lg:grid-cols-[1fr_300px] gap-4">
        {/* Revenue */}
        <div className="p-5 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display font-bold text-white">
                Revenue Overview
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Last 8 months
              </p>
            </div>
            <div className="flex gap-1 p-1 rounded-xl bg-white/5">
              {(["Revenue", "Bookings"] as const).map((v) => {
                const key = v.toLowerCase() as "revenue" | "bookings";
                return (
                  <button
                    key={v}
                    onClick={() => onRevenueViewChange(key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      revenueView === key
                        ? "bg-white/10 text-white"
                        : "text-white/35 hover:text-white"
                    }`}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="lg:mt-20">
            <RevenueChart data={revenueData} view={revenueView} />
          </div>
        </div>

        {/* Activity feed */}
        <div className="p-5 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-white text-sm">
              Recent Activity
            </h3>
            <button className="text-xs text-primary hover:text-primary/80 transition-colors">
              See all
            </button>
          </div>
          <div className="space-y-4">
            {activityFeed.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border border-border text-sm"
                  style={{
                    background: `color-mix(in srgb, ${activityColor[a.type]} 18%, transparent)`,
                  }}
                >
                  {activityEmoji[a.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/70 leading-snug">{a.text}</p>
                  <div className="flex items-center justify-between mt-0.5">
                    <span
                      className="text-[10px] font-semibold"
                      style={{ color: activityColor[a.type] }}
                    >
                      {a.sub}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {a.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming bookings + profile strength */}
      <div className="grid lg:grid-cols-[1fr_280px] gap-4">
        {/* Upcoming sessions */}
        <div className="p-5 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-white text-sm">
              Upcoming Sessions
            </h3>
            <button
              onClick={() => onTabChange("bookings")}
              className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
            >
              Manage <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {upcoming.map((b) => {
              const st = statusStyle[b.status];
              return (
                <div
                  key={b.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/3 hover:bg-white/6 transition-all cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-border">
                    <UImg
                      name={b.avatar}
                      alt={b.client}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {b.client}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {b.type} · {b.date}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-sm text-primary">
                      ₦{(b.price / 1000).toFixed(0)}K
                    </p>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${st.bg} ${st.text}`}
                    >
                      {b.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Profile strength */}
        <div className="p-5 rounded-2xl border border-border bg-card space-y-4">
          <h3 className="font-display font-bold text-white text-sm">
            Profile Strength
          </h3>
          <div className="space-y-3">
            {[
              { label: "Photos uploaded", done: true },
              { label: "Bio written", done: true },
              { label: "Pricing set", done: true },
              { label: "Services listed", done: true },
              { label: "15+ reviews", done: false },
              { label: "Featured badge", done: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                    item.done ? "" : "border border-border"
                  }`}
                  style={
                    item.done
                      ? {
                          background:
                            "linear-gradient(135deg, var(--chart-2), #2ab866)",
                        }
                      : {}
                  }
                >
                  {item.done && (
                    <CheckCircle size={10} className="text-white" />
                  )}
                </div>
                <span
                  className={`text-xs ${item.done ? "text-white/65" : "text-white/30"}`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <div>
            <div className="flex justify-between text-[11px] text-muted-foreground mb-1.5">
              <span>67% complete</span>
              <span>4 / 6</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
              <div
                className="h-full w-[67%] rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, var(--primary), var(--accent))",
                }}
              />
            </div>
          </div>
          <button
            className="w-full py-2.5 rounded-xl text-xs font-semibold text-white cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, var(--primary), var(--accent))",
            }}
            onClick={() => onTabChange("settings")}
          >
            Complete Profile
          </button>
        </div>
      </div>
    </div>
  );
}
