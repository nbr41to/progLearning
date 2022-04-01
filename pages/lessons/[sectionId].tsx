import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import {
  getCategories,
  getSectionContentById,
  getSections,
} from "notion/lessons";
import { SWRConfig } from "swr";

import { SectionPage } from "@/components/@pages/SectionPage";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { sectionId } = params || {};
  const _sectionId = typeof sectionId === "string" ? sectionId : "";
  const section = await getSectionContentById(_sectionId);

  const categories = await getCategories();
  const sections = await getSections();
  return {
    props: {
      section,
      fallback: {
        "/lessons/sections": sections,
        "/lessons/categories": categories,
      },
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
  section: LessonSectionContent;
  fallback: {
    catagories: LessonCategory[];
    sections: LessonSection[];
  };
};

const Section: NextPage<Props> = ({ section, fallback }) => {
  return (
    <>
      <Head>
        <title>Section | progLearning</title>
      </Head>
      <SWRConfig value={{ fallback }}>
        <SectionPage section={section} />
      </SWRConfig>
    </>
  );
};

export default Section;
