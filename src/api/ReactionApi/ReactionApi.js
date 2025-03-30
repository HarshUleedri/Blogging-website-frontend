import axiosInstance from "../axiosInstance";

export const addReaction = async (blogId, reactionType) => {
  console.log("Api", blogId, reactionType);
  const res = await axiosInstance.post(`/blog/${blogId}/reaction`, {
    reactionType,
  });
  return await res.data;
};

export const getReaction = async (blogId) => {
  const res = await axiosInstance.get(`/blog/${blogId}/reactions`);
  return await res.data;
};
