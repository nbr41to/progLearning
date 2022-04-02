import type { NextPage } from "next";
import Head from "next/head";

import { CommitPage } from "@/components/@pages/CommitPage";

const Learning: NextPage = () => {
  return (
    <>
      <Head>
        <title>Learning | progLearning</title>
      </Head>
      <CommitPage />
    </>
  );
};

export default Learning;
