"use client";

import { Star, MapPin, CalendarDays, Clock, Info, Award, Lock, CheckCircle } from "lucide-react";
import { UImg } from "@/components/photohub/Helpers";
import { type Photographer } from "@/lib/photohub-data";
import { MONTHS, extras, calcPricing, type SessionType } from "@/lib/booking-utils";
import { CURRENCY, formatMoney } from "@/lib/site-config";

interface Props {
    photographer: Photographer;
    selectedSession: SessionType;
    addOns: string[];
    calMonth: number;
    calYear: number;
    selectedDay: number | null;
    selectedSlot: string | null;
}

export function BookingSidebar({
                                   photographer,
                                   selectedSession,
                                   addOns,
                                   calMonth,
                                   calYear,
                                   selectedDay,
                                   selectedSlot,
                               }: Props) {
    const { subtotal, fee, total } = calcPricing(selectedSession.price, addOns);

    return (
        <div className="lg:sticky lg:top-24 space-y-4">
            {/* Photographer card */}
            <div className="rounded-2xl border border-border overflow-hidden bg-muted">
                <div className="relative h-28">
                    <UImg
                        name={photographer.cover}
                        alt="Cover"
                        className="w-full h-full object-cover"
                    />

                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(to bottom, transparent, var(--surface-overlay))",
                        }}
                    />
                </div>

                <div className="p-4 -mt-8 relative">
                    <div className="flex items-end gap-3 mb-3">
                        <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-muted flex-shrink-0">
                            <UImg
                                name={photographer.avatar}
                                alt={photographer.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div>
                            <p className="font-display font-bold text-foreground">
                                {photographer.name}
                            </p>

                            <p className="text-xs text-muted-foreground">
                                {photographer.specialty}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Star
                                size={10}
                                className="fill-primary text-primary"
                            />
                            {photographer.rating} ({photographer.reviews})
                        </span>

                        <span className="flex items-center gap-1">
                            <MapPin size={10} />
                            {photographer.location}
                        </span>
                    </div>
                </div>
            </div>

            {/* Booking summary */}
            <div className="rounded-2xl border border-border bg-muted p-5 space-y-4">
                <h3 className="font-semibold text-foreground text-sm">
                    Booking Summary
                </h3>

                <div className="space-y-2.5">
                    <div className="flex items-start justify-between text-sm">
                        <span className="text-secondary-foreground">
                            Session
                        </span>

                        <span className="text-foreground font-medium text-right max-w-[160px]">
                            {selectedSession.label}
                        </span>
                    </div>

                    {selectedDay && (
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-secondary-foreground flex items-center gap-1">
                                <CalendarDays size={11} /> Date
                            </span>

                            <span className="text-foreground font-medium">
                                {MONTHS[calMonth]} {selectedDay}, {calYear}
                            </span>
                        </div>
                    )}

                    {selectedSlot && (
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-secondary-foreground flex items-center gap-1">
                                <Clock size={11} /> Time
                            </span>

                            <span className="text-foreground font-medium">
                                {selectedSlot}
                            </span>
                        </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-secondary-foreground">
                            Duration
                        </span>

                        <span className="text-foreground font-medium">
                            {selectedSession.duration}
                        </span>
                    </div>

                    {selectedSlot && (
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-secondary-foreground flex items-center gap-1">
                                session location
                            </span>

                            <span className="text-foreground font-medium">
                                some location
                            </span>
                        </div>
                    )}
                </div>

                {/* Add-ons */}
                {addOns.length > 0 && (
                    <div className="border-t border-foreground/5 pt-3 space-y-2">
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                            Add-ons
                        </p>

                        {extras
                            .filter((e) => addOns.includes(e.id))
                            .map((e) => (
                                <div
                                    key={e.id}
                                    className="flex items-center justify-between text-sm"
                                >
                                    <span className="text-secondary-foreground">
                                        {e.label}
                                    </span>

                                    <span className="text-foreground font-medium">
                                        +{formatMoney(e.price)}
                                    </span>
                                </div>
                            ))}
                    </div>
                )}

                {/* Totals */}
                <div className="border-t border-border pt-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-secondary-foreground">
                            Subtotal
                        </span>

                        <span className="text-foreground">
                            {formatMoney(subtotal)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-secondary-foreground flex items-center gap-1">
                            Platform fee <Info size={10} />
                        </span>

                        <span className="text-foreground">
                            {formatMoney(fee)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between border-t border-border pt-2 mt-1">
                        <span className="font-bold text-foreground">
                            Total
                        </span>

                        <span className="font-display font-bold text-xl text-primary">
                            {formatMoney(total)}
                        </span>
                    </div>
                </div>

                {/* Cancellation policy */}
                <div className="p-3 rounded-xl border border-foreground/5 bg-foreground/5">
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                        <span className="text-secondary-foreground font-semibold">
                            Free cancellation
                        </span>{" "}
                        up to 48 hrs before session. 50% refund within 24 hrs.
                    </p>
                </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2">
                {[
                    { icon: <Lock size={14} />, label: "Secure Pay" },
                    { icon: <CheckCircle size={14} />, label: "Verified Pro" },
                    { icon: <Award size={14} />, label: "Satisfaction" },
                ].map(({ icon, label }) => (
                    <div
                        key={label}
                        className="flex flex-col items-center gap-1.5 py-3 rounded-xl border border-foreground/5 bg-muted"
                    >
                        <span className="text-primary">{icon}</span>

                        <span className="text-[10px] text-muted-foreground font-medium">
                            {label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}