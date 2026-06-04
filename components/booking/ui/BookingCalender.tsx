"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
    MONTHS,
    DAYS,
    buildCalendar,
    bookedSlots,
    timeSlots,
    isPastDay,
} from "@/lib/booking-utils";

interface Props {
    year: number;
    month: number;
    selectedDay: number | null;
    onPrevMonth: () => void;
    onNextMonth: () => void;
    onSelectDay: (day: number) => void;
}

export function BookingCalendar({
                                    year,
                                    month,
                                    selectedDay,
                                    onPrevMonth,
                                    onNextMonth,
                                    onSelectDay,
                                }: Props) {
    const cells = buildCalendar(year, month);

    return (
        <div className="rounded-2xl border border-border bg-muted p-5">
            {/* Month nav */}
            <div className="flex items-center justify-between mb-5">
                <button
                    onClick={onPrevMonth}
                    className="w-8 h-8 rounded-lg bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center text-secondary-foreground hover:text-foreground transition-all"
                >
                    <ChevronLeft size={15} />
                </button>

                <span className="font-display font-bold text-foreground">
                    {MONTHS[month]} {year}
                </span>

                <button
                    onClick={onNextMonth}
                    className="w-8 h-8 rounded-lg bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center text-secondary-foreground hover:text-foreground transition-all"
                >
                    <ChevronRight size={15} />
                </button>
            </div>

            {/* Day names */}
            <div className="grid grid-cols-7 mb-2">
                {DAYS.map((d) => (
                    <div
                        key={d}
                        className="text-center text-[11px] font-semibold text-muted-foreground py-1"
                    >
                        {d}
                    </div>
                ))}
            </div>

            {/* Date cells */}
            <div className="grid grid-cols-7 gap-1">
                {cells.map((d, i) => {
                    if (!d) return <div key={i} />;

                    const past = isPastDay(year, month, d);
                    const booked = bookedSlots[d]?.length === timeSlots.length;
                    const busy = !!bookedSlots[d];
                    const selected = selectedDay === d;

                    return (
                        <button
                            key={i}
                            disabled={past || booked}
                            onClick={() => onSelectDay(d)}
                            className={`relative h-10 w-full rounded-xl text-sm font-medium transition-all duration-200 ${
                                selected
                                    ? "text-primary-foreground scale-105"
                                    : past || booked
                                        ? "text-foreground/15 cursor-not-allowed"
                                        : busy
                                            ? "text-secondary-foreground hover:text-foreground"
                                            : "text-secondary-foreground hover:text-foreground hover:bg-foreground/10"
                            }`}
                            style={
                                selected
                                    ? {
                                        background:
                                            "linear-gradient(135deg, var(--primary), var(--chart-5))",
                                        boxShadow:
                                            "0 4px 16px var(--primary-glow)",
                                    }
                                    : busy && !past
                                        ? {
                                            background:
                                                "color-mix(in srgb, var(--primary) 6%, transparent)",
                                            border:
                                                "1px solid color-mix(in srgb, var(--primary) 15%, transparent)",
                                        }
                                        : {}
                            }
                        >
                            {d}

                            {busy && !selected && !past && (
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-foreground/5 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Partially booked
                </span>

                <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-chart-2" />
                    Selected
                </span>

                <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-foreground/10" />
                    Unavailable
                </span>
            </div>
        </div>
    );
}