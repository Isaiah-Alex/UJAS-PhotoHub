import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getProfileByClerkId } from "@/lib/actions/profiles";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  const profile = await getProfileByClerkId(userId!);

  if (!profile || profile.role !== "photographer") redirect("/");

  return <>{children}</>;
}
