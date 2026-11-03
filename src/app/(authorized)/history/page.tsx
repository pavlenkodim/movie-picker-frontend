import HistoryModule from "@/features/history/HistoryModule";
import Header from "@/shared/ui/Header";
import { getTranslations } from "next-intl/server";

const FavoritesPage = async () => {
  const t = await getTranslations("history");
  return (
    <div className="h-full pt-18 px-4 md:px-16">
      <Header
        center={<h1 className="text-2xl text-center font-bold capitalize">{t("title")}</h1>}
      />
      <div className="w-full">
        <HistoryModule />
      </div>
    </div>
  );
};

export default FavoritesPage;
