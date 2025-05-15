import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { addReaction, getReaction } from "../api/ReactionApi/ReactionApi";

const useReaction = (slug) => {
  const [reaction, setReaction] = useState({});
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["reaction", slug],
    queryFn: () => getReaction(slug),
    enabled: !!slug,
  });

  useEffect(() => {
    if (data) setReaction(data);
  }, [data]);

  const { mutate } = useMutation({
    mutationFn: (reactionType) => addReaction(slug, reactionType),
    onSuccess: () => {
      // Only update UI after API response
      queryClient.invalidateQueries(["reaction", slug]);
    },
  });

  const handleReaction = (value) => {
    mutate(value);
  };

  return [reaction, handleReaction];
};

export default useReaction;
