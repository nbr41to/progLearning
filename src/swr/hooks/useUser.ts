import { User } from "@prisma/client";
import { useAuth } from "src/hooks/useAuth";
import useSWR from "swr";

import { axiosGetFetcher } from "./axiosFetcher";

export const useUser = () => {
  const auth = useAuth();

  const { data, error } = useSWR<User | null>(
    `users/${auth.uid}`,
    axiosGetFetcher
  );

  const isLoading = () => {
    if (typeof data === "undefined") return true;
    if (data === null || data) return false;
    return false;
  };

  return { data, isLoading: isLoading(), error };
};
