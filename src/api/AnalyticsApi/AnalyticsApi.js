import axiosInstance from "../axiosInstance";

export const getCommentsAnalyticsData = async (data) => {
  const res = await axiosInstance.get(
    `/user/comments/analytics?timeframe=${data}`
  );
  return await res.data;
};

export const getReadersAnalyticsData = async (data) => {
  const res = await axiosInstance.get(
    `/user/reader/analytics?timeframe=${data}`
  );
  return await res.data;
};

export const getReactionsAnalyticsData = async (data) => {
  const res = await axiosInstance.get(
    `/user/reaction/analytics?timeframe=${data}`
  );
  return await res.data;
};
