"use client";

import {
  Bell,
  CalendarDays,
  DollarSign,
  Lock,
  PlusCircle,
  Settings,
  Users,
  Wallet,
  X,
} from "lucide-react";
import Image from "next/image";
import { photographers } from "@/lib/photohub-data";
import type { SettingsSection } from "@/hooks/useDashboard";
import { useUser } from "@clerk/nextjs";
import { useProfileImage } from "@/hooks/useProfileImage";

const me = photographers[0];

interface Props {
  settingsSection: SettingsSection;
  onSectionChange: (s: SettingsSection) => void;
}

const settingsNav: {
  id: SettingsSection;
  label: string;
  icon: React.ReactNode;
}[] = [
  { id: "profile", label: "Profile", icon: <Users size={14} /> },
  {
    id: "availability",
    label: "Availability",
    icon: <CalendarDays size={14} />,
  },
  { id: "pricing", label: "Pricing", icon: <DollarSign size={14} /> },
  { id: "notifications", label: "Notifications", icon: <Bell size={14} /> },
  { id: "security", label: "Security", icon: <Lock size={14} /> },
  { id: "payouts", label: "Payouts", icon: <Wallet size={14} /> },
];

export function SettingsTab({ settingsSection, onSectionChange }: Props) {
  const { user } = useUser();
  const {
    inputRef,
    imageUrl,
    hasImage,
    isLoaded,
    openFilePicker,
    handleImageChange,
    removeImage,
  } = useProfileImage();

  return (
    <div className="grid lg:grid-cols-[200px_1fr] gap-5">
      {/* Settings nav */}
      <div className="p-2 rounded-2xl border border-border bg-card h-fit space-y-1">
        {settingsNav.map((s) => (
          <button
            key={s.id}
            onClick={() => onSectionChange(s.id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${
              settingsSection === s.id
                ? "text-white bg-white/8"
                : "text-white/40 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className={settingsSection === s.id ? "text-primary" : ""}>
              {s.icon}
            </span>
            {s.label}
          </button>
        ))}
      </div>

      {/* Settings content */}
      <div className="p-6 rounded-2xl border border-border bg-card space-y-6">
        {settingsSection === "profile" ? (
          <>
            <h3 className="font-display font-bold text-white">
              Profile Settings
            </h3>

            {/* Avatar upload */}
            <div className="flex items-center gap-5 p-4 rounded-2xl bg-white/3 border border-border">
              <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-primary/30 flex-shrink-0">
                <Image
                  src={user?.imageUrl ?? "/avatar.svg"}
                  width={500}
                  height={500}
                  alt={`${user?.fullName} profile`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">
                  {user?.fullName?.toUpperCase()}
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  JPG, PNG up to 5MB
                </p>
                <div>
                  <input
                    type="file"
                    ref={inputRef}
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={openFilePicker}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--primary), var(--accent))",
                      }}
                    >
                      Change Photo
                    </button>
                    <button
                      onClick={removeImage}
                      disabled={!hasImage}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white/40 border border-border hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Fields */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Full Name", value: me.name, type: "text" },
                { label: "Username", value: "adaeze_okafor", type: "text" },
                { label: "Email", value: "adaeze@photo.ng", type: "email" },
                { label: "Phone", value: "+234 801 234 5678", type: "tel" },
                { label: "Location", value: me.location, type: "text" },
                { label: "Website", value: "adaezeokafor.ng", type: "url" },
              ].map(({ label, value, type }) => (
                <div key={label} className="space-y-1.5">
                  <label className="text-xs font-semibold text-white/35 uppercase tracking-wide">
                    {label}
                  </label>
                  <input
                    type={type}
                    defaultValue={value}
                    className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none border border-border focus:border-primary/50 transition-colors bg-input"
                  />
                </div>
              ))}
            </div>

            {/* Bio */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/35 uppercase tracking-wide">
                Bio
              </label>
              <textarea
                rows={3}
                defaultValue={me.bio}
                className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none border border-border focus:border-primary/50 transition-colors resize-none bg-input"
              />
            </div>

            {/* Specialties */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/35 uppercase tracking-wide">
                Specialties
              </label>
              <div className="flex flex-wrap gap-2">
                {me.specializations.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium text-white/60 border border-border bg-white/4 flex items-center gap-1.5"
                  >
                    {s}
                    <X
                      size={10}
                      className="text-white/30 cursor-pointer hover:text-white/60"
                    />
                  </span>
                ))}
                <button className="px-3 py-1.5 rounded-xl text-xs font-medium text-primary border border-primary/25 bg-primary/8 flex items-center gap-1">
                  <PlusCircle size={11} /> Add
                </button>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                className="px-6 py-3 rounded-xl text-sm font-bold text-white"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary), var(--accent))",
                  boxShadow: "0 0 20px var(--primary-glow)",
                }}
              >
                Save Changes
              </button>
              <button className="px-6 py-3 rounded-xl text-sm font-semibold text-white/50 border border-border hover:text-white hover:border-white/20 transition-all">
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/4 border border-border flex items-center justify-center">
              <Settings size={22} className="text-white/20" />
            </div>
            <p className="font-semibold text-white/50 capitalize">
              {settingsSection} Settings
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Configure your {settingsSection} preferences here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
