import { useLocation, useNavigate, useParams } from "react-router-dom";

import SingleBlogReaction from "./Component/SingleBlogReaction";
import { useQuery } from "@tanstack/react-query";
import { getSingleBlog } from "../../../api/BlogApi/BlogApi";
import Bookmark from "../Components/Bookmark";
import SingleBlogComments from "./Component/SingleBlogComments";
import { renderMarkdown } from "../../../utils/markdownParser";
import SIngleBlogSkeleton from "../../../components/Fallbacks/SingleBlogSkeleton/SIngleBlogSkeleton";
import CommentTextEditor from "./Component/CommentTextEditor";
import SingleBlogCommentList from "./Component/SingleBlogCommentList";
import ProfileCard from "../Components/ProfileCard";
import { useSelector } from "react-redux";
import Modal from "../../../components/Common/Modal/Modal";
import { useModal } from "../../../hook/useModal";

import { useEffect } from "react";
import LatestTopic from "../../Home/component/latestTopic";
import UnauthorizedCard from "../../../components/Fallbacks/UnauthorizedCard/UnauthorizedCard";

const SingleBlog = () => {
  //state

  // hook
  const { slug } = useParams();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { isOpen, openModal, modalRef, closeModal } = useModal();
  const location = useLocation();
  const navigate = useNavigate();

  //API Call for single blog

  const { isLoading, data: singleBlogData } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getSingleBlog(slug),
  });
  useEffect(() => {
    if (!isAuthenticated && location?.state?.showLogin) {
      openModal();
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="flex gap-4">
        <Modal modalRef={modalRef} isOpen={isOpen}>
          <UnauthorizedCard closeModal={closeModal} />
        </Modal>

        <div className="w-24 ">
          <div className="sticky z-50 flex flex-col items-center justify-center gap-6 top-14 h-96">
            <div>
              <SingleBlogReaction
                openModal={openModal}
                blogId={singleBlogData?.slug}
              />
            </div>

            <SingleBlogComments
              openModal={openModal}
              slug={singleBlogData?.slug}
            />
            <div className="size-10">
              <Bookmark
                blogId={singleBlogData?._id}
                blogSlug={singleBlogData?.slug}
              />
            </div>
          </div>
        </div>

        <div className="w-full my-4 border rounded-md shadow-md border-secondary bg-secondary/30">
          {singleBlogData?.coverImage && (
            <img
              src={singleBlogData?.coverImage}
              alt="cover-image"
              className="object-cover w-full h-96 rounded-t-md"
            />
          )}
          <div className="relative p-8">
            {/* edit Blog Button */}
            {user?._id === singleBlogData?.author._id && (
              <div className="absolute top-4 right-4">
                <button
                  onClick={() =>
                    navigate(`/edit/${singleBlogData?.slug}`, {
                      state: { value: "/edit" },
                    })
                  }
                  className="px-4 py-1 text-yellow-800 bg-yellow-100 border border-yellow-400 rounded-md"
                >
                  Edit
                </button>
              </div>
            )}

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
                    <div className="flex items-center gap-4 mb-8">
                      <img
                        src={singleBlogData?.author.profileImage}
                        alt=""
                        className="rounded-full size-10"
                      />
                      <div>
                        <p className="font-bold text-dark">
                          {singleBlogData?.author.name}
                        </p>
                        <p className="text-xs text-light">
                          Posted At{"  "}
                          <span>
                            {new Date(
                              singleBlogData?.createdAt
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "2-digit",
                            })}
                          </span>
                        </p>
                      </div>
                    </div>
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
                <CommentTextEditor
                  openModal={openModal}
                  blogSlug={singleBlogData?.slug}
                />
              </div>
              <SingleBlogCommentList blogSlug={singleBlogData?.slug} />
            </div>
          </div>
        </div>

        <div className=" my-4  w-[35rem]">
          <div className="sticky top-16">
            <div className="mb-8">
              <ProfileCard
                blogSlug={singleBlogData?.slug}
                openModal={openModal}
                user={singleBlogData?.author}
              />
            </div>

            <div>
              <p className="mb-4 text-lg font-semibold"># Latest Topics</p>
              <LatestTopic />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SingleBlog;
