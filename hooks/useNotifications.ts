"use client";

import { useState } from "react";
import { notificationsData, type Notification } from "@/lib/photohub-data";

export function useNotifications() {
    const [notifs, setNotifs] = useState<Notification[]>(notificationsData);

    const unreadCount = notifs.filter((n) => n.unread).length;

    const markAllRead = () =>
        setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));

    const dismiss = (id: number) =>
        setNotifs((prev) => prev.filter((n) => n.id !== id));

    return { notifs, unreadCount, markAllRead, dismiss };
}