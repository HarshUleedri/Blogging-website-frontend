import { useQuery } from "@tanstack/react-query";
import { getAllblogs, getSearchedBlogs } from "../api/BlogApi/BlogApi";

const useGetBlogs = (query) => {
  const {
    data: allBlogs,
    isLoading: allBlogsLoading,
    isError: allBlogsError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllblogs,
  });

  const {
    data: searchedBlogs,
    isLoading: searchedBlogLoading,
    isError: searchedBlogError,
  } = useQuery({
    queryKey: ["searched-blogs", query],
    queryFn: () => getSearchedBlogs(query),
    enabled: !!query,
  });

  return {
    allBlogs,
    allBlogsLoading,
    allBlogsError,
    searchedBlogs,
    searchedBlogLoading,
    searchedBlogError,
  };
};

export default useGetBlogs;
