import React from "react";

const AllBLogShimmer = () => {
  return (
    <div className="space-y-4">
      {[...Array(5)].map(() => (
        <>
          <div className="w-full rounded-lg h-52 bg-light/30 animate-pulse"></div>
        </>
      ))}
    </div>
  );
};

export default AllBLogShimmer;
