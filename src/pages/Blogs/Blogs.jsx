import { useNavigate } from "react-router-dom";
import Card from "../Blogs/Components/Card";
import useGetBlogs from "../../hook/useGetBlogs";
import { useSearch } from "../../context/searchContext/searchHook";
import AllBLogShimmer from "../../components/Fallbacks/Shimmer/AllBLogShimmer";
const Blogs = () => {
  // const [isBookmarked, toggleBookmark] = useBookmark();

  const { query } = useSearch();
  const { allBlogs, searchedBlogs, allBlogsLoading, searchedBlogLoading } =
    useGetBlogs(query);
  const navigate = useNavigate();

  if (allBlogsLoading || searchedBlogLoading) {
    return <AllBLogShimmer />;
  }

  return (
    <>
      <div className="space-y-8">
        {searchedBlogs ? (
          <>
            {searchedBlogs.length < 1 ? (
              <>
                <div className="flex flex-col items-center gap-4 mt-8 text-2xl font-semibold text-center text-light">
                  Blog Not Found
                  <button
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-2 text-base w-fit btn-tertiary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                    Reload
                  </button>
                </div>
              </>
            ) : (
              <>
                {searchedBlogs?.map((blog) => (
                  <div
                    className="w-full"
                    key={blog._id}
                    onClick={() => navigate(`/blog/${blog.slug}`)}
                  >
                    <Card blog={blog} />
                  </div>
                ))}
              </>
            )}
          </>
        ) : (
          <>
            {allBlogs?.map((blog) => (
              <div
                className="w-full"
                key={blog._id}
                onClick={() => navigate(`/blog/${blog.slug}`)}
              >
                <Card blog={blog} />
              </div>
            ))}
          </>
        )}

        {/* {allBlogs?.map((blog) => (
          <div
            className="w-full"
            key={blog._id}
            onClick={() => navigate(`/blog/${blog.slug}`)}
          >
            <Card blog={blog} />
          </div>
        ))} */}
      </div>
    </>
  );
};

export default Blogs;
