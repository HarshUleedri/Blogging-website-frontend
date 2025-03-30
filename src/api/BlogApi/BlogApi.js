import axiosInstance from "../axiosInstance";

export const addBlog = async (data) => {
  const res = await axiosInstance.post("/blogs", data);

  return await res.data;
};

export const getSingleBlog = async (slug) => {
  const res = await axiosInstance.get(`/blogs/${slug}`);
  return await res.data;
};
