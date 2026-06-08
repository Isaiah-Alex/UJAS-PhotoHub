import type { BookingStatus, ActivityItem } from "@/lib/photohub-data";

export const statusStyle: Record<
    BookingStatus,
    { bg: string; text: string; dot: string }
> = {
    confirmed: { bg: "bg-chart-2/12", text: "text-chart-2",       dot: "bg-chart-2"       },
    pending:   { bg: "bg-chart-3/12", text: "text-chart-3",       dot: "bg-chart-3"       },
    completed: { bg: "bg-white/8",    text: "text-white/45",      dot: "bg-white/30"      },
    cancelled: { bg: "bg-destructive/15", text: "text-destructive", dot: "bg-destructive" },
};

export const activityColor: Record<ActivityItem["type"], string> = {
    sale:     "var(--primary)",
    booking:  "var(--chart-2)",
    review:   "var(--chart-3)",
    follow:   "var(--chart-4)",
    download: "#3B9EFF",
    payout:   "var(--chart-2)",
    view:     "var(--secondary-foreground)",
};

export const activityEmoji: Record<ActivityItem["type"], string> = {
    sale:     "🛒",
    booking:  "📅",
    review:   "⭐",
    follow:   "👤",
    download: "⬇️",
    payout:   "💰",
    view:     "👁️",
};