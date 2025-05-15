import { useQuery } from "@tanstack/react-query";
import { getUserBlogs } from "../api/BlogApi/BlogApi";

export const useUserBlogs = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Users Blogs"],
    queryFn: getUserBlogs,
  });

  return { data, isLoading, isError };
};
