import axiosInstance from "../axiosInstance";

export const fetchBookmark = async () => {
  const res = await axiosInstance.get("/blog/bookmark");
  return await res.data;
};

export const toggleBookmarkApi = async (blogSlug) => {
  await axiosInstance.post(`blog/${blogSlug}/bookmark`);
};
