import HistoryMovieCardDetails from "@/features/history/components/HistoryMovieCardDetails";
import Modal from "@/shared/ui/Modal";

const HistoryModalRoute = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return (
    <Modal>
      <HistoryMovieCardDetails swipeId={Number(id)} />
    </Modal>
  );
};

export default HistoryModalRoute;
