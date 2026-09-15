"use client";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/api";
import { HistoryData } from "../HistoryModule";

export const useHistoryDetails = (id: number) => {
  return useQuery<HistoryData>({
    queryKey: ["swipe", id],
    queryFn: () => apiClient<HistoryData>(`swipes/${id}`),
    staleTime: Infinity,
  });
};

export default useHistoryDetails;
