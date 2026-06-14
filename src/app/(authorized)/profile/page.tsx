import ProfileModule from "@/features/profile/ProfileModule";
import Header from "@/shared/ui/Header";

const ProfilePage = () => {
  return (
    <div className="py-18 h-full px-4 md:px-16">
      <Header />
      <ProfileModule />
    </div>
  );
};

export default ProfilePage;
