import type { NextPage } from 'next';

import Head from 'next/head';

import { MyPage } from 'src/components/pages/MyPage';

const Battle: NextPage = () => {
  return (
    <>
      <Head>
        <title>My Page | progLearning</title>
      </Head>
      <MyPage />
    </>
  );
};

export default Battle;
