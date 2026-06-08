"use client";

import { useNotifications } from "@/hooks/useNotifications";
import { useDashboard } from "@/hooks/useDashboard";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { OverviewTab } from "@/components/dashboard/tabs/OverviewTab";
import { BookingsTab } from "@/components/dashboard/tabs/BookingsTab";
import { PortfolioTab } from "@/components/dashboard/tabs/PortfolioTab";
import { MarketplaceTab } from "@/components/dashboard/tabs/MarketplaceTab";
import { AnalyticsTab } from "@/components/dashboard/tabs/AnalyticsTab";
import { SettingsTab } from "@/components/dashboard/tabs/SettingsTab";

export default function DashboardPage() {
  const notifications = useNotifications();
  const dash = useDashboard();

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar
        tab={dash.tab}
        onTabChange={dash.setTab}
        sidebarOpen={dash.sidebarOpen}
        pendingCount={dash.pendingCount}
      />

      <div className="flex-1 lg:ml-64 min-h-screen max-[1023px]:ml-[72px]">
        <DashboardTopBar
          tab={dash.tab}
          onTabChange={dash.setTab}
          notifications={notifications}
          onMenuClick={() => dash.setSidebarOpen((v) => !v)}
        />

        <main className="p-6 space-y-6 max-w-[1200px]">
          {dash.tab === "overview" && (
            <OverviewTab
              confirmedCount={dash.confirmedCount}
              pendingCount={dash.pendingCount}
              revenueView={dash.revenueView}
              onRevenueViewChange={dash.setRevenueView}
              onTabChange={dash.setTab}
            />
          )}

          {dash.tab === "bookings" && (
            <BookingsTab
              bookingFilter={dash.bookingFilter}
              onFilterChange={dash.setBookingFilter}
              confirmedCount={dash.confirmedCount}
              pendingCount={dash.pendingCount}
              completedCount={dash.completedCount}
              visibleBookings={dash.visibleBookings}
            />
          )}

          {dash.tab === "portfolio" && (
            <PortfolioTab
              uploadDragging={dash.uploadDragging}
              onDragOver={() => dash.setUploadDragging(true)}
              onDragLeave={() => dash.setUploadDragging(false)}
              onDrop={() => dash.setUploadDragging(false)}
            />
          )}

          {dash.tab === "marketplace" && <MarketplaceTab />}

          {dash.tab === "analytics" && <AnalyticsTab />}

          {dash.tab === "settings" && (
            <SettingsTab
              settingsSection={dash.settingsSection}
              onSectionChange={dash.setSettingsSection}
            />
          )}
        </main>
      </div>
    </div>
  );
}
