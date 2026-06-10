"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Github, TrendingUp, CheckCircle } from "lucide-react";
import { photographers } from "@/lib/photohub-data";
import { formatMoney, formatMoneyCompact, SITE_STATS } from "@/lib/site-config";
import {
  AuthImage,
  AuthLogo,
  GoogleIcon,
  AUTH_LOGIN_BG,
  gradPrimary,
  gradPrimaryShadow,
  gradSuccess,
} from "@/components/auth/shared";
import SignInForm from "@/components/auth/SignInForm";

// ─── Main LoginPage ───────────────────────────────────────────────────────────
export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"client" | "photographer">("client");
  const [remember, setRemember] = useState(false);

  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    setBgIndex(Math.floor(Math.random() * AUTH_LOGIN_BG.length));
  }, []);

  const [done, setDone] = useState(false);

  const featured = photographers[3];

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel ────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col justify-between p-12">
        <AuthImage
          name={AUTH_LOGIN_BG[bgIndex]}
          alt="Photography"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.25) 40%, rgba(5,5,5,0.75) 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-2/3"
          style={{
            background: "linear-gradient(to top, rgba(5,5,5,0.9), transparent)",
          }}
        />
        <div
          className="absolute left-1/4 top-1/4 w-72 h-72 rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{ background: "var(--primary)" }}
        />

        <div className="relative z-10">
          <AuthLogo />
        </div>

        <div className="relative z-10 space-y-8">
          <div
            className="inline-flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/10"
            style={{
              background: "var(--surface-overlay)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-white/15">
              <AuthImage
                name={featured.avatar}
                alt={featured.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                {featured.name}
              </p>
              <p className="text-xs text-white/45">
                Earned {formatMoney(3_400_000)} last month
              </p>
            </div>
            <div className="ml-2 flex items-center gap-1 text-chart-2">
              <TrendingUp size={13} />
              <span className="text-xs font-bold">+24%</span>
            </div>
          </div>

          <div>
            <p className="font-display text-4xl font-bold text-white leading-tight mb-3">
              Where visual
              <br />
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, var(--primary), var(--chart-5))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                stories live.
              </span>
            </p>
            <p className="text-white/45 text-sm max-w-sm leading-relaxed">
              Join 12,400+ photographers building careers, finding clients, and
              sharing work that moves the world.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            {[
              { value: "840K+", label: "Photos sold" },
              {
                value: formatMoneyCompact(SITE_STATS.platformEarnings),
                label: "Paid out",
              },
              { value: "98%", label: "Satisfaction" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="px-4 py-2.5 rounded-xl border border-white/10"
                style={{
                  background: "rgba(10,10,10,0.6)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <p className="font-display text-lg font-bold text-white">
                  {value}
                </p>
                <p className="text-[10px] text-white/40 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel ───────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24 bg-background relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[160px] opacity-[0.06] pointer-events-none"
          style={{ background: "var(--primary)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-[120px] opacity-[0.04] pointer-events-none"
          style={{ background: "var(--chart-5)" }}
        />

        <div className="relative z-10 max-w-md w-full mx-auto">
          <div className="lg:hidden mb-10">
            <AuthLogo size="sm" />
          </div>

          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
              Welcome back
            </h1>
            <p className="text-white/45 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-primary hover:text-accent font-semibold transition-colors"
              >
                Sign up free
              </Link>
            </p>
          </div>

          <div
            className="flex p-1 rounded-2xl mb-8 border border-white/8"
            style={{ background: "rgba(15,15,15,0.8)" }}
          >
            {(["client", "photographer"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all duration-300 ${
                  role === r
                    ? "text-white shadow-lg"
                    : "text-white/35 hover:text-white/60"
                }`}
                style={role === r ? gradPrimaryShadow : {}}
              >
                {r === "client" ? "I'm a Client" : "I'm a Photographer"}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 mb-6 md:grid-cols-2">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 text-sm text-white/70 hover:text-white transition-all"
            >
              <GoogleIcon />
              Continue with Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 text-sm text-white/70 hover:text-white transition-all"
            >
              <Github size={15} />
              Continue with GitHub
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs text-white/25 font-medium">
              or sign in with email
            </span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {done ? (
            <div
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white"
              style={gradSuccess}
            >
              <CheckCircle size={15} /> Signed in!
            </div>
          ) : (
            <>
              <SignInForm onComplete={() => setDone(true)} />

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setRemember(!remember)}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all flex-shrink-0 ${
                    remember ? "border-primary" : "border-white/15 bg-white/5"
                  }`}
                  style={remember ? gradPrimary : {}}
                >
                  {remember && <CheckCircle size={11} className="text-white" />}
                </button>
                <span className="text-sm text-white/45">Keep me signed in</span>
              </div>
            </>
          )}

          <p className="text-center text-sm text-white/30 mt-8">
            New to UJAS PhotoHub?{" "}
            <Link
              href="/signup"
              className="text-primary hover:text-accent font-semibold transition-colors"
            >
              Create an account
            </Link>
          </p>

          <p className="text-center text-[11px] text-white/18 mt-4 leading-relaxed">
            By signing in you agree to our{" "}
            <button
              type="button"
              className="text-white/35 hover:text-white/60 underline transition-colors"
            >
              Terms of Service
            </button>{" "}
            and{" "}
            <button
              type="button"
              className="text-white/35 hover:text-white/60 underline transition-colors"
            >
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
