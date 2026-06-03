import Header from "@/shared/ui/Header";

const FavoritesPage = () => {
  return (
    <div className="h-full pt-18 px-4 md:px-16">
      <Header center={<h1 className="text-2xl text-center font-bold">Favorites</h1>} />
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Your Favorite Movies</h1>
      </div>
    </div>
  );
};

export default FavoritesPage;
