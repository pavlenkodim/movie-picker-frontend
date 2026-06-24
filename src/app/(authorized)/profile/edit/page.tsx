import ProfileEditForm from "@/features/profile/components/ProfileEditForm";
import Header from "@/shared/ui/Header";

const CreateEditPage = () => {
  return (
    <div className="py-18 h-full px-4 md:px-32">
      <Header
        center={<h1 className="text-2xl text-center font-bold capitalize">Edit Profile</h1>}
      />
      <ProfileEditForm />
    </div>
  );
};

export default CreateEditPage;
