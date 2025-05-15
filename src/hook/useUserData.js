import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData, updateUserData } from "../api/UserData/UserData";

export const useUserData = () => {
  //hook
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError: getUserError,
    data,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
  });

  const {
    isPending,
    mutate,
    isError: mutateError,
    isSuccess: mutationSuccess,
  } = useMutation({
    mutationFn: (data) => updateUserData(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["userData"]);
    },
  });

  return {
    isLoading,
    getUserError,
    mutateError,
    mutate,
    isPending,
    data,
    mutationSuccess,
  };
};
