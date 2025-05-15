import axiosInstance from "../axiosInstance";

export const getComments = async (blogSlug) => {
  const res = await axiosInstance.get(`/comments/${blogSlug}`);
  return await res.data;
};

export const addComment = async (blogSlug, data) => {
  const res = await axiosInstance.post(`/comments/${blogSlug}`, data);
  return await res.data;
};

export const addCommentReaction = async (commentId, reactionType) => {
 
  const res = await axiosInstance.post(`/comments/reaction//${commentId}`, {
    reactionType,
  });
  return await res.data;
};

export const getCommentsOfAllBlogs = async () => {
  const res = await axiosInstance.get("/user/comments/user-blogs");
  return await res.data;
};
