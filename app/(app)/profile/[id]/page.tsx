import { ProfileClient } from "./profile-client";
import { photographers } from "@/lib/photohub-data";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return photographers.map((photographer) => ({
    id: String(photographer.id),
  }));
}

export default async function ProfilePage({ params }: Props) {
  const { id } = await params;

  return <ProfileClient id={id} />;
}
