import { redirect } from "next/navigation";
import { apiClient, ApiError } from "@/shared/api/api";
import { GenreWeight } from "@/features/profile/types";
import ProfileInitalGenresForm from "@/features/profile/components/ProfileInitalGenresForm";
import Header from "@/shared/ui/Header";

const InitialGenresPage = async () => {
  let genreWeights: GenreWeight[] = [];
  try {
    genreWeights = await apiClient<GenreWeight[]>("genre-weights");
  } catch (error) {
    if (!(error instanceof ApiError)) throw error;
  }

  if (genreWeights.length > 0) redirect("/profile");

  return (
    <div className="py-18 h-full px-4 md:px-32">
      <Header center={<h1 className="text-2xl text-center font-bold capitalize">Filmder</h1>} />
      <ProfileInitalGenresForm />
    </div>
  );
};

export default InitialGenresPage;
