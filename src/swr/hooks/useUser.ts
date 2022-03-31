import { useCallback } from "react";
import { useAuth } from "src/hooks/useAuth";
import useSWR from "swr";
import { UserWithProfile } from "types/users";

import { axiosGetFetcher } from "./axiosFetcher";

export const useUser = () => {
  const auth = useAuth();

  const { data, error, mutate } = useSWR<UserWithProfile | null>(
    `users/${auth.uid}`,
    axiosGetFetcher
  );

  const refetch = useCallback(() => mutate(), [mutate]);

  const isLoading = () => {
    if (typeof data === "undefined") return true;
    if (data === null || data) return false;
    return false;
  };

  return { user: data, isLoading: isLoading(), error, refetch };
};
