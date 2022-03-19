import type { NextPage } from "next";
import Head from "next/head";
import { UserPage } from "src/components/@pages/UserPage";

const User: NextPage = () => {
  return (
    <>
      <Head>
        <title>User | progLearning</title>
      </Head>
      <UserPage />
    </>
  );
};

export default User;
