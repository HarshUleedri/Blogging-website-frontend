import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getFollowers,
  getFollowings,
  toggleFollow,
} from "../api/UserData/UserData";

export const useUserFollow = ({
  fetchFollowers = false,
  fetchFollowings = false,
}) => {
  const queryClient = useQueryClient();
  const {
    data: userFollowersData,
    isLoading: userFollowersLoading,
    isError: userFollowersError,
  } = useQuery({
    queryKey: ["followers"],
    queryFn: getFollowers,
    enabled: fetchFollowers,
  });

  const {
    data: userFollowingsData,
    isLoading: userFollowingsLoading,
    isError: userFollowingsDataError,
  } = useQuery({
    queryKey: ["followings"],
    queryFn: getFollowings,
    enabled: fetchFollowings,
  });

  const { mutate, isPending: mutationPending } = useMutation({
    mutationFn: (data) => toggleFollow(data),
    onSuccess: () => {
      queryClient.invalidateQueries("followers");
      queryClient.invalidateQueries("followings");
    },
  });

  return {
    userFollowersData,
    userFollowersLoading,
    userFollowersError,
    userFollowingsData,
    userFollowingsLoading,
    userFollowingsDataError,
    mutate,
    mutationPending,
  };
};
