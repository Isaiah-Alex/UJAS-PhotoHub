import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useProfileImage } from "@/hooks/useProfileImage";
import { photographers } from "@/lib/photohub-data";
import { X, PlusCircle } from "lucide-react";
import { useUpdateName } from "@/hooks/useUpdateName";

export default function ProfileTab() {
  const { user } = useUser();
  const me = photographers[0];

  // upload and remove image variables
  const {
    inputRef,
    imageUrl,
    hasImage,
    isLoaded,
    openFilePicker,
    handleImageChange,
    removeImage,
  } = useProfileImage();

  //update name filed variables
  const { firstName, lastName, setFirstName, setLastName, updateName, saving } =
    useUpdateName();

  function splitFullName(fullName: string): void {
    const firstName = fullName.split(" ")[0];
    const lastName = fullName.split(" ")[1];

    setFirstName(firstName);
    setLastName(lastName);
  }

  return (
    <>
      <h3 className="font-display font-bold text-white">Profile Settings</h3>

      {/* Avatar upload */}
      <div className="flex items-center gap-5 p-4 rounded-2xl bg-white/3 border border-border">
        <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-primary/30 flex-shrink-0">
          <Image
            src={imageUrl ?? "/avatar.svg"}
            width={500}
            height={500}
            alt={`${user?.fullName} profile`}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-semibold text-white text-sm">
            {user?.fullName?.toUpperCase()}
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            JPG, PNG up to 5MB
          </p>
          <div>
            <input
              type="file"
              ref={inputRef}
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <div className="flex gap-2">
              <button
                onClick={openFilePicker}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white cursor-pointer"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary), var(--accent))",
                }}
              >
                Change Photo
              </button>
              <button
                onClick={removeImage}
                disabled={!hasImage}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white/40 border border-border hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fields */}
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          {
            label: "Full Name",
            value: firstName + " " + lastName,
            type: "text",
          },
          {
            label: "Username",
            value: firstName + "_" + lastName,
            type: "text",
          },
          {
            label: "Email",
            value: user?.primaryEmailAddress?.emailAddress,
            type: "email",
          },
          { label: "Phone", value: "+234 801 234 5678", type: "tel" },
          { label: "Location", value: me.location, type: "text" },
          { label: "Website", value: "adaezeokafor.ng", type: "url" },
        ].map(({ label, value, type }) => (
          <div key={label} className="space-y-1.5">
            <label className="text-xs font-semibold text-white/35 uppercase tracking-wide">
              {label}
            </label>
            <input
              type={type}
              defaultValue={value}
              className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none border border-border focus:border-primary/50 transition-colors bg-input"
            />
          </div>
        ))}
      </div>

      {/* Bio */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-white/35 uppercase tracking-wide">
          Bio
        </label>
        <textarea
          rows={3}
          defaultValue={me.bio}
          className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none border border-border focus:border-primary/50 transition-colors resize-none bg-input"
        />
      </div>

      {/* Specialties */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-white/35 uppercase tracking-wide">
          Specialties
        </label>
        <div className="flex flex-wrap gap-2">
          {me.specializations.map((s) => (
            <span
              key={s}
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-white/60 border border-border bg-white/4 flex items-center gap-1.5"
            >
              {s}
              <X
                size={10}
                className="text-white/30 cursor-pointer hover:text-white/60"
              />
            </span>
          ))}
          <button className="px-3 py-1.5 rounded-xl text-xs font-medium text-primary border border-primary/25 bg-primary/8 flex items-center gap-1">
            <PlusCircle size={11} /> Add
          </button>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          className="px-6 py-3 rounded-xl text-sm font-bold text-white"
          style={{
            background:
              "linear-gradient(135deg, var(--primary), var(--accent))",
            boxShadow: "0 0 20px var(--primary-glow)",
          }}
        >
          Save Changes
        </button>
        <button className="px-6 py-3 rounded-xl text-sm font-semibold text-white/50 border border-border hover:text-white hover:border-white/20 transition-all">
          Cancel
        </button>
      </div>
    </>
  );
}
