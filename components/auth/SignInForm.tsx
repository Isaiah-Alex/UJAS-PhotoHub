"use client";

import { useSignIn } from "@clerk/nextjs";
import {
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Mail,
  EyeOff,
  Eye,
  Lock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authInputStyle, gradPrimary } from "./shared";

export default function SignInForm({ onComplete }: { onComplete: () => void }) {
  const router = useRouter();
  const { signIn, errors, fetchStatus } = useSignIn();
  const [showPass, setShowPass] = useState(false);
  const [Verifying, setVerifying] = useState(false);

  const finalize = async () => {
    await signIn!.finalize({
      navigate: ({ session, decorateUrl }) => {
        if (session?.currentTask) {
          console.log(session?.currentTask);
          return;
        }
        const url = decorateUrl("/dashboard");
        if (url.startsWith("http")) {
          window.location.href = url;
        } else {
          router.push(url);
        }
      },
    });
    onComplete();
  };

  const handleSubmit = async (formData: FormData) => {
    if (!signIn) return;
    const emailAddress = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await signIn.password({ emailAddress, password });
    console.log("sign In status: ", signIn.status);

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (signIn.status === "complete") {
      await finalize();
    } else if (
      signIn.status === "needs_second_factor" ||
      "needs_client_trust"
    ) {
      const emailCodeFactor = signIn.supportedSecondFactors.find(
        (factor) => factor.strategy === "email_code",
      );
      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
        setVerifying(true);
      }
    } else {
      console.error("Sign-in attempt not complete:", signIn);
    }
  };

  const handleVerify = async (formData: FormData) => {
    if (!signIn) return;
    const code = formData.get("code") as string;

    await signIn.mfa.verifyEmailCode({ code });

    if (signIn.status === "complete") {
      await finalize();
    }
  };

  // ── Client Trust OTP screen ──────────────────────────────────────────────
  if (Verifying) {
    return (
      <div className="space-y-5">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-1 border border-white/10"
          style={{ background: "rgba(15,15,15,0.8)" }}
        >
          <ShieldCheck size={22} className="text-primary" />
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-white mb-1">
            Verify your account
          </h2>
          <p className="text-white/40 text-sm leading-relaxed">
            We sent a verification code to your email. Enter it below to
            continue.
          </p>
        </div>

        <form action={handleVerify} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/40 uppercase tracking-wide">
              Verification code
            </label>
            <input
              id="code"
              name="code"
              type="text"
              inputMode="numeric"
              placeholder="Enter 6-digit code"
              className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all border"
              style={authInputStyle(false)}
            />
            {errors?.fields?.code && (
              <p className="text-red-400/80 text-xs flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
                {errors.fields.code.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={fetchStatus === "fetching"}
            className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all"
            style={{
              ...gradPrimary,
              boxShadow: "0 0 24px var(--primary-glow)",
              opacity: fetchStatus === "fetching" ? 0.8 : 1,
            }}
          >
            {fetchStatus === "fetching" ? (
              <span className="flex items-center justify-center gap-2">
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
                    stroke="white"
                    strokeWidth="3"
                  />
                  <path
                    className="opacity-75"
                    fill="white"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Verifying…
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1.5">
                Verify & sign in <ArrowRight size={14} />
              </span>
            )}
          </button>
        </form>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => signIn.mfa.sendEmailCode()}
            className="flex-1 py-3 rounded-xl text-xs font-semibold text-primary hover:text-accent border border-white/10 hover:border-white/20 bg-white/5 transition-all flex items-center justify-center gap-1.5"
          >
            <RefreshCw size={11} /> Resend code
          </button>
          <button
            type="button"
            onClick={() => setVerifying(false)}
            className="flex-1 py-3 rounded-xl text-xs font-semibold text-white/55 border border-white/10 hover:text-white hover:border-white/20 bg-white/5 transition-all"
          >
            Start over
          </button>
        </div>
      </div>
    );
  }

  // ── Password screen ──────────────────────────────────────────────────────
  return (
    <form action={handleSubmit} className="space-y-4">
      <div id="clerk-captcha" />

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-white/45 tracking-wide uppercase">
          Email address
        </label>
        <div className="relative">
          <Mail
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"
          />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all border"
            style={authInputStyle(false)}
          />
        </div>
        {errors?.fields?.identifier && (
          <p className="text-red-400/80 text-xs flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
            {errors.fields.identifier.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-white/45 tracking-wide uppercase">
            Password
          </label>
          <button
            type="button"
            className="text-xs text-primary hover:text-accent font-medium transition-colors"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <Lock
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"
          />
          <input
            id="password"
            name="password"
            type={showPass ? "text" : "password"}
            placeholder="••••••••"
            required
            className="w-full pl-10 pr-11 py-3.5 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all border"
            style={authInputStyle(false)}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
          >
            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        {errors?.fields?.password && (
          <p className="text-red-400/80 text-xs flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
            {errors.fields.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={fetchStatus === "fetching"}
        className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all"
        style={{
          ...gradPrimary,
          boxShadow: "0 0 24px var(--primary-glow)",
          opacity: fetchStatus === "fetching" ? 0.8 : 1,
        }}
      >
        {fetchStatus === "fetching" ? (
          <span className="flex items-center justify-center gap-2">
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
                stroke="white"
                strokeWidth="3"
              />
              <path
                className="opacity-75"
                fill="white"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Signing in…
          </span>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}
