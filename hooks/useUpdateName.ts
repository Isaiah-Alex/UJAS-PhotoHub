// hooks/useUpdateName.ts
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export function useUpdateName() {
  const { user, isLoaded } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [saving, setSaving] = useState(false);

  const updateName = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await user.update({ firstName, lastName });
    } catch (err) {
      console.error("Failed to update name", err);
    } finally {
      setSaving(false);
    }
  };

  return {
    firstName,
    lastName,
    setFirstName,
    setLastName,
    updateName,
    saving,
    isLoaded,
  };
}
