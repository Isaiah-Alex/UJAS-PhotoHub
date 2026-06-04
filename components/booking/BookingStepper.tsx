"use client";

import { CheckCircle } from "lucide-react";

const STEP_LABELS = ["Session", "Date & Time", "Details", "Payment"];

interface Props {
    currentStep: number;
}

export function BookingStepper({ currentStep }: Props) {
    return (
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-1">
            {STEP_LABELS.map((label, i) => {
                const s = i + 1;
                const isComplete = s < currentStep;
                const isCurrent = s === currentStep;

                return (
                    <div key={s} className="flex items-center gap-2 flex-shrink-0">
                        <div className="flex items-center gap-2">
                            <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-400 ${
                                    isComplete || isCurrent
                                        ? "text-primary-foreground"
                                        : "text-foreground/25 border border-foreground/15"
                                }`}
                                style={
                                    isComplete
                                        ? {
                                            background:
                                                "color-mix(in srgb, var(--chart-2) 90%, transparent)",
                                        }
                                        : isCurrent
                                            ? {
                                                background:
                                                    "linear-gradient(135deg, var(--primary), var(--chart-5))",
                                                boxShadow:
                                                    "0 0 12px var(--primary-glow)",
                                            }
                                            : {}
                                }
                            >
                                {isComplete ? <CheckCircle size={13} /> : s}
                            </div>

                            <span
                                className={`text-sm font-medium transition-colors ${
                                    isCurrent
                                        ? "text-foreground"
                                        : isComplete
                                            ? "text-chart-2"
                                            : "text-foreground/25"
                                }`}
                            >
                                {label}
                            </span>
                        </div>

                        {i < STEP_LABELS.length - 1 && (
                            <div
                                className={`w-8 md:w-16 h-px rounded-full transition-all duration-400 ${
                                    isComplete
                                        ? "bg-chart-2/50"
                                        : "bg-border"
                                }`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}