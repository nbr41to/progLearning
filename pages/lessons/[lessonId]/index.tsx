import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { getCategories, getSections } from "notion/lessons";
import { SectionsPage } from "src/components/@pages/SectionsPage";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { lessonId } = params || {};
  const category = typeof lessonId === "string" ? lessonId : "";
  const sections = await getSections(category);

  return {
    props: {
      sections,
    },
  };
};

type Params = {
  lessonId: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const categories = await getCategories();
  const paths = categories.map(({ id }) => ({
    params: { lessonId: id || "" },
  }));

  return {
    paths,
    fallback: "blocking", // HTMLを生成しない
  };
};

type Props = {
  sections: any[];
};

const Sections: NextPage<Props> = ({ sections }) => {
  return (
    <>
      <Head>
        <title>Sections | progLearning</title>
      </Head>
      <SectionsPage sections={sections} />
    </>
  );
};

export default Sections;
