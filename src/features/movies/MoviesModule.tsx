import { MovieStack } from "./components/MovieStack";

const MoviesModule = () => {
  return (
    <div className="w-full h-screen -mt-18 -mb-8 pt-14 pb-18 md:pt-18 md:pb-18 md:-my-32 md:px-16 overflow-hidden md:overflow-visible">
      <MovieStack />
    </div>
  );
};

export default MoviesModule;
