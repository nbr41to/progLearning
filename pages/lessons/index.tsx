import type { NextPage } from "next";
import Head from "next/head";
import { getCategoriesWithDescription } from "notion/lessons";
import { LessonsPage } from "src/components/@pages/LessonsPage";

export const getStaticProps = async () => {
  const categories = await getCategoriesWithDescription();

  return {
    props: {
      categories,
    },
  };
};

type Props = {
  categories: Lesson[];
};

const Lessons: NextPage<Props> = ({ categories }) => {
  return (
    <>
      <Head>
        <title>Lessons | progLearning</title>
      </Head>
      <LessonsPage lessons={categories} />
    </>
  );
};

export default Lessons;
