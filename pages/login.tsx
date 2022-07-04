import type { NextPage } from 'next';
import Head from 'next/head';
import { LoginPage } from 'src/components/@pages/LoginPage';

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login | progLearning</title>
      </Head>
      <LoginPage />
    </>
  );
};

export default Login;
