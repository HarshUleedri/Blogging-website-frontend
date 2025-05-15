import axiosInstance from "../axiosInstance";

export const addBlog = async (data) => {
  const res = await axiosInstance.post("/blogs", data);

  return await res.data;
};

export const getSingleBlog = async (slug) => {
  const res = await axiosInstance.get(`/blogs/${slug}`);
  return await res.data;
};

export const getUserBlogs = async () => {
  const res = await axiosInstance.get("/user/blogs");
  return await res.data;
};
export const UpdateBlog = async (data) => {

  const res = await axiosInstance.put(`/blogs/${data.slug}`, data.formData);
  return await res.data;
};

export const getAllblogs = async () => {
  const res = await axiosInstance.get("/blogs");
  return await res.data;
};

export const getSearchedBlogs = async (query) => {
  const res = await axiosInstance.get(`/search?q=${query}`);
  return await res.data;
};
