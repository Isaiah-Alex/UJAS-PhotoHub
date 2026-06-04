"use client";

import { ArrowRight, MapPin, MessageSquare, Phone, Users } from "lucide-react";
import { sessionLocation } from "@/lib/booking-utils";

const SUBJECT_COUNTS = ["1", "2", "3–5", "6–10", "10+"];

interface Props {
    // location
    selectedLocation: string | null;
    onSelectLocation: (id: string) => void;
    // address
    address: string;
    onAddressChange: (val: string) => void;
    // subjects
    subjectCount: string | null;
    onSubjectCount: (val: string) => void;
    customSubjects: string;
    onCustomSubjects: (val: string) => void;
    // message
    note: string;
    onNoteChange: (val: string) => void;
    // contact
    clientName: string;
    onClientName: (val: string) => void;
    clientPhone: string;
    onClientPhone: (val: string) => void;
    // nav
    onNext: () => void;
}

export function DetailsStep({
                                selectedLocation,
                                onSelectLocation,
                                address,
                                onAddressChange,
                                subjectCount,
                                onSubjectCount,
                                customSubjects,
                                onCustomSubjects,
                                note,
                                onNoteChange,
                                clientName,
                                onClientName,
                                clientPhone,
                                onClientPhone,
                                onNext,
                            }: Props) {
    return (
        <div className="space-y-5">
            <h2 className="font-display text-xl font-bold text-white mb-5">
                Session details
            </h2>

            {/* Session location */}
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/40 uppercase tracking-wide">
                    Session location
                </label>
                <div className="grid sm:grid-cols-3 gap-2">
                    {sessionLocation.map((loc) => {
                        const isSelected = selectedLocation === loc.id;
                        return (
                            <button
                                key={loc.id}
                                onClick={() => onSelectLocation(loc.id)}
                                className={`p-4 rounded-xl border transition-all text-left ${
                                    isSelected
                                        ? "border-primary/50 bg-primary/8"
                                        : "border-border bg-muted hover:border-primary/30 hover:bg-primary/5"
                                }`}
                                style={isSelected ? { boxShadow: "0 0 0 1px rgba(255,107,0,0.15)" } : {}}
                            >
                                <span className="text-xl block mb-2">{loc.icon}</span>
                                <p className="font-semibold text-white text-sm">{loc.label}</p>
                                <p className="text-[11px] text-white/35 mt-0.5">{loc.sub}</p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Specific address */}
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/40 uppercase tracking-wide">
                    Specific address or notes
                </label>
                <div className="relative">
                    <MapPin size={14} className="absolute left-3.5 top-3.5 text-white/25" />
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => onAddressChange(e.target.value)}
                        placeholder="e.g. 15 Admiralty Way, Lekki or leave blank for studio"
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-white/20 outline-none border border-border focus:border-primary/50 transition-colors bg-input-background"
                    />
                </div>
            </div>

            {/* Number of subjects */}
            <div className="space-y-2">
                <label className="text-xs font-semibold text-white/40 uppercase tracking-wide">
                    Number of subjects
                </label>
                <div className="flex gap-2">
                    {SUBJECT_COUNTS.map((n) => {
                        const isSelected = subjectCount === n;
                        return (
                            <button
                                key={n}
                                onClick={() => onSubjectCount(n)}
                                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                    isSelected
                                        ? "text-white border border-primary/50 bg-primary/10"
                                        : "text-white/45 border border-border bg-muted hover:text-white hover:border-primary/30"
                                }`}
                                style={isSelected ? { boxShadow: "0 0 0 1px rgba(255,107,0,0.15)" } : {}}
                            >
                                {n}
                            </button>
                        );
                    })}
                </div>

                {/* Custom input shown below when 10+ selected */}
                {subjectCount === "10+" && (
                    <div className="relative">
                        <Users size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                        <input
                            type="number"
                            min={11}
                            value={customSubjects}
                            onChange={(e) => onCustomSubjects(e.target.value)}
                            placeholder="Enter exact number e.g. 25"
                            className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-white/20 outline-none border border-primary/30 focus:border-primary/60 transition-colors bg-input-background"
                        />
                    </div>
                )}
            </div>

            {/* Message to photographer */}
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/40 uppercase tracking-wide flex items-center gap-2">
                    Message to photographer
                    <span className="text-white/20 normal-case font-normal">(optional)</span>
                </label>
                <div className="relative">
                    <MessageSquare size={14} className="absolute left-3.5 top-3.5 text-white/25" />
                    <textarea
                        value={note}
                        onChange={(e) => onNoteChange(e.target.value)}
                        rows={4}
                        maxLength={500}
                        placeholder="Tell them about your vision, preferred style, outfits, mood boards, or any specific shots…"
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-white/20 outline-none resize-none border border-border focus:border-primary/50 transition-colors bg-input-background"
                    />
                </div>
                <p className="text-[11px] text-white/25 text-right">{note.length}/500</p>
            </div>

            {/* Contact */}
            <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-white/40 uppercase tracking-wide">
                        Your name
                    </label>
                    <input
                        type="text"
                        value={clientName}
                        onChange={(e) => onClientName(e.target.value)}
                        placeholder="Full name"
                        className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-white/20 outline-none border border-border focus:border-primary/50 transition-colors bg-input-background"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-white/40 uppercase tracking-wide">
                        Phone number
                    </label>
                    <div className="relative">
                        <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                        <input
                            type="tel"
                            value={clientPhone}
                            onChange={(e) => onClientPhone(e.target.value)}
                            placeholder="+234 000 000 0000"
                            className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-white/20 outline-none border border-border focus:border-primary/50 transition-colors bg-input-background"
                        />
                    </div>
                </div>
            </div>

            <button
                onClick={onNext}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2"
                style={{
                    background: "linear-gradient(135deg, var(--primary), var(--accent))",
                    boxShadow: "0 0 24px var(--primary-glow)",
                }}
            >
                Continue to Payment <ArrowRight size={15} />
            </button>
        </div>
    );
}