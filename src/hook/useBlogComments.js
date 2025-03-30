import { useMutation, useQuery } from "@tanstack/react-query";
import { addComment, getComments } from "../api/CommentApi/CommentApi";

const useBlogComment = (blogSlug) => {
  const { data, refetch } = useQuery({
    queryKey: ["comments"],
    queryFn: () => getComments(blogSlug),
    enabled: !!blogSlug,
  });

  const { isPending, mutate, isError } = useMutation({
    mutationFn: (data) => addComment(blogSlug, data),
    onSuccess: () => {
      refetch();
    },
  });

  return { data, mutate, isPending, isError };
};
export default useBlogComment;
