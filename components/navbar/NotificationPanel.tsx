"use client";

import { Bell, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { UImg } from "@/components/photohub/Helpers";
import type { Notification, NotificationType } from "@/lib/photohub-data";

// ── Icon map ────────────────────────────────────────────────────────────────

const notifIcon: Record<NotificationType, { icon: React.ReactNode; bg: string }> = {
    booking:     { icon: <span className="text-[9px]">📅</span>, bg: "#FF6B00" },
    message:     { icon: <span className="text-[9px]">💬</span>, bg: "#3B82F6" },
    review:      { icon: <span className="text-[9px]">⭐</span>, bg: "#F59E0B" },
    follow:      { icon: <span className="text-[9px]">👤</span>, bg: "#8B5CF6" },
    marketplace: { icon: <span className="text-[9px]">🛒</span>, bg: "#10B981" },
};

// ── Props ────────────────────────────────────────────────────────────────────

interface Props {
    notifs: Notification[];
    unreadCount: number;
    onMarkAllRead: () => void;
    onDismiss: (id: number) => void;
    onClose: () => void;
}

// ── Component ────────────────────────────────────────────────────────────────

export function NotificationPanel({
                                      notifs,
                                      unreadCount,
                                      onMarkAllRead,
                                      onDismiss,
                                      onClose,
                                  }: Props) {
    const router = useRouter();
    const [filter, setFilter] = useState<"all" | "unread">("all");

    const visible = filter === "unread" ? notifs.filter((n) => n.unread) : notifs;

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-[80]" onClick={onClose} />

            {/* Panel */}
            <div
                className="absolute right-0 top-full mt-3 w-[380px] rounded-2xl border border-white/10 overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.7)] z-[90]"
                style={{ background: "rgba(10,10,10,0.96)", backdropFilter: "blur(24px)" }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                    <div className="flex items-center gap-2.5">
                        <h3 className="font-display font-bold text-white text-base">Notifications</h3>
                        {unreadCount > 0 && (
                            <span
                                className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                                style={{ background: "linear-gradient(135deg, #FF6B00, #FF2200)" }}
                            >
                {unreadCount}
              </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {unreadCount > 0 && (
                            <button
                                onClick={onMarkAllRead}
                                className="text-xs text-[#FF6B00] hover:text-[#FF8C00] font-medium transition-colors"
                            >
                                Mark all read
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/12 flex items-center justify-center text-white/40 hover:text-white transition-all"
                        >
                            <X size={12} />
                        </button>
                    </div>
                </div>

                {/* Filter tabs */}
                <div className="flex gap-1 px-5 py-3 border-b border-white/5">
                    {(["all", "unread"] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                                filter === f ? "text-white" : "text-white/35 hover:text-white/60"
                            }`}
                            style={
                                filter === f
                                    ? { background: "linear-gradient(135deg, #FF6B00, #FF2200)" }
                                    : {}
                            }
                        >
                            {f === "all" ? `All (${notifs.length})` : `Unread (${unreadCount})`}
                        </button>
                    ))}
                </div>

                {/* List */}
                <div className="max-h-[420px] overflow-y-auto">
                    {visible.length === 0 ? (
                        <div className="py-12 text-center space-y-2">
                            <Bell size={28} className="text-white/15 mx-auto" />
                            <p className="text-sm text-white/35 font-medium">You're all caught up!</p>
                            <p className="text-xs text-white/20">
                                No {filter === "unread" ? "unread " : ""}notifications
                            </p>
                        </div>
                    ) : (
                        visible.map((n) => {
                            const meta = notifIcon[n.type];
                            return (
                                <div
                                    key={n.id}
                                    className={`group flex gap-3 px-5 py-4 border-b border-white/4 transition-all cursor-pointer hover:bg-white/4 ${
                                        n.unread ? "bg-[#FF6B00]/3" : ""
                                    }`}
                                    onClick={() => { onDismiss(n.id); onClose(); }}
                                >
                                    {/* Avatar + badge */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                                            <UImg name={n.avatar} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div
                                            className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0a0a0a]"
                                            style={{ background: meta.bg }}
                                        >
                                            {meta.icon}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-0.5">
                                            <p className={`text-sm font-semibold leading-tight ${n.unread ? "text-white" : "text-white/70"}`}>
                                                {n.title}
                                            </p>
                                            {n.unread && (
                                                <span
                                                    className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                                                    style={{ background: "#FF6B00" }}
                                                />
                                            )}
                                        </div>
                                        <p className="text-xs text-white/40 leading-relaxed line-clamp-2 mb-1.5">
                                            {n.body}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] text-white/25">{n.time}</span>
                                            <span className="text-[10px] text-[#FF6B00] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        {n.action} →
                      </span>
                                        </div>
                                    </div>

                                    {/* Dismiss */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onDismiss(n.id); }}
                                        className="flex-shrink-0 w-5 h-5 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/20 hover:text-white/60 transition-all opacity-0 group-hover:opacity-100 mt-0.5"
                                    >
                                        <X size={9} />
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer */}
                <div className="px-5 py-3 border-t border-white/8">
                    <button
                        onClick={() => { router.push("/notifications"); onClose(); }}
                        className="w-full py-2.5 rounded-xl text-sm font-semibold text-white/50 hover:text-white border border-white/8 hover:border-white/20 bg-white/3 hover:bg-white/8 transition-all"
                    >
                        View all notifications
                    </button>
                </div>
            </div>
        </>
    );
}

// needed because filter state is local to this component
import { useState } from "react";