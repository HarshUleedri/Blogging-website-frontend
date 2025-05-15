import DetailBlogCard from "./DetailBlogCard";

const DetailBlogsList = ({ blogs }) => {
  //hook

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold ">Post</h2>
        <div>Recently Created</div>
      </div>
      <div className="space-y-4">
        {blogs?.map((blog, index) => (
          <>
            <div key={index}>
              <DetailBlogCard blog={blog} />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default DetailBlogsList;
