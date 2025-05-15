import { useUserFollow } from "../../../hook/useUserFollow";
import UserFollowersCard from "./UserFollowersCard";

const UsersFollowers = () => {
  const { userFollowersData, userFollowersLoading, userFollowersError } =
    useUserFollow({ fetchFollowers: true });

  const followers = userFollowersData?.followers;

  return (
    <>
      {followers?.length === 0 ? (
        <>
          {" "}
          <div className="w-full text-3xl font-bold text-center text-light ">
            You Have No Followers
          </div>{" "}
        </>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-6">
            {followers?.map((follower, index) => (
              <>
                <div key={index}>
                  <UserFollowersCard follower={follower} />
                </div>
              </>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default UsersFollowers;
