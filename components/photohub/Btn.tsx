export const GradBtn = ({
  children, onClick, className = "",
}: { children: React.ReactNode; onClick?: () => void; className?: string }) => (
  <button
    onClick={onClick}
    className={`text-white font-semibold transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] ${className}`}
    style={{ background: "linear-gradient(135deg, var(--primary) 0%, var(--chart-5) 100%)", boxShadow: "0 0 24px var(--primary-glow)" }}
  >
    {children}
  </button>
);

export const GlassBtn = ({
  children, onClick, className = "",
}: { children: React.ReactNode; onClick?: () => void; className?: string }) => (
  <button
    onClick={onClick}
    className={`text-white font-semibold border border-white/15 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-sm ${className}`}
  >
    {children}
  </button>
);