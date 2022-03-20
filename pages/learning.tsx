import type { NextPage } from "next";
import Head from "next/head";
import { LearningPage } from "src/components/@pages/LearningPage";

const Learning: NextPage = () => {
  return (
    <>
      <Head>
        <title>Learning | progLearning</title>
      </Head>
      <LearningPage />
    </>
  );
};

export default Learning;
