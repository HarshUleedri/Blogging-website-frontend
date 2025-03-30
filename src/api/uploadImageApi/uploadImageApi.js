import axiosInstance from "../axiosInstance";

export const uploadImageInApi = async (image) => {
  const res = await axiosInstance.post("/upload/image", image, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return await res.data;
};
