import HistoryMovieCardDetails from "@/features/history/components/HistoryMovieCardDetails";

const HistoryDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return (
    <div className="flex flex-col items-center justify-center h-full md:px-32 p-4">
      <HistoryMovieCardDetails swipeId={Number(id)} className="w-full" />
    </div>
  );
};

export default HistoryDetailsPage;
