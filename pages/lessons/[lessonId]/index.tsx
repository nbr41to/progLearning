import type { NextPage } from "next";
import Head from "next/head";
import { SectionsPage } from "src/components/pages/SectionsPage";

const Sections: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sections | progLearning</title>
      </Head>
      <SectionsPage />
    </>
  );
};

export default Sections;
