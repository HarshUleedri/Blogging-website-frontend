import axiosInstance from "../axiosInstance";

export const uploadProfileImage = async (image) => {

  const res = await axiosInstance.post("/user/upload/profile-image", image, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return await res.data;
};
