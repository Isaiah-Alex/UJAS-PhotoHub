"use client";

import { useState } from "react";
import { Bell, Menu, Search } from "lucide-react";
import { UImg } from "@/components/photohub/Helpers";
import { NotificationPanel } from "@/components/navbar/NotificationPanel";
import { photographers } from "@/lib/photohub-data";
import type { useNotifications } from "@/hooks/useNotifications";
import type { DashTab } from "@/hooks/useDashboard";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const me = photographers[0];

interface Props {
  tab: DashTab;
  notifications: ReturnType<typeof useNotifications>;
  onMenuClick: () => void;
}

export function DashboardTopBar({ tab, notifications, onMenuClick }: Props) {
  const [notifOpen, setNotifOpen] = useState(false);
  const { notifs, unreadCount, markAllRead, dismiss } = notifications;
  const { user, isLoaded } = useUser();

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b border-border"
      style={{ background: "rgba(5,5,5,0.9)", backdropFilter: "blur(20px)" }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/50"
        >
          <Menu size={16} />
        </button>
        <div>
          <h1 className="font-display font-bold text-white text-lg capitalize">
            {tab}
          </h1>
          <p className="text-xs text-muted-foreground">
            Welcome back, {isLoaded ? user?.firstName?.toUpperCase() : ""} 👋
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-border text-sm text-white/50 hover:text-white transition-all">
          <Search size={14} />
          <span className="hidden sm:block text-xs">Search…</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all relative ${
              notifOpen
                ? "bg-primary/15 border-primary/30 text-primary"
                : "bg-white/5 border-border text-white/50 hover:text-white"
            }`}
          >
            <Bell size={15} />
            {unreadCount > 0 && (
              <span
                className="absolute -top-1 -right-1 min-w-[16px] h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white px-1"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary), var(--accent))",
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <NotificationPanel
              notifs={notifs}
              unreadCount={unreadCount}
              onMarkAllRead={markAllRead}
              onDismiss={dismiss}
              onClose={() => setNotifOpen(false)}
            />
          )}
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl overflow-hidden border border-border cursor-pointer">
          <Image
            src={user?.imageUrl ?? "/avatar.svg"}
            width={500}
            height={500}
            alt={`${user?.firstName} profile`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
