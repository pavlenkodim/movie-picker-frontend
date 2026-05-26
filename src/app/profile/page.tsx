import SignOutButton from "@/features/auth/components/SignOutButton";
import ProfileModule from "@/features/profile/ProfileModule";
import Header from "@/shared/ui/Header";

const ProfilePage = () => {
  return (
    <>
      <Header right={<SignOutButton />}></Header>
      <ProfileModule />
    </>
  );
};

export default ProfilePage;
