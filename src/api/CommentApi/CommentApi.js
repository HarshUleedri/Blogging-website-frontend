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
  console.log(commentId);
  console.log(reactionType);
  const res = await axiosInstance.post(`/comments/reaction//${commentId}`, {
    reactionType,
  });
  return await res.data;
};
