import React from "react";
import useReaction from "../../../hook/useReaction";

const Reaction = ({ blogSlug }) => {
  const [reaction] = useReaction(blogSlug);

  const { clap, like, explodingHead } = reaction;

  const totalReaction = (clap ?? 0) + (like ?? 0) + (explodingHead ?? 0);

  return (
    <div className="px-2 py-2 rounded-sm hover:bg-secondary/40 w-fit">
      {totalReaction > 0 ? (
        <div className="flex items-center gap-4">
          <div className="flex items-center text-sm ">
            {clap > 0 && (
              <span className="p-1 border border-white rounded-full shadow-sm bg-secondary/40">
                👏
              </span>
            )}
            {like > 0 && (
              <span className="p-1 -ml-1 border border-white rounded-full shadow-sm bg-secondary/40">
                💖
              </span>
            )}{" "}
            {explodingHead > 0 && (
              <span className="p-1 -ml-1 border border-white rounded-full shadow-sm bg-secondary/40">
                🤯
              </span>
            )}
          </div>
          <div className="text-sm">
            {totalReaction} {totalReaction === 1 ? "reaction" : "reactions"}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 px-2 py-2 rounded-sm w-fit">
          <span className="text-sm">Add Reaction</span>
        </div>
      )}
    </div>
  );
};

export default Reaction;
