import type { NextPage } from 'next';
import Head from 'next/head';

import { GamePage } from '@/components/@pages/GamePage';

const Game: NextPage = () => {
  return (
    <>
      <Head>
        <title>Game | progLearning</title>
      </Head>
      <GamePage />
    </>
  );
};

export default Game;
