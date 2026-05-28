"use client";

import { useRouter } from "next/navigation";

type AppPage = "home" | "explore" | "marketplace" | "profile";

export const PAGE_PATHS: Record<AppPage, string> = {
  home: "/",
  explore: "/explore",
  marketplace: "/marketplace",
  profile: "/profile",
};

export function useNavigate() {
  const router = useRouter();
  return (page: AppPage) => router.push(PAGE_PATHS[page]);
}
