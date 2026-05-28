"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Github,
  MapPin,
  Camera,
  Star,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { photographers } from "@/lib/photohub-data";
import {
  AuthImage,
  AuthLogo,
  GoogleIcon,
  AUTH_SIGNUP_BG,
  authInputStyle,
  gradPrimary,
  gradPrimaryShadow,
  gradSuccess,
} from "@/components/auth/shared";

const specialties = [
  "Portrait",
  "Wedding",
  "Street",
  "Nature",
  "Fashion",
  "Corporate",
  "Lifestyle",
  "Events",
];

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<"client" | "photographer">("client");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialty: "",
    location: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const testimonial = photographers[1];

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1400);
    setTimeout(() => {
      setDone(false);
      router.push("/");
    }, 2600);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col justify-between p-12">
        <AuthImage
          name={AUTH_SIGNUP_BG}
          alt="Photography"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.25) 40%, rgba(5,5,5,0.8) 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-2/3"
          style={{ background: "linear-gradient(to top, rgba(5,5,5,0.95), transparent)" }}
        />

        <div className="relative z-10">
          <AuthLogo />
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                    s <= step ? "text-white" : "text-white/30 border border-white/15"
                  }`}
                  style={s <= step ? gradPrimary : {}}
                >
                  {s < step ? <CheckCircle size={13} /> : s}
                </div>
                {s < 2 && (
                  <div
                    className={`w-12 h-0.5 rounded-full transition-all duration-500 ${
                      step > s ? "bg-primary" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
            <span className="text-xs text-white/35 ml-1">Step {step} of 2</span>
          </div>

          <div>
            <p className="font-display text-4xl font-bold text-white leading-tight mb-3">
              {step === 1 ? "Start your\ncreative" : "Tell us\nabout"}{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(135deg, var(--primary), var(--chart-5))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {step === 1 ? "journey." : "yourself."}
              </span>
            </p>
            <p className="text-white/40 text-sm max-w-sm leading-relaxed">
              {step === 1
                ? "Create your account and join thousands of photographers and clients building something beautiful."
                : "Help us personalize your experience so we can connect you with the right people."}
            </p>
          </div>

          <div
            className="p-4 rounded-2xl border border-white/10 max-w-xs"
            style={{ background: "var(--surface-overlay)", backdropFilter: "blur(20px)" }}
          >
            <div className="flex gap-0.5 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={11} className="fill-primary text-primary" />
              ))}
            </div>
            <p className="text-white/60 text-xs leading-relaxed mb-3">
              &quot;Signing up took two minutes. Within a week I had my first booking.&quot;
            </p>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full overflow-hidden">
                <AuthImage
                  name={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">{testimonial.name}</p>
                <p className="text-[10px] text-white/35">
                  {testimonial.specialty} · {testimonial.city}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24 bg-background relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[160px] opacity-[0.06] pointer-events-none"
          style={{ background: "var(--primary)" }}
        />

        <div className="relative z-10 max-w-md w-full mx-auto">
          <div className="lg:hidden mb-10">
            <AuthLogo size="sm" />
          </div>

          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
              {step === 1 ? "Create account" : "Your profile"}
            </h1>
            <p className="text-white/45 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:text-accent font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          <div
            className="flex p-1 rounded-2xl mb-7 border border-white/8"
            style={{ background: "rgba(15,15,15,0.8)" }}
          >
            {(["client", "photographer"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all duration-300 ${
                  role === r ? "text-white" : "text-white/35 hover:text-white/60"
                }`}
                style={role === r ? gradPrimaryShadow : {}}
              >
                {r === "client" ? "I'm a Client" : "I'm a Photographer"}
              </button>
            ))}
          </div>

          <form onSubmit={handleNext} className="space-y-4">
            {step === 1 ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 text-sm text-white/65 hover:text-white transition-all"
                  >
                    <GoogleIcon />
                    Google
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 text-sm text-white/65 hover:text-white transition-all"
                  >
                    <Github size={14} /> GitHub
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-white/8" />
                  <span className="text-xs text-white/25">or with email</span>
                  <div className="flex-1 h-px bg-white/8" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white/40 uppercase tracking-wide">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your full name"
                    required
                    className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all border"
                    style={authInputStyle(!!form.name)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white/40 uppercase tracking-wide">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all border"
                      style={authInputStyle(!!form.email)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white/40 uppercase tracking-wide">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                    <input
                      type={showPass ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => update("password", e.target.value)}
                      placeholder="Min. 8 characters"
                      required
                      minLength={8}
                      className="w-full pl-10 pr-11 py-3.5 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all border"
                      style={authInputStyle(!!form.password)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                    >
                      {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  {form.password.length > 0 && (
                    <div className="flex gap-1 pt-1">
                      {[3, 6, 9].map((threshold, i) => (
                        <div
                          key={i}
                          className="flex-1 h-1 rounded-full transition-all duration-300"
                          style={{
                            background:
                              form.password.length >= threshold
                                ? i === 0
                                  ? "var(--chart-5)"
                                  : i === 1
                                    ? "var(--chart-3)"
                                    : "var(--chart-2)"
                                : "rgba(255,255,255,0.08)",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {role === "photographer" && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-white/40 uppercase tracking-wide">
                      Your specialty
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {specialties.map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => update("specialty", s)}
                          className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                            form.specialty === s
                              ? "text-white"
                              : "bg-white/5 border border-white/8 text-white/45 hover:text-white hover:border-white/20"
                          }`}
                          style={form.specialty === s ? gradPrimary : {}}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white/40 uppercase tracking-wide">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => update("location", e.target.value)}
                      placeholder="City, Country"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all border"
                      style={authInputStyle(!!form.location)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white/40 uppercase tracking-wide">
                    Profile photo
                  </label>
                  <div className="w-full py-8 rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center gap-2 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all">
                    <Camera size={22} className="text-white/25" />
                    <p className="text-sm text-white/35">Click to upload or drag & drop</p>
                    <p className="text-xs text-white/20">PNG, JPG up to 10MB</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <div
                    className="w-4 h-4 mt-0.5 rounded-md border border-primary flex items-center justify-center flex-shrink-0"
                    style={gradPrimary}
                  >
                    <CheckCircle size={10} className="text-white" />
                  </div>
                  <p className="text-xs text-white/35 leading-relaxed">
                    I agree to the{" "}
                    <button
                      type="button"
                      className="text-white/55 underline hover:text-white transition-colors"
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="text-white/55 underline hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </button>
                  </p>
                </div>
              </>
            )}

            <div className="flex gap-3 pt-1">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-white/55 border border-white/10 hover:text-white hover:border-white/20 bg-white/5 transition-all"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={loading || done}
                className="flex-1 py-3.5 rounded-xl text-sm font-bold text-white transition-all relative"
                style={
                  done
                    ? gradSuccess
                    : {
                        ...gradPrimary,
                        boxShadow: "0 0 24px var(--primary-glow)",
                        opacity: loading ? 0.8 : 1,
                      }
                }
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="3" />
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Creating account…
                  </span>
                ) : done ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle size={15} /> Welcome aboard!
                  </span>
                ) : step === 1 ? (
                  <span className="flex items-center justify-center gap-1.5">
                    Continue <ArrowRight size={14} />
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
