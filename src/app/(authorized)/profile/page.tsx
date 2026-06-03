import ProfileModule from "@/features/profile/ProfileModule";
import Header from "@/shared/ui/Header";

const ProfilePage = () => {
  return (
    <div className="py-18 h-full px-4 md:px-16">
      <Header center={<h1 className="text-2xl text-center font-bold">Profile</h1>} />
      <ProfileModule />
    </div>
  );
};

export default ProfilePage;
