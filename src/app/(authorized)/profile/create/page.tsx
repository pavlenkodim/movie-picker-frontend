import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ProfileCreateForm from "@/features/profile/components/ProfileCreateForm";
import Header from "@/shared/ui/Header";

const CreateProfilePage = async () => {
  const session = await getServerSession(options);

  if (session?.user.profileId) redirect("/profile");

  return (
    <div className="py-18 h-full px-4 md:px-32">
      <Header
        center={<h1 className="text-2xl text-center font-bold capitalize">Create Profile</h1>}
      />
      <ProfileCreateForm />
    </div>
  );
};

export default CreateProfilePage;
