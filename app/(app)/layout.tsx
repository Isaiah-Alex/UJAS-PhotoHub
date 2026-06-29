"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { useNotifications } from "@/hooks/useNotifications";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [scrolled, setScrolled] = useState(false);
  const notifications = useNotifications();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-full w-screen bg-background text-white overflow-x-hidden">
      <Navbar scrolled={scrolled} notifications={notifications} />
      {children}
    </div>
  );
}
