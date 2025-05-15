import { useQuery } from "@tanstack/react-query";
import { getCommentsOfAllBlogs } from "../api/CommentApi/CommentApi";

export const useAllBlogComments = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-blogs-comments"],
    queryFn: getCommentsOfAllBlogs,
  });

  const allBlogsComments = data?.comments;

  const allComments = allBlogsComments?.flat();

  return { allComments, isLoading, isError };
};
