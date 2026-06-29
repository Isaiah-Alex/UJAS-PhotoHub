"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "../supabase/admin";
import { auth } from "@clerk/nextjs/server";

export async function getProfileByClerkId(clerkUserId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("clerk_user_id", clerkUserId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  return data;
}

export async function updateProfileRole(role: "photographer" | "client") {
  const { userId } = await auth();
  if (!userId) return { error: "Not authenticated" };

  const supabase = createAdminClient();

  const { error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("clerk_user_id", userId);

  if (error) {
    console.error("Error updating role:", error);
    return { error: error.message };
  }

  return { success: true };
}

export async function createProfile(data: {
  clerkUserId: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  role: "photographer" | "client";
}) {
  const supabase = createAdminClient();

  const { error } = await supabase.from("profiles").upsert(
    {
      clerk_user_id: data.clerkUserId,
      full_name: data.fullName,
      email: data.email,
      avatar_url: data.avatarUrl,
      role: data.role,
    },
    {
      onConflict: "clerk_user_id", // update if already exists
    },
  );

  if (error) {
    console.error("Error creating profile:", error);
    return { error: error.message };
  }

  return { success: true };
}
