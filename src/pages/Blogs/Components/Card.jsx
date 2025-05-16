import { useRef, useState } from "react";
import Reaction from "./Reaction";
import Bookmark from "./Bookmark";
import Comments from "./Comments";

import ProfileCard from "./ProfileCard";
import Tags from "./Tags";

const Card = ({ blog, usersBlog = false }) => {
  //Props
  const { title, slug, _id, tags, coverImage, createdAt, author } = blog;

  //state
  const [onHover, setOnHover] = useState(false);
  const profileCardRef = useRef();

  return (
    <div className="bg-white border rounded-lg shadow-md">
      {coverImage ? (
        <>
          {/* <div className="h-64 bg-red-500 ">
            <CoverImage coverImage={coverImage} alt={title} />
          </div> */}
        </>
      ) : null}

      <div className="p-5 ">
        <div className="flex gap-4">
          <div className="shrink-0">
            <img
              className="rounded-full size-8"
              src={author?.profileImage}
              alt="profile-image"
            />
          </div>
          <div className="grow">
            <div className="relative">
              <p
                onMouseEnter={() => setOnHover(true)}
                onMouseLeave={() => {
                  profileCardRef.current = setTimeout(
                    () => setOnHover(false),
                    1000
                  );
                }}
                className="p-1 font-semibold leading-4 rounded text-dark hover:bg-secondary w-fit"
              >
                {author?.name}
              </p>
              {onHover && (
                <div
                  onMouseEnter={() => {
                    clearTimeout(profileCardRef.current);
                    setOnHover(true);
                  }}
                  onMouseLeave={() => setOnHover(false)}
                  className="absolute z-10 w-1/2 shadow-lg top-full"
                >
                  <ProfileCard user={author} />
                </div>
              )}

              <p className="px-1 text-xs leading-5">
                {new Date(createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                })}{" "}
              </p>
            </div>
            <h2 className="w-full text-2xl font-bold break-words">{title}</h2>
            <div className="mb-1">
              <Tags tags={tags} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Reaction blogSlug={slug} />
                <Comments blogSlug={slug} />
              </div>
              <div className="size-8">
                {!usersBlog && <Bookmark blogId={_id} blogSlug={slug} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
