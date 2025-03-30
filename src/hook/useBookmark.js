import {
  fetchBookmark,
  toggleBookmarkApi,
} from "../api/bookmarkApi/bookmarkApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useBookmark = () => {
  const queryClient = useQueryClient();
  const { data = [] } = useQuery({
    queryKey: ["Bookmarks"],
    queryFn: () => fetchBookmark(),
  });

  const isBookmarked = data || [];

  const toggleBookmark = async (blogSlug) => {
    await toggleBookmarkApi(blogSlug);
    queryClient.invalidateQueries(["Bookmarks"]);
  };

  return [isBookmarked, toggleBookmark];
};

export default useBookmark;
