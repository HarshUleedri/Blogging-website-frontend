import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { uploadProfileImage } from "../../../../api/uploadImageApi/uploadProfileImage";
import { useUserData } from "../../../../hook/useUserData";

const EditUserData = ({
  EditeUserDataProp: {
    name,
    username,
    email,
    brandColor,
    bio,
    profileImage,
    location,
    skills,
  },
}) => {
  //state
  const [updatedUserData, setUpdatedUserData] = useState({
    name: name || "",
    username: username || "",
    email: email || "",
    brandColor: brandColor || "",
    bio: bio || "",
    profileImage: profileImage || "",
    location: location || "",
    skills: skills || "",
  });

  const [isSuccessFull, setIsSuccessFull] = useState(false);

  //hook

  const {
    mutate,
    isPending,
    isError: imageUploadingError,
  } = useMutation({
    mutationFn: (data) => uploadProfileImage(data),
    onSuccess: (data) =>
      setUpdatedUserData((prev) => ({ ...prev, profileImage: data.imageUrl })),
  });

  const {
    mutate: userUpdateApiCall,
    isPending: mutationPending,
    mutateError,
    mutationSuccess,
  } = useUserData();

  //helper Function

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdatedUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);
      mutate(formData);
    }
  };

  const handleUpdateProfile = () => {
    if (!updatedUserData) {
      return;
    }
    userUpdateApiCall(updatedUserData);
    if (mutationSuccess) {
      setIsSuccessFull(true);
      setTimeout(() => {
        setIsSuccessFull(false);
      }, 3000);
    }
  };

  return (
    <div className="">
      {isSuccessFull && (
        <div className="fixed left-0 w-full h-12 top-12 bg-dark">
          <p className="pt-3 text-center text-white">
            The User Information is Successfully Updated
          </p>
        </div>
      )}

      <h2 className="mb-6 text-3xl font-bold text-accent"> @{username}</h2>
      <div className="space-y-8">
        <div className="p-6 border rounded-md">
          <h2 className="mb-6 text-2xl font-semibold text-dark">User</h2>
          <div className="space-y-8">
            <label className="flex flex-col gap-2 " htmlFor="name">
              <p className="font-semibold text-dark"> Name</p>

              <input
                className="px-4 py-1 border rounded"
                name="name"
                value={updatedUserData.name}
                type="text"
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col gap-2 " htmlFor="email">
              <p className="font-semibold text-dark"> Email</p>

              <input
                className="px-4 py-1 border rounded"
                name="email"
                value={updatedUserData.email}
                type="text"
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col gap-2 " htmlFor="username">
              <p className="font-semibold text-dark"> Username</p>

              <input
                className="px-4 py-1 border rounded"
                name="username"
                value={updatedUserData.username}
                type="text"
                onChange={handleChange}
              />
            </label>
            <div>
              <p className="mb-4 font-semibold text-dark">Profile image</p>
              <div className="flex items-center gap-8 px-2 py-4 border">
                {isPending ? (
                  <>
                    <div className="border-2 rounded-full border-secondary border-t-accent animate-spin size-4"></div>
                  </>
                ) : (
                  <>
                    <img
                      className="rounded-full size-12"
                      src={
                        updatedUserData.profileImage ||
                        "https://dummyimage.com/100x100/a1a1a1/fff&text=profile+Image"
                      }
                      alt="profile-image"
                    />
                  </>
                )}

                <div>
                  <input
                    id="upload-profile-image"
                    className="hidden"
                    type="file"
                    onChange={handleUpload}
                  />

                  <label
                    htmlFor="upload-profile-image"
                    className="px-4 py-1 text-lg font-semibold rounded-md bg-secondary text-light"
                  >
                    {updatedUserData.profileImage
                      ? "Change file"
                      : "Choose file"}
                  </label>
                  <span className="ml-4">
                    {updatedUserData.profileImage
                      ? updatedUserData.profileImage
                      : "No File is Choosen"}
                  </span>
                  {imageUploadingError && (
                    <p className="mt-4 text-sm text-red-600">
                      something went wrong
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 border rounded-md">
          <h2 className="mb-6 text-2xl font-semibold text-dark">Basic</h2>
          <div className="space-y-8">
            <label className="flex flex-col gap-2 " htmlFor="location">
              <p className="font-semibold text-dark"> Location</p>

              <input
                className="px-4 py-1 border rounded"
                name="location"
                value={updatedUserData.location}
                type="text"
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col gap-2 " htmlFor="bio">
              <p className="font-semibold text-dark"> Bio</p>

              <textarea
                className="px-4 py-1 border rounded"
                name="bio"
                value={updatedUserData.bio}
                type="text"
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        <div className="p-6 border rounded-md">
          <h2 className="mb-6 text-2xl font-semibold text-dark">Personal</h2>
          <div className="space-y-8">
            <label className="flex flex-col gap-2 " htmlFor="skills">
              <p className="font-semibold text-dark"> Skills</p>

              <textarea
                className="px-4 py-1 border rounded"
                name="skills"
                value={updatedUserData.skills}
                type="text"
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        <div className="p-6 border rounded-md">
          <h2 className="mb-6 text-2xl font-semibold text-dark">Branding</h2>
          <div className="space-y-2 ">
            <div className="mb-4">
              <p className="font-semibold text-dark">Brand Color</p>
              <p className="text-sm text-light">Used for backgrounds</p>
            </div>
            <div className="flex items-center gap-4 px-1 py-1 border ">
              <input
                name="brandColor"
                value={updatedUserData.brandColor}
                className="w-10 h-10 border rounded-md cursor-pointer"
                type="color"
                onChange={handleChange}
              />
              <div className="text-xl">{updatedUserData.brandColor}</div>
            </div>
          </div>
        </div>
        <div className="p-6 border rounded-md">
          {mutateError && (
            <p className="mb-4 text-sm text-red-600">something went wrong</p>
          )}
          <button
            disabled={mutationPending}
            onClick={handleUpdateProfile}
            className="w-full btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Save Profile Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserData;
