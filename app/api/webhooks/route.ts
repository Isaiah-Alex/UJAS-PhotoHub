import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const eventType = evt.type;

    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name, image_url } =
        evt.data;
      const fullName = `${first_name ?? ""} ${last_name ?? ""}`.trim();
      const email = email_addresses[0]?.email_address;
      const role = (evt.data.unsafe_metadata.role as string) || "client";

      if (!email) {
        console.log("no email found, skipped insert");
        return new Response("Webhook received", { status: 200 });
      }

      const supabase = createAdminClient();
      //   const supabase = await createClient();

      const { error } = await supabase.from("profiles").insert({
        clerk_user_id: id,
        full_name: fullName,
        email: email,
        avatar_url: image_url,
        role,
      });

      if (error) {
        console.error("Supabase insert error:", error);
        return new Response("Database error", { status: 500 });
      }

      console.log("Profile created for:", fullName);
    }

    if (eventType === "user.deleted") {
      const { id } = evt.data;
      const supabase = await createClient();
      await supabase.from("profiles").delete().eq("clerk_user_id", id);
      console.log("Profile deleted for clerk_user_id:", id);
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
