import { cn, colorFromLetter } from "@/shared/libs/utils";

interface ProfileThumbnailProps {
  url?: string;
  badge?: React.ReactNode;
  profileName?: string;
}

const ProfileThumbnail = ({ url, badge, profileName }: ProfileThumbnailProps) => {
  return (
    <div className="flex gap-4 flex-col items-center">
      <div className="relative">
        <div
          className={cn(
            "bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 flex items-center justify-center text-5xl font-bold",
            profileName && colorFromLetter(profileName[0]),
          )}
          data-alt={profileName ?? "nikname"}
          style={{ backgroundImage: `url(${url})` }}
        >
          {!url && profileName?.split("")[0]}
        </div>
        {badge && (
          <div className="absolute bottom-0 right-0 bg-white text-black rounded-full p-1 border-2 border-black flex items-center justify-center">
            {badge}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileThumbnail;
