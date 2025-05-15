import React from "react";

const AnalyticsHeaderSkeleton = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-1/3 py-2 text-center border rounded-md h-44 animate-pulse bg-secondary/50"></div>
      <div className="w-1/3 py-2 text-center border rounded-md h-44 animate-pulse bg-secondary/50"></div>
      <div className="w-1/3 py-2 text-center border rounded-md h-44 animate-pulse bg-secondary/50"></div>
    </div>
  );
};

export default AnalyticsHeaderSkeleton;
