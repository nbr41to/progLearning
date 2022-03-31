import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { getSectionContentById, getSections } from "notion/lessons";

import { SectionPage } from "@/components/@pages/SectionPage";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { sectionId } = params || {};
  const _sectionId = typeof sectionId === "string" ? sectionId : "";
  const section = await getSectionContentById(_sectionId);
  return {
    props: {
      section,
    },
  };
};

type Params = {
  sectionId: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const sections = await getSections();
  const paths = sections.map(({ id }) => ({
    params: { sectionId: id || "" },
  }));
  return {
    paths,
    fallback: "blocking", // HTMLを生成しない
  };
};

type Props = {
  section: any; // TODO
};

const Section: NextPage<Props> = ({ section }) => {
  return (
    <>
      <Head>
        <title>Section | progLearning</title>
      </Head>
      <SectionPage />
    </>
  );
};

export default Section;
