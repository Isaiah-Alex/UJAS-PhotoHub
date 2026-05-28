import { formatMoneyCompact } from "@/lib/site-config";
import { SITE_STATS } from "@/lib/site-config";
import { Camera, Banknote, Users, Award } from "lucide-react";

export default function StatsBand() {
  return (
    <div className="py-14 px-4 border-y border-white/5" style={{ background: "rgba(12,12,12,0.8)" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { Icon: Camera, value: "12,400+", label: "Active Photographers", color: "var(--primary)" },
          { Icon: Banknote, value: formatMoneyCompact(SITE_STATS.platformEarnings), label: "Photographer Earnings", color: "var(--chart-2)" },
          { Icon: Users, value: "840K+", label: "Photos Sold", color: "var(--chart-4)" },
          { Icon: Award, value: "98.2%", label: "Client Satisfaction", color: "var(--chart-3)" },
        ].map(({ Icon, value, label, color }) => (
          <div key={label} className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
              <Icon size={20} style={{ color }} />
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-white">{value}</p>
              <p className="text-xs text-white/35 mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}