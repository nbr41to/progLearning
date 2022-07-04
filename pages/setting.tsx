import type { NextPage } from 'next';
import Head from 'next/head';
import { SettingPage } from 'src/components/@pages/SettingPage';

const Setting: NextPage = () => {
  return (
    <>
      <Head>
        <title>Setting | progLearning</title>
      </Head>
      <SettingPage />
    </>
  );
};

export default Setting;
