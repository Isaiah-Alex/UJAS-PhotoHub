"use client";

import { CheckCircle } from "lucide-react";
import { MONTHS, calcPricing, type SessionType } from "@/lib/booking-utils";
import { type Photographer } from "@/lib/photohub-data";

interface Props {
    photographer: Photographer;
    selectedSession: SessionType;
    addOns: string[];
    calMonth: number;
    calYear: number;
    selectedDay: number | null;
    selectedSlot: string | null;
    onGoHome: () => void;
    onViewProfile: () => void;
}

export function BookingConfirmed({
                                     photographer,
                                     selectedSession,
                                     addOns,
                                     calMonth,
                                     calYear,
                                     selectedDay,
                                     selectedSlot,
                                     onGoHome,
                                     onViewProfile,
                                 }: Props) {
    const { total } = calcPricing(selectedSession.price, addOns);

    const summaryRows = [
        { label: "Photographer", value: photographer.name },
        { label: "Session Type", value: selectedSession.label },
        { label: "Date", value: selectedDay ? `${MONTHS[calMonth]} ${selectedDay}, ${calYear}` : "—" },
        { label: "Time", value: selectedSlot ?? "—" },
        { label: "Duration", value: selectedSession.duration },
        { label: "Total Paid", value: `₦${total.toLocaleString()}` },
    ];

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[160px] opacity-20"
                    style={{ background: "var(--chart-2)" }}
                />
            </div>

            <div className="relative z-10 max-w-md w-full text-center space-y-6">
                {/* Icon */}
                <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
                    style={{
                        background:
                            "linear-gradient(135deg, var(--chart-2), color-mix(in srgb, var(--chart-2) 75%, black))",
                        boxShadow:
                            "0 0 60px color-mix(in srgb, var(--chart-2) 40%, transparent)",
                    }}
                >
                    <CheckCircle
                        size={36}
                        className="text-primary-foreground"
                    />
                </div>

                {/* Heading */}
                <div>
                    <h1 className="font-display text-4xl font-bold text-foreground mb-2">
                        Booking Confirmed!
                    </h1>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Your session with{" "}
                        <span className="text-foreground font-semibold">
                            {photographer.name}
                        </span>{" "}
                        has been confirmed. A confirmation email has been sent to you.
                    </p>
                </div>

                {/* Summary card */}
                <div
                    className="p-5 rounded-2xl border border-border text-left space-y-3"
                    style={{
                        background: "var(--surface-overlay)",
                    }}
                >
                    {summaryRows.map(({ label, value }) => (
                        <div
                            key={label}
                            className="flex items-center justify-between text-sm"
                        >
                            <span className="text-muted-foreground">
                                {label}
                            </span>

                            <span
                                className={`font-semibold ${
                                    label === "Total Paid"
                                        ? "text-chart-2"
                                        : "text-foreground"
                                }`}
                            >
                                {value}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onGoHome}
                        className="flex-1 py-3 rounded-xl text-sm font-semibold text-secondary-foreground border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 hover:text-foreground transition-all"
                    >
                        Back to Home
                    </button>

                    <button
                        onClick={onViewProfile}
                        className="flex-1 py-3 rounded-xl text-sm font-bold text-primary-foreground"
                        style={{
                            background:
                                "linear-gradient(135deg, var(--primary), var(--chart-5))",
                            boxShadow:
                                "0 0 20px var(--primary-glow)",
                        }}
                    >
                        View Profile
                    </button>
                </div>
            </div>
        </div>
    );
}