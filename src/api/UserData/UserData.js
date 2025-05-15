import axiosInstance from "../axiosInstance";

export const getUserData = async () => {
  const res = await axiosInstance.get(`/user`);
  return await res.data;
};

export const updateUserData = async (data) => {
  const res = await axiosInstance.post("/user", data);
  return await res.data;
};

export const getFollowers = async () => {
  const res = await axiosInstance.get("/user/followers");
  return await res.data;
};

export const getFollowings = async () => {
  const res = await axiosInstance.get("/user/following");
  return await res.data;
};

export const toggleFollow = async (data) => {
  const res = await axiosInstance.post("/user/follow", data);
  return await res.data;
};
