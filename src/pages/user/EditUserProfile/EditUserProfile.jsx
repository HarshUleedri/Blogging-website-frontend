import EditUserData from "./component/EditUserData";
import { useUserData } from "../../../hook/useUserData";

const EditUserProfile = () => {
  const { data: userData } = useUserData();

  if (!userData) {
    return <div>Loading...</div>;
  }

  const {
    name,
    username,
    email,
    brandColor,
    bio,
    profileImage,
    location,
    skills,
  } = userData.user;

  const EditeUserDataProp = {
    name,
    username,
    email,
    brandColor,
    bio,
    profileImage,
    location,
    skills,
  };

  return (
    <div>
      <div className="flex gap-4 my-8">
        <div className=" w-[32rem] h-fit sticky flex items-top justify-center top-14 py-4 ">
          <img className="rounded-full size-32" src={profileImage} alt="" />
        </div>
        <div className="w-full ">
          <EditUserData EditeUserDataProp={EditeUserDataProp} />
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;
