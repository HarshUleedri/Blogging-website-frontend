import { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserProfileHeader from "./component/UserProfileHeader";
import { useUserData } from "../../../hook/useUserData";
import Card from "../../Blogs/Components/Card";
import { useUserBlogs } from "../../../hook/useUsersBlogs";

const UserProfile = () => {
  //hooks
  const { data } = useUserData();
  const { data: usersBlogs } = useUserBlogs();
  const navigate = useNavigate();

  //state
  const { name, profileImage, bio, createdAt, brandColor } = data?.user || {};

  const ProfileHeaderProp = {
    name,
    profileImage,
    bio,
    createdAt,
    brandColor,
  };

  const [isSelected, setIsSelected] = useState("post");

  // const { ProfileImage, name, bio, createdAt } = data?.user;

  return (
    <div className="">
      <div
        style={{ backgroundColor: brandColor }}
        className="h-44 bg-dark "
      ></div>
      <div className="px-32 -mt-14 ">
        <div className="mb-4">
          <Suspense fallback={<>loading</>}>
            <UserProfileHeader ProfileHeaderProp={ProfileHeaderProp} />
          </Suspense>
        </div>

        <div className="flex gap-4 ">
          <div className=" w-[32rem] h-fit sticky top-16 space-y-4">
            <div className="flex flex-col px-4 py-6 bg-white border rounded">
              <div
                className={`px-8 rounded-sm py-2 flex items-center justify-between  ${
                  isSelected === "post" &&
                  "bg-secondary text-light font-semibold  "
                }  `}
                onClick={() => setIsSelected("post")}
              >
                <p>Post</p>
              </div>
              <div
                className={`px-8 rounded-sm py-2 flex items-center justify-between  ${
                  isSelected === "bookmark" && "bg-secondary text-light  "
                }  `}
                onClick={() => setIsSelected("bookmark")}
              >
                <p>Bookmarks</p>
                <p className="text-sm rounded-full ">
                  {data?.user.bookmarks.length}
                </p>
              </div>
              <div
                className={`px-8 rounded-sm py-1 ${
                  isSelected === "comments" && "bg-secondary text-light  "
                }  `}
                onClick={() => setIsSelected("comments")}
              >
                Comments
              </div>
            </div>
            <div className="flex flex-col gap-4 px-4 py-6 bg-white border rounded">
              <div className="flex items-center gap-4 text-light">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  role="img"
                  fill="currentColor"
                  aria-labelledby="a1mo4kp70slmly78whqka30tk1822jmu"
                  className="size-5 "
                >
                  <title id="a1mo4kp70slmly78whqka30tk1822jmu">Post</title>
                  <path d="M19 22H5a3 3 0 01-3-3V3a1 1 0 011-1h14a1 1 0 011 1v12h4v4a3 3 0 01-3 3zm-1-5v2a1 1 0 002 0v-2h-2zm-2 3V4H4v15a1 1 0 001 1h11zM6 7h8v2H6V7zm0 4h8v2H6v-2zm0 4h5v2H6v-2z"></path>
                </svg>
                <p className="text-light">
                  {usersBlogs?.length} post published
                </p>
              </div>
              <div className="flex items-center gap-4 text-light">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                  />
                </svg>

                <p className="text-light">{} Comments Written</p>
              </div>
            </div>
          </div>
          <div className="w-full p-4 space-y-4 border min-h-96">
            {isSelected.toLowerCase().trim() === "post" && (
              <>
                {usersBlogs?.length !== 0 ? (
                  <>
                    {usersBlogs?.map((blog, index) => (
                      <>
                        <div
                          onClick={() => navigate(`/blog/${blog?.slug}`)}
                          key={index}
                        >
                          <Card blog={blog} usersBlog={true} />
                        </div>
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="py-20 text-xl font-semibold text-center text-light">
                      No Post
                    </div>
                  </>
                )}
              </>
            )}

            {isSelected.toLowerCase().trim() === "bookmark" && (
              <>
                {data?.user.bookmarks.length !== 0 ? (
                  <>
                    {data?.user.bookmarks?.map((blog, index) => (
                      <>
                        <div
                          onClick={() => navigate(`/blog/${blog?.slug}`)}
                          key={index}
                        >
                          <Card blog={blog} />
                        </div>
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="py-20 text-xl font-semibold text-center text-light">
                      No Bookmarks
                    </div>
                  </>
                )}
              </>
            )}
            {isSelected.toLowerCase().trim() === "comments" && <>comments</>}

            {/**/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
