import '../styles/globals.css';

import type { AppProps } from 'next/app';

import { ModalsProvider } from '@mantine/modals';
import Head from 'next/head';

import { Layout } from 'src/components/@layout';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        {/* Favicon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="mask-icon" href="/favicon.png" color="#000000" />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-config" content="/favicon.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <ModalsProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ModalsProvider>
    </>
  );
};

export default MyApp;
