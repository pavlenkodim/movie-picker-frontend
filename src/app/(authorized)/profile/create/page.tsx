import ProfileCreateForm from "@/features/profile/components/ProfileCreateForm";
import Header from "@/shared/ui/Header";

const CreateProfilePage = () => {
  return (
    <div className="py-18 h-full px-4 md:px-16">
      <Header center={<h1 className="text-2xl text-center font-bold capitalize">Profile</h1>} />
      <ProfileCreateForm />
    </div>
  );
};

export default CreateProfilePage;
