"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Aperture,
  LayoutDashboard,
  BookOpen,
  Camera,
  Package,
  BarChart3,
  Settings,
  Eye,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { photographers } from "@/lib/photohub-data";
import type { DashTab } from "@/hooks/useDashboard";
import { useUser, useAuth } from "@clerk/nextjs";

interface Props {
  tab: DashTab;
  onTabChange: (t: DashTab) => void;
  sidebarOpen: boolean;
  pendingCount: number;
}

const me = photographers[0];

export function DashboardSidebar({
  tab,
  onTabChange,
  sidebarOpen,
  pendingCount,
}: Props) {
  //clerk states
  const { signOut } = useAuth();
  const { user } = useUser();

  const navItems: {
    id: DashTab;
    label: string;
    icon: React.ReactNode;
    badge?: number;
  }[] = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={17} /> },
    {
      id: "bookings",
      label: "Bookings",
      icon: <BookOpen size={17} />,
      badge: pendingCount,
    },
    { id: "portfolio", label: "Portfolio", icon: <Camera size={17} /> },
    { id: "marketplace", label: "Marketplace", icon: <Package size={17} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 size={17} /> },
    { id: "settings", label: "Settings", icon: <Settings size={17} /> },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-40 flex flex-col border-r border-border transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-[72px]"
      } lg:w-64`}
      style={{ background: "rgba(8,8,8,0.97)", backdropFilter: "blur(20px)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background:
              "linear-gradient(135deg, var(--primary), var(--accent))",
          }}
        >
          <Aperture size={16} className="text-white" />
        </div>
        <span className="font-display font-bold text-white text-base tracking-tight whitespace-nowrap hidden lg:block">
          UJAS <span className="text-primary">PhotoHub</span>
        </span>
      </div>

      {/* Profile summary */}
      <div className="px-3 py-4 border-b border-border hidden lg:block">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/4">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-border">
            <Image
              src={`${user?.imageUrl}`}
              alt={`${user?.firstName} profile photo`}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-white text-sm truncate">
              {user?.firstName?.toUpperCase() +
                " " +
                user?.lastName?.toUpperCase()}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-chart-2" />
              <span className="text-[11px] text-chart-2 font-medium">
                Available
              </span>
            </div>
          </div>
          <button className="ml-auto flex-shrink-0 text-white/25 hover:text-white transition-colors">
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = tab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${
                isActive
                  ? "text-white"
                  : "text-white/40 hover:text-white/75 hover:bg-white/5 hover:outline outline-white/0 outline-white/20 transition-all duration-300 ease-in-out"
              }`}
              style={
                isActive
                  ? {
                      background:
                        "linear-gradient(135deg, rgba(255,107,0,0.18), rgba(255,34,0,0.08))",
                      border: "1px solid rgba(255,107,0,0.2)",
                    }
                  : {}
              }
            >
              <span className={isActive ? "text-primary" : ""}>
                {item.icon}
              </span>
              <span className="font-medium text-sm whitespace-nowrap hidden lg:block">
                {item.label}
              </span>
              {item.badge ? (
                <span
                  className="ml-auto text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full hidden lg:flex"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--primary), var(--accent))",
                  }}
                >
                  {item.badge}
                </span>
              ) : null}
              {isActive && <span />}
            </button>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 pb-5 space-y-1 border-t border-border pt-3">
        <Link
          href="/explore"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-white/75 hover:bg-white/5 transition-all"
        >
          <Eye size={17} />
          <span className="text-sm font-medium whitespace-nowrap hidden lg:block">
            View Public Profile
          </span>
        </Link>
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-destructive hover:bg-destructive/10 transition-all border-none"
          onClick={() =>
            signOut({
              redirectUrl: "/",
            })
          }
        >
          <LogOut size={17} />
          <span className="text-sm font-medium whitespace-nowrap hidden lg:block">
            Sign Out
          </span>
        </button>
      </div>
    </aside>
  );
}
