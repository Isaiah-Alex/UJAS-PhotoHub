"use client";

import { ArrowRight } from "lucide-react";
import { BookingCalendar } from "@/components/booking/ui/BookingCalender";
import { TimeSlotGrid } from "@/components/booking/ui/TimeSlotGrid";

interface Props {
    calYear: number;
    calMonth: number;
    selectedDay: number | null;
    selectedSlot: string | null;
    onPrevMonth: () => void;
    onNextMonth: () => void;
    onSelectDay: (day: number) => void;
    onSelectSlot: (slot: string) => void;
    onNext: () => void;
}

export function DateTimeStep({
                                 calYear,
                                 calMonth,
                                 selectedDay,
                                 selectedSlot,
                                 onPrevMonth,
                                 onNextMonth,
                                 onSelectDay,
                                 onSelectSlot,
                                 onNext,
                             }: Props) {
    const canContinue = !!selectedDay && !!selectedSlot;

    return (
        <div className="space-y-5">
            <h2 className="font-display text-xl font-bold text-foreground mb-5">
                Pick a date & time
            </h2>

            <BookingCalendar
                year={calYear}
                month={calMonth}
                selectedDay={selectedDay}
                onPrevMonth={onPrevMonth}
                onNextMonth={onNextMonth}
                onSelectDay={onSelectDay}
            />

            {selectedDay && (
                <TimeSlotGrid
                    month={calMonth}
                    selectedDay={selectedDay}
                    selectedSlot={selectedSlot}
                    onSelectSlot={onSelectSlot}
                />
            )}

            <button
                onClick={() => canContinue && onNext()}
                disabled={!canContinue}
                className="w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
                style={{
                    background: canContinue
                        ? "linear-gradient(135deg, var(--primary), var(--chart-5))"
                        : "var(--input)",
                    boxShadow: canContinue
                        ? "0 0 24px var(--primary-glow)"
                        : "none",
                    color: canContinue
                        ? "var(--primary-foreground)"
                        : "color-mix(in srgb, var(--foreground) 20%, transparent)",
                }}
            >
                Continue to Details <ArrowRight size={15} />
            </button>
        </div>
    );
}