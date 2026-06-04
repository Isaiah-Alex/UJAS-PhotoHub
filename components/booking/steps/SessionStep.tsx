"use client";

import { ArrowRight, CheckCircle, Clock, Sparkles } from "lucide-react";
import { sessionTypes, extras, type SessionType } from "@/lib/booking-utils";
import { CURRENCY } from "@/lib/site-config";

interface Props {
    selectedSession: SessionType;
    addOns: string[];
    onSelectSession: (session: SessionType) => void;
    onToggleAddOn: (id: string) => void;
    onNext: () => void;
}

export function SessionStep({
                                selectedSession,
                                addOns,
                                onSelectSession,
                                onToggleAddOn,
                                onNext,
                            }: Props) {
    return (
        <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-foreground mb-5">
                Choose your session type
            </h2>

            {/* Session type grid */}
            <div className="grid sm:grid-cols-2 gap-3">
                {sessionTypes.map((s) => {
                    const isSelected = selectedSession.id === s.id;

                    return (
                        <button
                            key={s.id}
                            onClick={() => onSelectSession(s)}
                            className={`text-left p-5 rounded-2xl border transition-all duration-300 ${
                                isSelected
                                    ? "border-primary/50 bg-primary/10"
                                    : "border-border bg-muted hover:border-foreground/20 hover:bg-secondary"
                            }`}
                            style={
                                isSelected
                                    ? {
                                        boxShadow:
                                            "0 0 0 1px var(--primary-glow-soft), 0 8px 24px var(--primary-glow)",
                                    }
                                    : {}
                            }
                        >
                            <div className="flex items-start justify-between mb-3">
                                <span className="text-2xl">{s.icon}</span>

                                <div
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                        isSelected
                                            ? "border-primary"
                                            : "border-foreground/20"
                                    }`}
                                    style={
                                        isSelected
                                            ? {
                                                background:
                                                    "linear-gradient(135deg, var(--primary), var(--chart-5))",
                                            }
                                            : {}
                                    }
                                >
                                    {isSelected && (
                                        <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                                    )}
                                </div>
                            </div>

                            <p className="font-semibold text-foreground text-sm mb-1">
                                {s.label}
                            </p>

                            <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock size={10} /> {s.duration}
                                </span>

                                <span className="font-bold text-primary">
                                    {CURRENCY.symbol + s.price.toLocaleString()}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Add-ons */}
            <div className="mt-6">
                <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                    <Sparkles size={14} className="text-primary" />
                    Add-on Services
                </h3>

                <div className="space-y-2">
                    {extras.map((e) => {
                        const isChecked = addOns.includes(e.id);

                        return (
                            <button
                                key={e.id}
                                onClick={() => onToggleAddOn(e.id)}
                                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                                    isChecked
                                        ? "border-primary/40 bg-primary/10"
                                        : "border-border bg-muted hover:border-foreground/20"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-all flex-shrink-0 ${
                                            isChecked
                                                ? ""
                                                : "border border-foreground/15 bg-foreground/5"
                                        }`}
                                        style={
                                            isChecked
                                                ? {
                                                    background:
                                                        "linear-gradient(135deg, var(--primary), var(--chart-5))",
                                                }
                                                : {}
                                        }
                                    >
                                        {isChecked && (
                                            <CheckCircle
                                                size={11}
                                                className="text-primary-foreground"
                                            />
                                        )}
                                    </div>

                                    <span className="text-sm text-secondary-foreground font-medium">
                                        {e.label}
                                    </span>
                                </div>

                                <span className="text-sm font-semibold text-primary">
                                    +{CURRENCY.symbol + e.price}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <button
                onClick={onNext}
                className="w-full mt-4 py-3.5 rounded-xl text-sm font-bold text-primary-foreground flex items-center justify-center gap-2"
                style={{
                    background:
                        "linear-gradient(135deg, var(--primary), var(--chart-5))",
                    boxShadow: "0 0 24px var(--primary-glow)",
                }}
            >
                Continue to Date & Time <ArrowRight size={15} />
            </button>
        </div>
    );
}