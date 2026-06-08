"use client";

import { useState } from "react";
import { dashBookings } from "@/lib/photohub-data";

export type DashTab = "overview" | "bookings" | "portfolio" | "marketplace" | "analytics" | "settings";
export type BookingFilter = "all" | "confirmed" | "pending" | "completed";
export type SettingsSection = "profile" | "availability" | "pricing" | "notifications" | "security" | "payouts";

export function useDashboard() {
    const [tab,             setTab]             = useState<DashTab>("overview");
    const [sidebarOpen,     setSidebarOpen]     = useState(false);
    const [bookingFilter,   setBookingFilter]   = useState<BookingFilter>("all");
    const [uploadDragging,  setUploadDragging]  = useState(false);
    const [settingsSection, setSettingsSection] = useState<SettingsSection>("profile");
    const [revenueView,     setRevenueView]     = useState<"revenue" | "bookings">("revenue");

    const confirmedCount = dashBookings.filter((b) => b.status === "confirmed").length;
    const pendingCount   = dashBookings.filter((b) => b.status === "pending").length;
    const completedCount = dashBookings.filter((b) => b.status === "completed").length;
    const totalEarnings  = dashBookings
        .filter((b) => b.status === "completed")
        .reduce((s, b) => s + b.price, 0);

    const visibleBookings =
        bookingFilter === "all"
            ? dashBookings
            : dashBookings.filter((b) => b.status === bookingFilter);

    return {
        tab, setTab,
        sidebarOpen, setSidebarOpen,
        bookingFilter, setBookingFilter,
        uploadDragging, setUploadDragging,
        settingsSection, setSettingsSection,
        revenueView, setRevenueView,
        // derived
        confirmedCount, pendingCount, completedCount,
        totalEarnings, visibleBookings,
    };
}