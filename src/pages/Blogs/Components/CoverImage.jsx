import React from "react";

const CoverImage = ({ coverImage, alt }) => {
  return (
    <div>
      <img className="object-cover h-64 " src={coverImage} alt={alt} />
    </div>
  );
};

export default CoverImage;
