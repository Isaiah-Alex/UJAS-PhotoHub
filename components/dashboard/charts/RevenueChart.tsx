"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
import type { RevenueDataPoint } from "@/lib/photohub-data";

interface Props {
    data: RevenueDataPoint[];
    view: "revenue" | "bookings";
}

function CustomTooltip({ active, payload, label, view }: any) {
    if (!active || !payload?.length) return null;
    const value = payload[0].value;
    return (
        <div
            className="px-3 py-2 rounded-xl border border-white/10 text-xs"
            style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(12px)" }}
        >
            <p className="text-white/50 mb-1">{label}</p>
            <p className="font-bold text-white">
                {view === "revenue" ? `₦${value.toLocaleString()}` : `${value} bookings`}
            </p>
        </div>
    );
}

export function RevenueChart({ data, view }: Props) {
    return (
        <ResponsiveContainer width="100%" height={192}>
            <BarChart data={data} barCategoryGap="30%">
                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
                <XAxis
                    dataKey="month"
                    tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                    content={<CustomTooltip view={view} />}
                    cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Bar
                    dataKey={view === "revenue" ? "revenue" : "bookings"}
                    radius={[6, 6, 0, 0]}
                    fill="var(--primary)"
                />
            </BarChart>
        </ResponsiveContainer>
    );
}