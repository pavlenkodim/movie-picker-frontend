import HistoryModule from "@/features/history/HistoryModule";
import Header from "@/shared/ui/Header";

const FavoritesPage = () => {
  return (
    <div className="h-full pt-18 px-4 md:px-16">
      <Header />
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Your Swipes</h1>
        <HistoryModule />
      </div>
    </div>
  );
};

export default FavoritesPage;
