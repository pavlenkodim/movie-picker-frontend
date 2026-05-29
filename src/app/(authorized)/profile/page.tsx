import SignOutButton from "@/features/auth/components/SignOutButton";
import ProfileModule from "@/features/profile/ProfileModule";
import Header from "@/shared/ui/Header";

const ProfilePage = () => {
  return (
    <>
      <Header
        right={<SignOutButton />}
        center={<h1 className="text-2xl text-center font-bold">Profile</h1>}
      ></Header>
      <ProfileModule />
    </>
  );
};

export default ProfilePage;
