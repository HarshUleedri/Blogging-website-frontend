import axiosInstance from "../axiosInstance";

export const uploadCoverImageInApi = async (image) => {
  const res = await axiosInstance.post("/upload/cover-image", image, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return await res.data;
};
