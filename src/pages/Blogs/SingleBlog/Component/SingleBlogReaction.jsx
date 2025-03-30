import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import {
  addReaction,
  getReaction,
} from "../../../../api/ReactionApi/ReactionApi";
import useReaction from "../../../../hook/useReaction";

const SingleBlogReaction = ({ blogId = "" }) => {
  //state
  const [onHover, setOnHover] = useState(false);
  // hook
  const hoverTimeoutRef = useRef();
  const [reaction, handleReaction] = useReaction(blogId);

  const { like, clap, explodingHead } = reaction;

  const arrayOfReaction = [
    { reactionType: "clap", icon: "👏", count: clap },
    { reactionType: "like", icon: "💖", count: like },
    { reactionType: "explodingHead", icon: "🤯", count: explodingHead },
  ];

  const totalReaction = clap + like + explodingHead;

  return (
    <div>
      <button
        onMouseEnter={() => {
          clearTimeout(hoverTimeoutRef.current);
          setOnHover(true);
        }}
        onMouseLeave={() => {
          hoverTimeoutRef.current = setTimeout(() => setOnHover(false), 1000);
        }}
        className="relative flex flex-col items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"e
          role="img"
          aria-hidden="true"
          fill="currentColor"
          className="text-light hover:text-red-600 size-8"
        >
          <path d="M19 14V17H22V19H18.999L19 22H17L16.999 19H14V17H17V14H19ZM20.243 4.75698C22.505 7.02498 22.583 10.637 20.479 12.992L19.059 11.574C20.39 10.05 20.32 7.65998 18.827 6.16998C17.324 4.67098 14.907 4.60698 13.337 6.01698L12.002 7.21498L10.666 6.01798C9.09103 4.60598 6.67503 4.66798 5.17203 6.17198C3.68203 7.66198 3.60703 10.047 4.98003 11.623L13.412 20.069L12 21.485L3.52003 12.993C1.41603 10.637 1.49503 7.01898 3.75603 4.75698C6.02103 2.49298 9.64403 2.41698 12 4.52898C14.349 2.41998 17.979 2.48998 20.242 4.75698H20.243Z"></path>
        </svg>
        <p className="text-base text-light">{totalReaction}</p>
        {onHover && (
          <>
            <div
              onMouseEnter={() => {
                clearTimeout(hoverTimeoutRef.current);
                setOnHover(true);
              }}
              className="absolute flex gap-4 p-2 ml-6 bg-white rounded shadow-md w-fit left-full"
            >
              {arrayOfReaction.map(({ reactionType, icon, count }, index) => (
                <div
                  onClick={() => {
                    handleReaction(reactionType);
                  }}
                  className="flex flex-col items-center gap-2 px-2 py-2 text-3xl rounded-md hover:bg-secondary"
                  key={index}
                >
                  <p>{icon}</p>
                  <p className="text-base text-light">{count}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </button>
    </div>
  );
};

export default SingleBlogReaction;
