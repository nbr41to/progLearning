import type { NextPage } from "next";
import Head from "next/head";
import { SectionContentPage } from "src/components/@pages/SectionContentPage";

const Section: NextPage = () => {
  return (
    <>
      <Head>
        <title>Section | progLearning</title>
      </Head>
      <SectionContentPage />
    </>
  );
};

export default Section;
