"use client";

import { Clock } from "lucide-react";
import { MONTHS, timeSlots, bookedSlots } from "@/lib/booking-utils";

interface Props {
    month: number;
    selectedDay: number;
    selectedSlot: string | null;
    onSelectSlot: (slot: string) => void;
}

export function TimeSlotGrid({
                                 month,
                                 selectedDay,
                                 selectedSlot,
                                 onSelectSlot,
                             }: Props) {
    return (
        <div className="rounded-2xl border border-border bg-muted p-5">
            <h3 className="font-semibold text-foreground text-sm mb-4 flex items-center gap-2">
                <Clock size={14} className="text-primary" />
                Available times for {MONTHS[month]} {selectedDay}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {timeSlots.map((slot) => {
                    const taken = bookedSlots[selectedDay]?.includes(slot);
                    const selected = selectedSlot === slot;

                    return (
                        <button
                            key={slot}
                            disabled={taken}
                            onClick={() => onSelectSlot(slot)}
                            className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                                selected
                                    ? "text-primary-foreground"
                                    : taken
                                        ? "text-foreground/15 cursor-not-allowed bg-foreground/5"
                                        : "text-secondary-foreground hover:text-foreground border border-border hover:border-foreground/20 bg-muted"
                            }`}
                            style={
                                selected
                                    ? {
                                        background:
                                            "linear-gradient(135deg, var(--primary), var(--chart-5))",
                                        boxShadow:
                                            "0 4px 12px var(--primary-glow)",
                                    }
                                    : {}
                            }
                        >
                            {slot}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}