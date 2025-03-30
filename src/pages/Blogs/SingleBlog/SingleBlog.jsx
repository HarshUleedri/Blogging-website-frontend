import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import SingleBlogReaction from "./Component/SingleBlogReaction";
import { useQuery } from "@tanstack/react-query";
import { getSingleBlog } from "../../../api/BlogApi/BlogApi";
import Bookmark from "../Components/Bookmark";
import { combineReducers } from "@reduxjs/toolkit";
import SingleBlogComments from "./Component/SingleBlogComments";
import { renderMarkdown } from "../../../utils/markdownParser";
import SIngleBlogSkeleton from "../../../components/Fallbacks/SingleBlogSkeleton/SIngleBlogSkeleton";
import CommentTextEditor from "./Component/CommentTextEditor";
import SingleBlogCommentList from "./Component/SingleBlogCommentList";

const SingleBlog = () => {
  //state

  // hook
  const { slug } = useParams();

  //API Call for single blog

  const { isLoading, data: singleBlogData } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getSingleBlog(slug),
  });

  return (
    <>
      <div className="flex gap-4">
        <div className="w-24 ">
          <div className="sticky flex flex-col items-center justify-center gap-6 top-14 h-96">
            <SingleBlogReaction blogId={singleBlogData?.slug} />

            <SingleBlogComments slug={singleBlogData?.slug} />
            <div className="size-10">
              <Bookmark
                blogId={singleBlogData?._id}
                blogSlug={singleBlogData?.slug}
              />
            </div>
          </div>
        </div>
        <div className="w-full p-8 my-4 border rounded-md shadow-md border-secondary bg-secondary/30">
          <div className="mb-8">
            {/* <div
              className="prose prose-lg prose-img:max-w-[300px] prose-img:mx-auto prose-img:w-full sm:prose-img:w-3/4 lg:prose-img:w-1/2"
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(singleBlogData?.content),
              }}
            /> */}
            {isLoading ? (
              <SIngleBlogSkeleton />
            ) : (
              <>
                <div>
                  <div>User</div>
                  <div className="flex items-center gap-12 mb-6">
                    <p className="flex items-center text-lg text-light">
                      💖{" "}
                      <span className="text-base ">
                        {singleBlogData.reactions["like"]}
                      </span>
                    </p>
                    <p className="text-lg text-light">
                      👏{" "}
                      <span className="text-base ">
                        {singleBlogData.reactions["clap"]}
                      </span>
                    </p>
                    <p className="text-lg text-light">
                      🤯{" "}
                      <span className="text-base ">
                        {singleBlogData.reactions["explodingHead"]}
                      </span>
                    </p>
                  </div>

                  <h1 className="mb-8 text-6xl font-bold text-dark">
                    {singleBlogData.title}
                  </h1>

                  <div className="flex items-center gap-4 py-2 mb-8">
                    {singleBlogData.tags.map(({ tag, color }) => (
                      <>
                        <div className="flex items-center gap-1">
                          <span style={{ color: color }}>#</span>
                          <p className="text-light">{tag}</p>
                        </div>
                      </>
                    ))}
                  </div>
                  <div
                    className="prose prose-lg prose-img:max-w-[300px] prose-img:mx-auto prose-img:w-full sm:prose-img:w-3/4 lg:prose-img:w-1/2"
                    dangerouslySetInnerHTML={{
                      __html: renderMarkdown(singleBlogData.content),
                    }}
                  />
                </div>
              </>
            )}
          </div>
          <div>
            <h3 id="comments" className="mb-6 text-2xl font-bold text-dark">
              Comments
            </h3>
            <div className="mb-8">
              <CommentTextEditor blogSlug={singleBlogData?.slug} />
            </div>
            <SingleBlogCommentList blogSlug={singleBlogData?.slug} />
          </div>
        </div>
        <div className="bg-blue-600 w-[35rem]">User Data</div>
      </div>
    </>
  );
};
export default SingleBlog;
