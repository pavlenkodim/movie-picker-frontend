import AuthModule from "@/features/auth/AuthModule";
import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const AuthPage = async () => {
  const session = await getServerSession(options);

  if (session) {
    redirect("/profile");
  }

  return (
    <div className="flex items-center justify-center min-h-full w-full">
      <AuthModule />
    </div>
  );
};

export default AuthPage;
