"use client";

import { ResponsiveContainer, BarChart, Bar } from "recharts";

interface Props {
    data: number[];
    color?: string;
}

export function SparkBar({ data, color = "var(--primary)" }: Props) {
    const chartData = data.map((v, i) => ({ v, i }));
    return (
        <ResponsiveContainer width={64} height={32}>
            <BarChart data={chartData} barCategoryGap="20%">
                <Bar dataKey="v" radius={[2, 2, 0, 0]} fill={color} opacity={0.7} />
            </BarChart>
        </ResponsiveContainer>
    );
}