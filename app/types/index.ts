export type Profile = {
  id: string;
  clerk_user_id: string;
  full_name: string;
  email: string;
  role: "photographer" | "client";
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
};
