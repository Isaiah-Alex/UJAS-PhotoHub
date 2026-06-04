"use client";

import { useState } from "react";
import { sessionTypes, type SessionType } from "@/lib/booking-utils";

export function useBooking() {
    const today = new Date();

    // Navigation
    const [step, setStep] = useState(1);
    const [done, setDone] = useState(false);

    // Step 1 — session
    const [selectedSession, setSelectedSession] = useState<SessionType>(sessionTypes[0]);
    const [addOns, setAddOns] = useState<string[]>([]);

    // Step 2 — date & time
    const [calYear,      setCalYear]      = useState(today.getFullYear());
    const [calMonth,     setCalMonth]     = useState(today.getMonth());
    const [selectedDay,  setSelectedDay]  = useState<number | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    // Step 3 — details
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [address,          setAddress]          = useState("");
    const [subjectCount,     setSubjectCount]     = useState<string | null>(null);
    const [customSubjects,   setCustomSubjects]   = useState("");
    const [note,             setNote]             = useState("");
    const [clientName,       setClientName]       = useState("");
    const [clientPhone,      setClientPhone]      = useState("");

    // Step 4 — payment
    const [payMethod, setPayMethod] = useState<"card" | "paypal">("card");
    const [cardNum,   setCardNum]   = useState("");
    const [cardExp,   setCardExp]   = useState("");
    const [cardCvv,   setCardCvv]   = useState("");
    const [cardName,  setCardName]  = useState("");
    const [loading,   setLoading]   = useState(false);

    // Helpers
    const toggleAddOn = (id: string) =>
        setAddOns((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
        );

    const prevMonth = () => {
        if (calMonth === 0) { setCalYear((y) => y - 1); setCalMonth(11); }
        else setCalMonth((m) => m - 1);
    };
    const nextMonth = () => {
        if (calMonth === 11) { setCalYear((y) => y + 1); setCalMonth(0); }
        else setCalMonth((m) => m + 1);
    };

    const goNext = () => setStep((s) => s + 1);
    const goBack = () => setStep((s) => s - 1);

    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => { setLoading(false); setDone(true); }, 1800);
    };

    const pickDay = (day: number) => {
        setSelectedDay(day);
        setSelectedSlot(null);
    };

    // Derived: display value for subjects shown in sidebar
    const subjectDisplay =
        subjectCount === "10+"
            ? customSubjects ? `${customSubjects} people` : null
            : subjectCount ? `${subjectCount} ${subjectCount === "1" ? "person" : "people"}` : null;

    return {
        // nav
        step, setStep, done, goNext, goBack,
        // step 1
        selectedSession, setSelectedSession, addOns, toggleAddOn,
        // step 2
        calYear, calMonth, prevMonth, nextMonth,
        selectedDay, pickDay,
        selectedSlot, setSelectedSlot,
        // step 3
        selectedLocation, setSelectedLocation,
        address, setAddress,
        subjectCount, setSubjectCount,
        customSubjects, setCustomSubjects,
        subjectDisplay,
        note, setNote,
        clientName, setClientName,
        clientPhone, setClientPhone,
        // step 4
        payMethod, setPayMethod,
        cardNum, setCardNum,
        cardExp, setCardExp,
        cardCvv, setCardCvv,
        cardName, setCardName,
        loading,
        handleConfirm,
    };
}

export type BookingState = ReturnType<typeof useBooking>;