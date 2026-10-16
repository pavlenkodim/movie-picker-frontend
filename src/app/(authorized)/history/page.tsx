import HistoryModule from "@/features/history/HistoryModule";
import Header from "@/shared/ui/Header";

const FavoritesPage = () => {
  return (
    <div className="h-full pt-18 px-4 md:px-16">
      <Header />
      <div className="w-full">
        <HistoryModule />
      </div>
    </div>
  );
};

export default FavoritesPage;
