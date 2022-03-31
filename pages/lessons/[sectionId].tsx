import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { getSectionContentById, getSections } from "notion/lessons";
import { SectionContentPage } from "src/components/@pages/SectionContentPage";

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
  console.log("section", section);

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
