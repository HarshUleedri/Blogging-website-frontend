import { useState } from "react";
import { renderMarkdown } from "../../../../utils/markdownParser";
import CommentTextEditor from "./CommentTextEditor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCommentReaction } from "../../../../api/CommentApi/CommentApi";

// const renderNestedComments = (comments, blogSlug) => {
//   return comments.map((comment) => (
//     <div key={comment._id} className="pl-4 ml-8 border-l">
//       <CommentCard slug={blogSlug} comments={comment} />
//       {comment.replies?.length > 0 &&
//         renderNestedComments(comment.replies, blogSlug)}
//     </div>
//   ));
// };

const CommentCard = ({
  slug,
  comments: {
    _doc: {
      text,
      userId: { username, profileImage },
      _id,
      createdAt,
      reactions,
    },
    replies,
  },
  relpyImage = false,
}) => {
  //state
  const [isExpand, setIsExpand] = useState(true);
  const [isReply, setIsReply] = useState(false);

  //hook
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (data) => addCommentReaction(_id, data),
    onSuccess: (res) => {
      queryClient.invalidateQueries(["comments"]);

      setReaction(res.reactions);
    },
  });

  const handleReaction = async (reactionType) => {
    mutate(reactionType);
  };

  return (
    <div>
      <>
        {isExpand ? (
          <>
            <div className="flex items-start gap-4 mb-8">
              <div className="flex flex-col items-center gap-2">
                <img
                  src={
                    profileImage ||
                    "https://dummyimage.com/100x100/000/dedede&text=profileImage"
                  }
                  alt="profile-image"
                  className={`rounded-full ${
                    relpyImage ? "size-6" : "size-8"
                  } shrink-0`}
                />
                <div
                  onClick={() => setIsExpand(false)}
                  className="p-1 rounded hover:bg-secondary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4"
                  >
                    <path d="M5.79285 5.20718 12 11.4143 18.2071 5.20718 16.7928 3.79297 12 8.58586 7.20706 3.79297 5.79285 5.20718ZM18.2072 18.7928 12.0001 12.5857 5.793 18.7928 7.20721 20.207 12.0001 15.4141 16.793 20.207 18.2072 18.7928Z"></path>
                  </svg>
                </div>
              </div>

              <div className="flex flex-col w-full gap-1">
                <div className="p-4 border rounded-md border-secondary">
                  {/* header */}
                  <div className="flex items-center justify-between">
                    {/* username */}
                    <div className="flex items-center gap-4">
                      <p className="flex items-center gap-2 font-bold text-md">
                        {username}
                        <span className="rounded-full bg-light/50 size-1"></span>
                      </p>
                      <p className="p-1 text-sm rounded w-fit text-light">
                        {(() => {
                          const date = new Date(createdAt);
                          const monthNames = [
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec",
                          ];
                          const month = monthNames[date.getMonth()];
                          const day = date.getDate();
                          return `${month} ${day}`;
                        })()}
                      </p>
                    </div>
                    {/* mennu */}
                    <div className="p-1 rounded hover:bg-secondary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Comments */}
                  {text && (
                    <div
                      className="prose prose-lg prose-img:max-w-[300px] prose-img:mx-auto prose-img:w-full sm:prose-img:w-3/4 lg:prose-img:w-1/2 text-base py-4 break-words"
                      dangerouslySetInnerHTML={{
                        __html: renderMarkdown(text),
                      }}
                    />
                  )}
                </div>
                {/* like and Reply */}
                {isReply ? (
                  <>
                    <CommentTextEditor
                      blogSlug={slug}
                      parentId={_id}
                      dismiss={isReply}
                      setDismiss={setIsReply}
                      isFocus={true}
                    />
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleReaction("like")}
                        disabled={isPending}
                        className={`flex items-center gap-2 px-1 text-sm rounded hover:bg-secondary  text-light `}
                      >
                        {reactions?.like === 1 ? (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="text-red-700 size-4"
                            >
                              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                            </svg>
                          </>
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-4 text-dark"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                              />
                            </svg>
                          </>
                        )}
                        likes
                      </button>
                      <button
                        onClick={() => setIsReply(true)}
                        className="flex items-center gap-2 px-1 text-sm rounded hover:bg-secondary text-light"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4 text-dark"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                          />
                        </svg>
                        Reply
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            {replies?.length > 0 && (
              <div className="pl-4 ml-8 border-l">
                {replies.map((reply, index) => (
                  <CommentCard
                    key={index}
                    slug={slug}
                    comments={reply}
                    relpyImage={true}
                  />
                ))}
              </div>
            )}
            {/* {replies.length > 0 && renderNestedComments(replies, slug)} */}
          </>
        ) : (
          <>
            <div className="flex items-center gap-4 px-4 py-1 mb-2 bg-white rouneded-md">
              <div
                className="p-1 rounded hover:bg-secondary/50"
                onClick={() => setIsExpand(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4 text-light"
                >
                  <path d="M18.2072 9.0428 12.0001 2.83569 5.793 9.0428 7.20721 10.457 12.0001 5.66412 16.793 10.457 18.2072 9.0428ZM5.79285 14.9572 12 21.1643 18.2071 14.9572 16.7928 13.543 12 18.3359 7.20706 13.543 5.79285 14.9572Z"></path>
                </svg>
              </div>

              <div className="text-sm italic text-light">{username}</div>
              {replies.length > 0 && (
                <div className="text-sm text-light ">
                  + {replies.length} replies
                </div>
              )}
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default CommentCard;
