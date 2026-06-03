import MoviesModule from "@/features/movies/MoviesModule";
import Header from "@/shared/ui/Header";

const MoviesPage = () => {
  return (
    <>
      <Header center={<h1 className="text-2xl text-center font-bold">Movies</h1>} />
      <MoviesModule />
    </>
  );
};

export default MoviesPage;
