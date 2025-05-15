import { useNavigate } from "react-router-dom";

const UserFollowersCard = ({ follower }) => {
  //hook
  const navigate = useNavigate();

  //value
  const { profileImage, name, username } = follower;

  return (
    <>
      <div
        onClick={() => navigate(`/${username}`)}
        className="flex flex-col items-center justify-center w-full px-12 py-8 border rounded-md "
      >
        <img
          className="mb-4 rounded-full size-16"
          src={
            profileImage ||
            "https://dummyimage.com/150x150/d6d6d6/fff&text=image"
          }
          alt="profile-image"
        />
        <div className="text-center">
          <h2 className="mb-2 text-xl font-bold leading-4 text-accent">
            {name || "Name"}
          </h2>
          <p className="text-light ">@{username}</p>
        </div>
      </div>
    </>
  );
};

export default UserFollowersCard;
