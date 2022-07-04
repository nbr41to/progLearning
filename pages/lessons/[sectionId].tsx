import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import {
  getCategories,
  getSectionContentById,
  getSections,
} from 'notion/lessons';
import { SWRConfig } from 'swr';

import { SectionPage } from '@/components/@pages/SectionPage';

export const getStaticProps = async (
  context: GetStaticPropsContext<{ sectionId: string }>,
) => {
  const sectionId = context.params?.sectionId || '';

  const section = await getSectionContentById(sectionId);
  const categories = await getCategories();
  const sections = await getSections();

  return {
    props: {
      section,
      fallback: {
        '/lessons/categories': categories,
        '/lessons/sections': sections,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const sections = await getSections();
  const paths = sections.map(({ id }) => ({
    params: { sectionId: id || '' },
  }));
  return {
    paths,
    fallback: 'blocking', // HTMLを生成しない
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

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
