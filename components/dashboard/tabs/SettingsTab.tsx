"use client";

import {
  Bell,
  CalendarDays,
  DollarSign,
  Lock,
  Settings,
  Users,
  Wallet,
} from "lucide-react";
import { photographers } from "@/lib/photohub-data";
import type { SettingsSection } from "@/hooks/useDashboard";
import { useProfileImage } from "@/hooks/useProfileImage";
import ProfileTab from "./settingsTabs/profileTab";

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
          <ProfileTab />
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
