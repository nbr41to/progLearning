import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { getCategories, getSections } from "notion/lessons";
import { LessonsPage } from "src/components/@pages/LessonsPage";
import { SWRConfig } from "swr";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const categories = await getCategories();
  const sections = await getSections();

  return {
    props: {
      fallback: {
        "/lessons/sections": sections,
        "/lessons/categories": categories,
      },
    },
  };
};

const Lessons: NextPage<Props> = ({ fallback }) => {
  return (
    <>
      <Head>
        <title>Lessons | progLearning</title>
      </Head>
      <SWRConfig value={{ fallback }}>
        <LessonsPage />
      </SWRConfig>
    </>
  );
};

export default Lessons;
