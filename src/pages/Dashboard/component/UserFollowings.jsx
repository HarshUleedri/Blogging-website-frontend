import { useUserFollow } from "../../../hook/useUserFollow";
import UserFollowersCard from "./UserFollowersCard";

const UserFollowings = () => {
  const { userFollowingsData, userFollowingsLoading, userFollowingsDataError } =
    useUserFollow({ fetchFollowings: true });

  const followings = userFollowingsData?.followings;

  return (
    <>
      {followings.length === 0 ? (
        <>
          <div className="w-full text-3xl font-bold text-center text-light ">
            You Have No Followings
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-6">
            {followings?.map((following, index) => (
              <>
                <div key={index}>
                  <UserFollowersCard follower={following} />
                </div>
              </>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default UserFollowings;
