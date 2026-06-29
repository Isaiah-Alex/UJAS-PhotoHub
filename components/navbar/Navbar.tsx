"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Aperture, Search, Bell, Menu, X } from "lucide-react";
import { GradBtn, GlassBtn } from "@/components/photohub/Btn";
import { NotificationPanel } from "./NotificationPanel";
import { SearchOverlay } from "./SearchOverlay";
import type { useNotifications } from "@/hooks/useNotifications";
import { useAuth } from "@clerk/nextjs";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Props {
  scrolled: boolean;
  notifications: ReturnType<typeof useNotifications>;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Navbar({ scrolled, notifications }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const { notifs, unreadCount, markAllRead, dismiss } = notifications;
  const { isSignedIn, signOut } = useAuth();

  // Cmd/Ctrl+K → open search; Escape → close everything
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
        setNotifOpen(false);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setNotifOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Close panels on route change
  useEffect(() => {
    setOpen(false);
    setNotifOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: "Marketplace", href: "/marketplace" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  function handleLogout() {
    if (open) {
      signOut({ redirectUrl: "/login" });
    } else {
      signOut({ redirectUrl: "/login" });
      setOpen(false);
    }
  }

  return (
    <>
      {/* Search overlay — rendered at root so it sits above everything */}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div
            className={`flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-500 ${
              scrolled
                ? "bg-black/75 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
                : "bg-black/20 backdrop-blur-md border border-white/5"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #FF6B00, #FF2200)",
                }}
              >
                <Aperture size={15} className="text-white" />
              </div>
              <span className="font-display font-bold text-white text-[17px] tracking-tight">
                UJAS <span className="text-[#FF6B00]">PhotoHub</span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-white bg-white/10"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => {
                  setSearchOpen(true);
                  setNotifOpen(false);
                }}
                className="group flex items-center gap-2 pl-3 pr-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all"
              >
                <Search
                  size={14}
                  className="text-white/40 group-hover:text-white/70 transition-colors"
                />
                <span className="text-xs text-white/30 group-hover:text-white/50 transition-colors hidden lg:block">
                  Search
                </span>
                <kbd className="hidden lg:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-white/20">
                  ⌘K
                </kbd>
              </button>

              {/* Notifications */}
              {isSignedIn && (
                <div className="relative">
                  <button
                    onClick={() => {
                      setNotifOpen((v) => !v);
                      setSearchOpen(false);
                    }}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all border relative ${
                      notifOpen
                        ? "bg-[#FF6B00]/15 border-[#FF6B00]/30 text-[#FF6B00]"
                        : "bg-white/5 hover:bg-white/10 border-white/5 text-white/50 hover:text-white"
                    }`}
                  >
                    <Bell size={15} />
                    {unreadCount > 0 && (
                      <span
                        className="absolute -top-1 -right-1 min-w-[16px] h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white px-1"
                        style={{
                          background:
                            "linear-gradient(135deg, #FF6B00, #FF2200)",
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
              )}

              {!isSignedIn && (
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white/60 hover:text-white transition-all"
                >
                  Login
                </Link>
              )}
              {isSignedIn && (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white/60 hover:text-white transition-all border-none"
                >
                  logout
                </button>
              )}

              {!isSignedIn && (
                <Link href="/signup">
                  <GradBtn className="px-4 py-2 rounded-xl text-sm">
                    Get Started
                  </GradBtn>
                </Link>
              )}

              {isSignedIn && (
                <Link href="/dashboard">
                  <GradBtn className="px-4 py-2 rounded-xl text-sm">
                    Dashboard
                  </GradBtn>
                </Link>
              )}
            </div>

            {/* Mobile actions */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => {
                  setSearchOpen(true);
                  setNotifOpen(false);
                }}
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50"
              >
                <Search size={15} />
              </button>
              <button
                onClick={() => {
                  setNotifOpen((v) => !v);
                  setSearchOpen(false);
                  setOpen(false);
                }}
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 relative"
              >
                <Bell size={15} />
                {unreadCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 min-w-[14px] h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold text-white px-1"
                    style={{ background: "#FF6B00" }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
                onClick={() => {
                  setOpen(!open);
                  setNotifOpen(false);
                }}
              >
                {open ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>

          {/* Mobile notification panel */}
          {notifOpen && (
            <div className="md:hidden mt-2 relative">
              <NotificationPanel
                notifs={notifs}
                unreadCount={unreadCount}
                onMarkAllRead={markAllRead}
                onDismiss={dismiss}
                onClose={() => setNotifOpen(false)}
              />
            </div>
          )}

          {/* Mobile menu */}
          {open && (
            <div className="md:hidden mt-2 p-4 rounded-2xl bg-black/90 backdrop-blur-2xl border border-white/10 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                {!isSignedIn && (
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <GlassBtn className="w-full py-2.5 rounded-xl text-sm">
                      Login
                    </GlassBtn>
                  </Link>
                )}
                {isSignedIn && (
                  <GlassBtn
                    onClick={handleLogout}
                    className="w-full py-2.5 rounded-xl text-sm"
                  >
                    logout
                  </GlassBtn>
                )}
                {!isSignedIn && (
                  <Link href="/signup" onClick={() => setOpen(false)}>
                    <GradBtn className="w-full py-2.5 rounded-xl text-sm">
                      Get Started
                    </GradBtn>
                  </Link>
                )}
                {isSignedIn && (
                  <Link href="/dashboard" onClick={() => setOpen(false)}>
                    <GradBtn className="w-full py-2.5 rounded-xl text-sm">
                      Dashboard
                    </GradBtn>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
