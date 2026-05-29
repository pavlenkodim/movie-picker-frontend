const ProfileThumbnail = ({ url, badge }: { url?: string; badge?: React.ReactNode }) => {
  return (
    <div className="flex gap-4 flex-col items-center">
      <div className="relative">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32"
          data-alt="Monochrome portrait of a smiling young person"
          style={{ backgroundImage: `url(${url})` }}
        ></div>
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
