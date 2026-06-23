import { cn, colorFromLetter } from "@/shared/libs/utils";

interface ProfileThumbnailProps extends React.HTMLAttributes<HTMLDivElement> {
  url?: string;
  badge?: React.ReactNode;
  profileName?: string;
  bgColor?: string;
}

const ProfileThumbnail = ({
  url,
  badge,
  profileName,
  children,
  className,
  bgColor,
}: ProfileThumbnailProps) => {
  return (
    <div className={cn("flex gap-4 flex-col items-center", className)}>
      <div className="relative">
        <div
          className={cn(
            "bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 flex items-center justify-center text-5xl font-bold",
            profileName && colorFromLetter(profileName[0]),
            bgColor,
          )}
          data-alt={profileName ?? "nikname"}
          style={url ? { backgroundImage: `url(${url})` } : {}}
        >
          {children ? children : !url && profileName?.split("")[0]}
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
