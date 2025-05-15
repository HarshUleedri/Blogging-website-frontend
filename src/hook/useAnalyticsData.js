import { useQuery } from "@tanstack/react-query";
import {
  getCommentsAnalyticsData,
  getReactionsAnalyticsData,
  getReadersAnalyticsData,
} from "../api/AnalyticsApi/AnalyticsApi";

export const useAnalyticsData = ({
  timeframe,
  comment = false,
  readers = false,
  reactions = false,
}) => {
  //state

  //hook
  const {
    data: commentAnalyticsData,
    isLoading: isLoadingCommentAnalyticsData,
    isError: isErrorCommentAnalyticsData,
  } = useQuery({
    queryKey: ["comments-analytics", timeframe],
    queryFn: () => getCommentsAnalyticsData(timeframe),
    enabled: !!timeframe && comment,
  });

  const {
    data: readersAnalyticsData,
    isLoading: isLoadingReadersAnalyticsData,
    isError: isErrorReadersAnalyticsData,
  } = useQuery({
    queryKey: ["reader-analytics", timeframe],
    queryFn: () => getReadersAnalyticsData(timeframe),
    enabled: !!timeframe && readers,
  });

  const {
    data: reactionsAnalyticsData,
    isError: isErrorReactionsAnalyticsData,
    isLoading: isLoadingReactionsAnalyticsData,
  } = useQuery({
    queryKey: ["reaction-analytics", timeframe],
    queryFn: () => getReactionsAnalyticsData(timeframe),
    enabled: !!timeframe && reactions,
  });

  return {
    commentAnalyticsData,
    isLoadingCommentAnalyticsData,
    isErrorCommentAnalyticsData,
    readersAnalyticsData,
    isLoadingReadersAnalyticsData,
    isErrorReadersAnalyticsData,
    reactionsAnalyticsData,
    isErrorReactionsAnalyticsData,
    isLoadingReactionsAnalyticsData,
  };
};
