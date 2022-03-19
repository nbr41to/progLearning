import type { NextPage } from "next";
import Head from "next/head";
import { TopPage } from "src/components/@pages/TopPage";

const Top: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | progLearning</title>
      </Head>
      <TopPage />
    </>
  );
};

export default Top;
