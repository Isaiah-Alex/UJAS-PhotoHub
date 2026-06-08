import { useUser } from "@clerk/nextjs";
import { useRef } from "react";

export function useProfileImage() {
  const { user, isLoaded } = useUser();
  const inputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    await user.setProfileImage({ file });
    await user.reload();
  };

  const removeImage = async () => {
    if (!user || !user.hasImage) return;

    await user.setProfileImage({ file: null });
    await user.reload();
  };

  return {
    inputRef,
    imageUrl: user?.imageUrl,
    hasImage: user?.hasImage,
    isLoaded,
    openFilePicker,
    handleImageChange,
    removeImage,
  };
}
