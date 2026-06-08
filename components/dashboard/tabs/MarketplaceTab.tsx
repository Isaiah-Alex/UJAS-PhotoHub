"use client";

import { DollarSign, Edit3, PlusCircle, ShoppingCart, Target, Trash2 } from "lucide-react";
import { UImg } from "@/components/photohub/Helpers";
import { marketplaceItems } from "@/lib/photohub-data";

export function MarketplaceTab() {
    return (
        <div className="space-y-5">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "Total Sales",  value: "284",        icon: <ShoppingCart size={16} />, color: "var(--primary)"  },
                    { label: "Revenue",      value: "₦5,280,000", icon: <DollarSign size={16} />,   color: "var(--chart-2)"  },
                    { label: "Avg. Price",   value: "₦18,600",    icon: <Target size={16} />,        color: "var(--chart-4)"  },
                ].map(({ label, value, icon, color }) => (
                    <div key={label} className="p-4 rounded-2xl border border-border bg-card flex items-center gap-3">
                        <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                                background: `color-mix(in srgb, ${color} 15%, transparent)`,
                                border: `1px solid color-mix(in srgb, ${color} 22%, transparent)`,
                            }}
                        >
                            <span style={{ color }}>{icon}</span>
                        </div>
                        <div>
                            <p className="font-display text-xl font-bold text-white">{value}</p>
                            <p className="text-xs text-muted-foreground">{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-white">Listed Photos</h3>
                <button
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                    style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}
                >
                    <PlusCircle size={14} /> List New Photo
                </button>
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <div
                    className="grid gap-4 px-5 py-3 border-b border-border text-[11px] font-bold text-white/25 uppercase tracking-widest"
                    style={{ gridTemplateColumns: "auto 1fr auto auto auto auto" }}
                >
                    <div>Photo</div>
                    <div>Title</div>
                    <div>Price</div>
                    <div>Sales</div>
                    <div>Revenue</div>
                    <div>Actions</div>
                </div>

                {marketplaceItems.slice(0, 6).map((item) => (
                    <div
                        key={item.id}
                        className="grid gap-4 items-center px-5 py-3.5 border-b border-border hover:bg-white/3 transition-all group"
                        style={{ gridTemplateColumns: "auto 1fr auto auto auto auto" }}
                    >
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-border flex-shrink-0">
                            <UImg name={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                            <p className="font-semibold text-white text-sm truncate">{item.title}</p>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/6 text-white/40">
                {item.category}
              </span>
                        </div>
                        <p className="font-bold text-primary">₦{item.priceAmount.toLocaleString()}</p>
                        <p className="text-sm text-white/60">{item.downloads}</p>
                        <p className="text-sm font-semibold text-chart-2">
                            ₦{(item.downloads * item.priceAmount).toLocaleString()}
                        </p>
                        <div className="flex gap-1.5">
                            <button className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/12 transition-all">
                                <Edit3 size={12} />
                            </button>
                            <button className="w-7 h-7 rounded-lg bg-destructive/15 flex items-center justify-center text-destructive/60 hover:text-destructive hover:bg-destructive/30 transition-all">
                                <Trash2 size={12} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}