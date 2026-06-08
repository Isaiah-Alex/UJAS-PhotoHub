"use client"

import { useSignUp } from "@clerk/nextjs";
import { ArrowRight, RefreshCw, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { authInputStyle, gradPrimary } from "./shared";


export function OtpStep({
  email,
  onVerified,
  onBack,
}: {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}) {
  const { signUp } = useSignUp();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendCountdown, setResendCountdown] = useState(60);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setResendCountdown((c) => {
        if (c <= 1) { clearInterval(interval); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    setError("");
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = [...otp];
    pasted.split("").forEach((char, i) => { next[i] = char; });
    setOtp(next);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUp) return;
    const code = otp.join("") as string;
    if (code.length < 6) {
      setError("Please enter the full 6-digit code."); return;
      
    }
    
    setLoading(true);
    
    try {
      await signUp.verifications.verifyEmailCode({ code, });
      if (signUp.status === "complete") {
        await signUp.finalize();
        onVerified();
      } else {
        setError("Verification incomplete. Please Try Again.")
      }

    } catch (err: any) {
      setError(err?.errors?.[0]?.message ?? "Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleResend = async () => {
    if (resendCountdown > 0) return;
    setResending(true);
    try {
      await signUp.verifications.sendEmailCode();
      setResendCountdown(60);
      setOtp(["", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      setError(err?.errors?.[0]?.message ?? "Could not resend. Try again.");
    } finally {
      setResending(false);
    };
  }

    const filled = otp.join("").length;

    return (
      <form onSubmit={handleVerify} className="space-y-5">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-1 border border-white/10"
          style={{ background: "rgba(15,15,15,0.8)" }}
        >
          <ShieldCheck size={22} className="text-primary" />
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-white mb-1">
            Verify your email
          </h2>
          <p className="text-white/40 text-sm leading-relaxed">
            We sent a 6-digit code to{" "}
            <span className="text-white/70 font-medium">{email}</span>.
            Enter it below to continue.
          </p>
        </div>

        <div className="flex gap-2.5 pt-1 w-auto overflow-hidden" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="flex-1 h-12 w-[10%] text-center text-xl font-bold text-white rounded border outline-none transition-all"
              style={authInputStyle(!!digit)}
            />
          ))}
        </div>

        {error && (
          <p className="text-red-400/80 text-xs flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
            {error}
          </p>
        )}

        <div className="text-center">
          {resendCountdown > 0 ? (
            <p className="text-xs text-white/25">
              Resend code in{" "}
              <span className="text-white/45 tabular-nums font-medium">
                0:{String(resendCountdown).padStart(2, "0")}
              </span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="text-xs text-primary hover:text-accent flex items-center gap-1.5 mx-auto transition-colors font-semibold"
            >
              <RefreshCw size={11} className={resending ? "animate-spin" : ""} />
              {resending ? "Sending…" : "Resend code"}
            </button>
          )}
        </div>

        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-white/55 border border-white/10 hover:text-white hover:border-white/20 bg-white/5 transition-all"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading || filled < 6}
            className="flex-1 py-3.5 rounded-xl text-sm font-bold text-white transition-all relative"
            style={{
              ...gradPrimary,
              boxShadow: filled === 6 ? "0 0 24px var(--primary-glow)" : "none",
              opacity: filled < 6 ? 0.45 : 1,
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="3" />
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Verifying…
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1.5">
                Verify & continue <ArrowRight size={14} />
              </span>
            )}
          </button>
        </div>
      </form>
    );
  }