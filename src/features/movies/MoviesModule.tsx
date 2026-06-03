import { MovieStack } from "./components/MovieStack";

const MoviesModule = () => {
  return (
    <div className="w-full h-full py-12 overflow-hidden md:overflow-visible">
      <MovieStack />
    </div>
  );
};

export default MoviesModule;
