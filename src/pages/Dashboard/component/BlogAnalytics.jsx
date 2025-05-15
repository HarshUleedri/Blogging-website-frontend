import { useAllBlogComments } from "../../../hook/useAllBlogsComments";

const BlogAnalytics = ({ blogs }) => {
  //hooks
  const { allComments } = useAllBlogComments();

  //state

  // values
  const totalReaction = blogs.reduce(
    (acc, cur) => acc + cur.userReacted.length,
    0
  );
  const totalViews = blogs.reduce((acc, cur) => acc + cur.views, 0);

  const totalComments = allComments?.length;

  return (
    <div className="flex items-center gap-6 mb-6">
      <div className="w-1/3 p-6 text-left border rounded-md">
        <p className="mb-2 text-3xl font-bold">{totalReaction}</p>
        <p className="text-light ">Total post reactions</p>
      </div>
      <div className="w-1/3 p-6 text-left border rounded-md">
        <p className="mb-2 text-3xl font-bold">{totalComments || 0}</p>
        <p className="text-light ">Total post comments</p>
      </div>
      <div className="w-1/3 p-6 text-left border rounded-md">
        <p className="mb-2 text-3xl font-bold">{totalViews}</p>
        <p className="text-light ">Total post views</p>
      </div>
    </div>
  );
};

export default BlogAnalytics;
