"use client";

import { CalendarDays, CreditCard, Globe, Info, Lock } from "lucide-react";
import { calcPricing, type SessionType } from "@/lib/booking-utils";

interface Props {
    selectedSession: SessionType;
    addOns: string[];
    payMethod: "card" | "paypal";
    cardNum: string;
    cardExp: string;
    cardCvv: string;
    cardName: string;
    loading: boolean;
    onPayMethodChange: (m: "card" | "paypal") => void;
    onCardNumChange: (v: string) => void;
    onCardExpChange: (v: string) => void;
    onCardCvvChange: (v: string) => void;
    onCardNameChange: (v: string) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export function PaymentStep({
                                selectedSession,
                                addOns,
                                payMethod,
                                cardNum,
                                cardExp,
                                cardCvv,
                                cardName,
                                loading,
                                onPayMethodChange,
                                onCardNumChange,
                                onCardExpChange,
                                onCardCvvChange,
                                onCardNameChange,
                                onSubmit,
                            }: Props) {
    const { total } = calcPricing(selectedSession.price, addOns);

    const formatCardNum = (raw: string) =>
        raw.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

    const formatExp = (raw: string) => {
        const v = raw.replace(/\D/g, "").slice(0, 4);
        return v.length > 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v;
    };

    return (
        <form onSubmit={onSubmit} className="space-y-5">
            <h2 className="font-display text-xl font-bold text-foreground mb-5">
                Payment details
            </h2>

            <div
                className="flex p-1 rounded-2xl border border-border mb-2"
                style={{ background: "var(--surface-overlay)" }}
            >
                {(["card", "paypal"] as const).map((m) => (
                    <button
                        type="button"
                        key={m}
                        onClick={() => onPayMethodChange(m)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all duration-300 flex items-center justify-center gap-2 ${
                            payMethod === m
                                ? "text-primary-foreground"
                                : "text-muted-foreground hover:text-secondary-foreground"
                        }`}
                        style={
                            payMethod === m
                                ? {
                                    background:
                                        "linear-gradient(135deg, var(--primary), var(--chart-5))",
                                    boxShadow:
                                        "0 4px 16px var(--primary-glow)",
                                }
                                : {}
                        }
                    >
                        {m === "card" ? (
                            <><CreditCard size={14} /> Credit / Debit Card</>
                        ) : (
                            <><Globe size={14} /> PayPal</>
                        )}
                    </button>
                ))}
            </div>

            {payMethod === "card" ? (
                <div className="space-y-3">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Card number
                        </label>

                        <div className="relative">
                            <CreditCard
                                size={14}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/25"
                            />

                            <input
                                type="text"
                                value={cardNum}
                                onChange={(e) =>
                                    onCardNumChange(formatCardNum(e.target.value))
                                }
                                placeholder="0000 0000 0000 0000"
                                maxLength={19}
                                required
                                className="w-full pl-10 pr-16 py-3.5 rounded-xl text-sm text-foreground placeholder:text-foreground/20 outline-none border border-border focus:border-primary/50 transition-colors tracking-widest"
                                style={{ background: "var(--surface-overlay)" }}
                            />

                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex gap-1">
                                {["VISA", "MC"].map((b) => (
                                    <span
                                        key={b}
                                        className="text-[9px] font-bold text-foreground/25 border border-foreground/10 px-1.5 py-0.5 rounded"
                                    >
                                        {b}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Name on card
                        </label>

                        <input
                            type="text"
                            value={cardName}
                            onChange={(e) => onCardNameChange(e.target.value)}
                            placeholder="As it appears on your card"
                            required
                            className="w-full px-4 py-3.5 rounded-xl text-sm text-foreground placeholder:text-foreground/20 outline-none border border-border focus:border-primary/50 transition-colors"
                            style={{ background: "var(--surface-overlay)" }}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                Expiry
                            </label>

                            <div className="relative">
                                <CalendarDays
                                    size={14}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/25"
                                />

                                <input
                                    type="text"
                                    value={cardExp}
                                    onChange={(e) =>
                                        onCardExpChange(formatExp(e.target.value))
                                    }
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    required
                                    className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-foreground placeholder:text-foreground/20 outline-none border border-border focus:border-primary/50 transition-colors"
                                    style={{ background: "var(--surface-overlay)" }}
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                                CVV{" "}
                                <Info size={10} className="text-foreground/20" />
                            </label>

                            <div className="relative">
                                <Lock
                                    size={14}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/25"
                                />

                                <input
                                    type="password"
                                    value={cardCvv}
                                    onChange={(e) =>
                                        onCardCvvChange(
                                            e.target.value
                                                .replace(/\D/g, "")
                                                .slice(0, 4)
                                        )
                                    }
                                    placeholder="•••"
                                    maxLength={4}
                                    required
                                    className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-foreground placeholder:text-foreground/20 outline-none border border-border focus:border-primary/50 transition-colors"
                                    style={{ background: "var(--surface-overlay)" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="py-12 rounded-2xl border border-border bg-muted flex flex-col items-center gap-3">
                    <Globe size={32} className="text-chart-4" />

                    <p className="text-secondary-foreground text-sm text-center">
                        You'll be redirected to PayPal to complete your payment securely.
                    </p>

                    <p className="text-xs text-muted-foreground">
                        No PayPal account? You can still pay with a card via PayPal.
                    </p>
                </div>
            )}

            <div className="flex items-center gap-2 p-3.5 rounded-xl border border-chart-2/15 bg-chart-2/10">
                <Lock size={13} className="text-chart-2 flex-shrink-0" />

                <p className="text-xs text-chart-2/80">
                    Your payment is encrypted and processed securely. Funds are
                    held in escrow until your session is complete.
                </p>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-bold text-primary-foreground flex items-center justify-center gap-2 transition-all"
                style={{
                    background:
                        "linear-gradient(135deg, var(--primary), var(--chart-5))",
                    boxShadow: "0 0 30px var(--primary-glow)",
                    opacity: loading ? 0.8 : 1,
                }}
            >
                {loading ? (
                    <>
                        <svg
                            className="animate-spin w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="3"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                        </svg>
                        Processing payment…
                    </>
                ) : (
                    <>
                        <Lock size={15} /> Confirm & Pay ${total.toLocaleString()}
                    </>
                )}
            </button>

            <p className="text-center text-[11px] text-foreground/20">
                By confirming you agree to our{" "}
                <button
                    type="button"
                    className="text-muted-foreground underline"
                >
                    Booking Terms
                </button>{" "}
                and{" "}
                <button
                    type="button"
                    className="text-muted-foreground underline"
                >
                    Cancellation Policy
                </button>
            </p>
        </form>
    );
}