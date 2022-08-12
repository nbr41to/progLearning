import type { NextPage } from 'next';

import Head from 'next/head';

import { BattlePage } from 'src/components/pages/BattlePage';

const Battle: NextPage = () => {
  return (
    <>
      <Head>
        <title>Battle | progLearning</title>
      </Head>
      <BattlePage />
    </>
  );
};

export default Battle;
