"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Camera, ShoppingBag, TrendingUp } from "lucide-react";
import { UImg } from "@/components/photohub/helpers";
import { photographers, marketplaceItems } from "@/lib/photohub-data";

const QUICK_LINKS = [
    { label: "Portrait photographers",  href: "/explore?category=Portrait"    },
    { label: "Wedding photographers",   href: "/explore?category=Wedding"     },
    { label: "Browse marketplace",      href: "/marketplace"                  },
    { label: "Fashion editorials",      href: "/explore?category=Fashion"     },
];

interface Props {
    onClose: () => void;
}

export function SearchOverlay({ onClose }: Props) {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState("");

    // Auto-focus on mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Escape to close
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    const q = query.trim().toLowerCase();

    const matchedPhotographers = q
        ? photographers.filter((p) =>
            [p.name, p.specialty, p.city, ...p.specializations]
                .join(" ")
                .toLowerCase()
                .includes(q),
        ).slice(0, 4)
        : [];

    const matchedItems = q
        ? marketplaceItems.filter((m) =>
            [m.title, m.seller, m.category].join(" ").toLowerCase().includes(q),
        ).slice(0, 3)
        : [];

    const hasResults = matchedPhotographers.length > 0 || matchedItems.length > 0;

    const navigate = (href: string) => {
        router.push(href);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className="relative w-full max-w-2xl rounded-2xl border border-white/10 overflow-hidden shadow-[0_32px_100px_rgba(0,0,0,0.8)]"
                style={{ background: "rgba(10,10,10,0.97)", backdropFilter: "blur(24px)" }}
            >
                {/* Input */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
                    <Search size={16} className="text-white/40 flex-shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search photographers, styles, locations…"
                        className="flex-1 bg-transparent text-white placeholder-white/30 text-sm outline-none"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery("")}
                            className="text-white/30 hover:text-white transition-colors"
                        >
                            <X size={14} />
                        </button>
                    )}
                    <kbd className="hidden sm:flex items-center px-1.5 py-0.5 rounded border border-white/10 text-[10px] text-white/20">
                        ESC
                    </kbd>
                </div>

                <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
                    {/* No results */}
                    {q && !hasResults && (
                        <div className="py-10 text-center space-y-2">
                            <Search size={28} className="text-white/15 mx-auto" />
                            <p className="text-sm text-white/35 font-medium">No results for "{query}"</p>
                            <p className="text-xs text-white/20">Try a photographer name, city, or style</p>
                        </div>
                    )}

                    {/* Photographers */}
                    {matchedPhotographers.length > 0 && (
                        <div>
                            <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                <Camera size={10} /> Photographers
                            </p>
                            <div className="space-y-1">
                                {matchedPhotographers.map((p) => (
                                    <button
                                        key={p.id}
                                        onClick={() => navigate(`/explore/${p.id}`)}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/6 transition-all text-left group"
                                    >
                                        <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
                                            <UImg name={p.avatar} alt={p.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-white group-hover:text-white truncate">
                                                {p.name}
                                            </p>
                                            <p className="text-xs text-white/40 truncate">
                                                {p.specialty} · {p.city}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            {p.available && (
                                                <span className="text-[10px] text-[#3EDC81] font-semibold">Available</span>
                                            )}
                                            <span className="text-white/20 group-hover:text-white/50 transition-colors text-xs">→</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Marketplace */}
                    {matchedItems.length > 0 && (
                        <div>
                            <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                <ShoppingBag size={10} /> Marketplace
                            </p>
                            <div className="space-y-1">
                                {matchedItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => navigate(`/marketplace`)}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/6 transition-all text-left group"
                                    >
                                        <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
                                            <UImg name={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-white truncate">{item.title}</p>
                                            <p className="text-xs text-white/40 truncate">by {item.seller}</p>
                                        </div>
                                        <span className="text-sm font-bold text-[#FF6B00] flex-shrink-0">
                      ₦{item.priceAmount.toLocaleString()}
                    </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quick links (shown when no query) */}
                    {!q && (
                        <div>
                            <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                <TrendingUp size={10} /> Quick links
                            </p>
                            <div className="space-y-1">
                                {QUICK_LINKS.map((link) => (
                                    <button
                                        key={link.href}
                                        onClick={() => navigate(link.href)}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/6 transition-all text-left group"
                                    >
                                        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center flex-shrink-0">
                                            <Search size={13} className="text-white/30" />
                                        </div>
                                        <p className="text-sm text-white/60 group-hover:text-white transition-colors">
                                            {link.label}
                                        </p>
                                        <span className="ml-auto text-white/20 group-hover:text-white/50 transition-colors text-xs">→</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}