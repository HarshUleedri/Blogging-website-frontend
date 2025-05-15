import { useState } from "react";
import BlogAnalytics from "./component/BlogAnalytics";
import DetailBlogsList from "./component/DetailBlogsList";
import { useUserBlogs } from "../../hook/useUsersBlogs";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import UsersFollowers from "./component/UsersFollowers";
import UserFollowings from "./component/UserFollowings";
import AnalyticsHeaderSkeleton from "../../components/Fallbacks/AnalyticsSkeleton/AnalyticsHeaderSkeleton";

const Dashboard = () => {
  //state
  const [isSelected, setIsSelected] = useState("post");

  //hook

  const { data } = useUserBlogs();
  const navigate = useNavigate();
  const location = useLocation();

  if (!data) {
    return (
      <>
        <AnalyticsHeaderSkeleton />{" "}
      </>
    );
  }

  if (location.pathname === "/dashboard/analytics")
    return (
      <>
        <Outlet />
      </>
    );

  return (
    <div>
      <h1 className="mt-6 mb-8 text-3xl font-bold">Dashboard</h1>
      <div>
        {isSelected.trim().toLowerCase() === "post" && (
          <BlogAnalytics blogs={data} />
        )}
      </div>
      <div className="flex gap-6 ">
        <div className="sticky p-4 border rounded w-96 top-14 h-fit">
          <button
            onClick={() => setIsSelected("post")}
            className={`rounded px-4 py-2 hover:bg-accent/20 hover:text-accent w-full flex items-center justify-between ${
              isSelected === "post" && "bg-secondary text-light font-semibold"
            } `}
          >
            Post
            <p
              className={`p-1 bg-secondary ${
                isSelected === "post" && "bg-white font-normal"
              } rounded-full`}
            >
              {data.length}
            </p>
          </button>
          <button
            onClick={() => setIsSelected("followers")}
            className={`rounded px-4 py-2 hover:bg-accent/20 hover:text-accent w-full flex items-center justify-between ${
              isSelected === "followers" &&
              "bg-secondary text-light font-semibold"
            } `}
          >
            Followers
            <p
              className={`p-1 bg-secondary ${
                isSelected === "followers" && "bg-white font-normal"
              } rounded-full`}
            >
              {}
            </p>
          </button>
          <button
            onClick={() => setIsSelected("following")}
            className={`rounded px-4 py-2 hover:bg-accent/20 hover:text-accent w-full flex items-center justify-between ${
              isSelected === "following" &&
              "bg-secondary text-light font-semibold"
            } `}
          >
            Following
            <p
              className={`p-1 bg-secondary ${
                isSelected === "following" && "bg-white font-normal"
              } rounded-full`}
            >
              {}
            </p>
          </button>
          <button
            onClick={() => navigate("analytics")}
            className={`rounded px-4 py-2 hover:bg-accent/20 hover:text-accent w-full flex items-center justify-between ${
              isSelected === "analytics" &&
              "bg-secondary text-light font-semibold"
            } `}
          >
            Analytics
            <p
              className={`p-1 bg-secondary ${
                isSelected === "analytics" && "bg-white font-normal"
              } rounded-full`}
            >
              {}
            </p>
          </button>
        </div>
        <div className="w-full">
          {isSelected.trim().toLowerCase() === "post" && (
            <DetailBlogsList blogs={data} />
          )}
          {isSelected.trim().toLowerCase() === "followers" && (
            <>
              <UsersFollowers />
            </>
          )}
          {isSelected.trim().toLowerCase() === "following" && (
            <>
              <UserFollowings />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
