"use client";

import { useRouter, usePathname } from "next/navigation";
import { BookingShell } from "@/components/booking/BookingShell";


export default function BookingPage() {
    const router = useRouter();
    const pathname = usePathname();
    const splitPathname = pathname.split("/");

    return (
        <BookingShell
            onGoHome={() => router.push("/")}
            onViewProfile={() => router.push(`/profile/${splitPathname[2]}`)}
        />
    );
}