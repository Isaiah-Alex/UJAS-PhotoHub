"use server";

// import { createClient } from "@/lib/supabase/server";
import { getProfileByClerkId } from "./profiles";
import { auth } from "@clerk/nextjs/server";
import { createAdminClient } from "../supabase/admin";

export async function createPhotographerProfile(data: {
  specialty: string;
  location: string;
}) {
  const { userId } = await auth();
  if (!userId) return { error: "Not authenticated" };

  const profile = await getProfileByClerkId(userId);
  if (!profile) return { error: "Profile not found" };

  const supabase = createAdminClient();

  const { error } = await supabase.from("photographers").insert({
    profile_id: profile.id,
    specialty: data.specialty,
    location: data.location,
  });

  if (error) {
    console.error("Error creating photographer profile:", error);
    return { error: error.message };
  }

  return { success: true };
}
