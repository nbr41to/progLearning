import { User } from "@prisma/client";
import { VFC } from "react";
import { useAuth } from "src/hooks/useAuth";
import useSWR from "swr";

import { TimeStamp } from "../Learning/TimeStamp";

type LearningPageProps = {};

export const LearningPage: VFC<LearningPageProps> = () => {
  const authState = useAuth();
  const fetcher = async (url: string): Promise<any | null> => {
    const response = await fetch(url, {
      method: "GET",
    });
    return response.json();
  };
  const { data: user, error } = useSWR<User>(
    `/api/v1/users/${authState.uid}`,
    fetcher
  );
  console.log(user);

  return (
    <div>
      <TimeStamp />
    </div>
  );
};
