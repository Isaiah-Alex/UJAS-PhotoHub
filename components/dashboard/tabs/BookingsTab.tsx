"use client";

import {
    Award, BookOpen, CheckCircle, ChevronLeft, ChevronRight,
    Clock, Download, Filter, MessageSquare, MoreHorizontal, X,
} from "lucide-react";
import { UImg } from "@/components/photohub/Helpers";
import { statusStyle } from "@/components/dashboard/dashboard-constants";
import { dashBookings } from "@/lib/photohub-data";
import { DAYS } from "@/lib/photohub-data";
import type { BookingFilter } from "@/hooks/useDashboard";

interface Props {
    bookingFilter: BookingFilter;
    onFilterChange: (f: BookingFilter) => void;
    confirmedCount: number;
    pendingCount: number;
    completedCount: number;
    visibleBookings: typeof dashBookings;
}

export function BookingsTab({
                                bookingFilter,
                                onFilterChange,
                                confirmedCount,
                                pendingCount,
                                completedCount,
                                visibleBookings,
                            }: Props) {
    return (
        <div className="space-y-5">
            {/* Summary cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                    { label: "Total Bookings", value: dashBookings.length,  color: "var(--secondary-foreground)", icon: <BookOpen size={16} />,    sub: "All sessions"      },
                    { label: "Confirmed",      value: confirmedCount,        color: "var(--chart-2)",              icon: <CheckCircle size={16} />, sub: "Ready to shoot"    },
                    { label: "Pending",        value: pendingCount,          color: "var(--chart-3)",              icon: <Clock size={16} />,       sub: "Awaiting response" },
                    { label: "Completed",      value: completedCount,        color: "var(--chart-4)",              icon: <Award size={16} />,       sub: "Sessions done"     },
                ].map(({ label, value, color, icon, sub }) => (
                    <div key={label} className="p-4 rounded-2xl border border-border bg-card space-y-3">
                        <div className="flex items-center justify-between">
                            <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center"
                                style={{
                                    background: `color-mix(in srgb, ${color} 15%, transparent)`,
                                    border: `1px solid color-mix(in srgb, ${color} 25%, transparent)`,
                                }}
                            >
                                <span style={{ color }}>{icon}</span>
                            </div>
                            <span
                                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                                style={{
                                    background: `color-mix(in srgb, ${color} 12%, transparent)`,
                                    color,
                                }}
                            >
                {label === "Pending" && value > 0 ? "Action needed" :
                    label === "Confirmed" ? "Upcoming" :
                        label === "Completed" ? "Paid out" : "All time"}
              </span>
                        </div>
                        <div>
                            <p className="font-display text-3xl font-bold text-white">{value}</p>
                            <p className="text-xs mt-0.5 text-muted-foreground">{sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter + table */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
                {/* Filters */}
                <div className="flex items-center gap-2 p-4 border-b border-border flex-wrap">
                    <div className="flex gap-1 p-1 rounded-xl bg-white/5">
                        {(["all", "confirmed", "pending", "completed"] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => onFilterChange(f)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                                    bookingFilter === f ? "text-white" : "text-white/35 hover:text-white/60"
                                }`}
                                style={
                                    bookingFilter === f
                                        ? { background: "linear-gradient(135deg, var(--primary), var(--accent))" }
                                        : {}
                                }
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-border text-xs text-white/50 hover:text-white transition-all">
                            <Filter size={12} /> Filter
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-border text-xs text-white/50 hover:text-white transition-all">
                            <Download size={12} /> Export
                        </button>
                    </div>
                </div>

                {/* Column headers */}
                <div
                    className="hidden sm:grid px-5 py-2.5 border-b border-border text-[10px] font-bold text-white/25 uppercase tracking-widest"
                    style={{ gridTemplateColumns: "1fr 160px 90px 110px 100px" }}
                >
                    <div>Client</div>
                    <div>Date & Time</div>
                    <div className="text-right">Price</div>
                    <div className="text-center">Status</div>
                    <div className="text-right">Actions</div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-border">
                    {visibleBookings.map((b) => {
                        const st = statusStyle[b.status];
                        return (
                            <div key={b.id} className="group px-5 py-4 hover:bg-white/3 transition-all">
                                {/* Desktop */}
                                <div
                                    className="hidden sm:grid items-center"
                                    style={{ gridTemplateColumns: "1fr 160px 90px 110px 100px" }}
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 border border-border">
                                            <UImg name={b.avatar} alt={b.client} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-semibold text-white text-sm truncate">{b.client}</p>
                                            <p className="text-[11px] text-muted-foreground truncate">{b.type}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/70">{b.date}</p>
                                        <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                                            <Clock size={9} className="text-white/25" />{b.time}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-sm text-primary">
                                            ₦{(b.price / 1000).toFixed(0)}K
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${st.bg} ${st.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${st.dot}`} />
                        {b.status}
                    </span>
                                    </div>
                                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {b.status === "pending" && (
                                            <>
                                                <button className="w-7 h-7 rounded-lg bg-chart-2/15 flex items-center justify-center text-chart-2 hover:bg-chart-2/25 transition-all">
                                                    <CheckCircle size={13} />
                                                </button>
                                                <button className="w-7 h-7 rounded-lg bg-destructive/15 flex items-center justify-center text-destructive hover:bg-destructive/30 transition-all">
                                                    <X size={13} />
                                                </button>
                                            </>
                                        )}
                                        <button className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
                                            <MessageSquare size={13} />
                                        </button>
                                        <button className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
                                            <MoreHorizontal size={13} />
                                        </button>
                                    </div>
                                </div>

                                {/* Mobile */}
                                <div className="sm:hidden flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-border">
                                        <UImg name={b.avatar} alt={b.client} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <p className="font-semibold text-white text-sm">{b.client}</p>
                                                <p className="text-[11px] text-muted-foreground">{b.type}</p>
                                            </div>
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold flex-shrink-0 ${st.bg} ${st.text}`}>
                        <span className={`w-1 h-1 rounded-full ${st.dot}`} />{b.status}
                      </span>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <p className="text-xs text-muted-foreground">{b.date} · {b.time}</p>
                                            <p className="font-bold text-sm text-primary">₦{(b.price / 1000).toFixed(0)}K</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Mini calendar */}
            <div className="p-5 rounded-2xl border border-border bg-card">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-bold text-white text-sm">June 2026</h3>
                    <div className="flex gap-1">
                        <button className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all">
                            <ChevronLeft size={13} />
                        </button>
                        <button className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all">
                            <ChevronRight size={13} />
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {DAYS.map((d) => (
                        <div key={d} className="text-center text-[10px] font-bold text-white/25 py-1">{d}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {[null, null, 1, ...Array.from({ length: 29 }, (_, i) => i + 2)].map((d, i) => {
                        if (!d) return <div key={i} />;
                        const booked  = [15, 22].includes(d);
                        const pending = [8].includes(d);
                        const isToday = d === 3;
                        return (
                            <div
                                key={i}
                                className={`h-8 rounded-lg flex items-center justify-center text-xs font-medium relative cursor-pointer transition-all ${
                                    isToday  ? "text-white ring-1 ring-primary" :
                                        booked   ? "text-white" :
                                            pending  ? "text-chart-3" :
                                                "text-white/35 hover:text-white hover:bg-white/5"
                                }`}
                                style={
                                    booked
                                        ? { background: "linear-gradient(135deg, rgba(255,107,0,0.25), rgba(255,34,0,0.15))", border: "1px solid rgba(255,107,0,0.3)" }
                                        : isToday
                                            ? { background: "rgba(255,107,0,0.1)" }
                                            : {}
                                }
                            >
                                {d}
                                {(booked || pending) && (
                                    <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${booked ? "bg-primary" : "bg-chart-3"}`} />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}