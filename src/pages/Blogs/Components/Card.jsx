import React from "react";
import Reaction from "./Reaction";
import Bookmark from "./Bookmark";
import Comments from "./Comments";
import Tags from "./tags";
import CoverImage from "./CoverImage";

const Card = ({ blog }) => {
  // console.log(blog);
  const { title, slug, _id, tags, coverImage } = blog;

  return (
    <div className="bg-white rounded-lg ">
      {coverImage ? (
        <>
          {/* <div className="h-64 bg-red-500 ">
            <CoverImage coverImage={coverImage} alt={title} />
          </div> */}
        </>
      ) : null}

      <div className="p-5">
        <div>user</div>
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
            <Bookmark blogId={_id} blogSlug={slug} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
