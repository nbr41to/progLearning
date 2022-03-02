import type { NextPage } from "next";
import Head from "next/head";
import { LessonsPage } from "src/components/pages/LessonsPage";

const Lessons: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lessons | progLearning</title>
      </Head>
      <LessonsPage />
    </>
  );
};

export default Lessons;
