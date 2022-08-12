import '../styles/globals.css';
import '../styles/mantineBase.css';

import type { SpotlightAction } from '@mantine/spotlight';
import type { AppProps } from 'next/app';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider, openModal, closeAllModals } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { SpotlightProvider } from '@mantine/spotlight';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { BsSearch, BsSticky, BsCheckSquare } from 'react-icons/bs';
import { FaKeyboard } from 'react-icons/fa';

import { PostSticky } from '@/components/templates/PostSticky';
import { PostTask } from '@/components/templates/PostTask';

import { Layout } from 'src/components/@layout';
import { useAuth } from 'src/swr/hooks/useAuth';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  useAuth();

  const searchMenuList: SpotlightAction[] = useMemo(
    () => [
      {
        title: 'Home',
        description: 'Get to home page',
        onTrigger: () => router.push('/'),
        icon: <BsSticky size={20} />,
      },
      {
        title: 'Post Sticky',
        description: 'なにかのきっかけになればとキーワードを登録します',
        onTrigger: () =>
          openModal({
            title: 'Post Sticky',
            children: <PostSticky onClose={closeAllModals} />,
          }),
        icon: <BsSticky size={20} />,
      },
      {
        title: 'Post Task',
        description: '今日のタスクを登録します',
        onTrigger: () =>
          openModal({
            title: "Post Today's Task",
            children: <PostTask onClose={closeAllModals} />,
          }),
        icon: <BsCheckSquare size={20} />,
      },
      {
        title: 'Raid Battle',
        description: 'みんなで力を合わせてBOSSを倒します',
        onTrigger: () => router.push('/battle'),
        icon: <BsCheckSquare size={20} />,
      },
      {
        title: 'MyPage',
        description: 'プロフィールの編集やタスクの確認ができます',
        onTrigger: () => router.push('/battle'),
        icon: <FaKeyboard size={20} />,
      },
    ],
    []
  );

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

      <MantineProvider withNormalizeCSS withGlobalStyles>
        <SpotlightProvider
          searchIcon={<BsSearch />}
          searchPlaceholder="Search Menu"
          nothingFoundMessage="Nothing found..."
          highlightQuery
          actions={searchMenuList}
          shortcut={['mod + K', 'mod + P']}
          radius="md"
          transition="scale-y"
        >
          <ModalsProvider>
            <NotificationsProvider position="top-center">
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </NotificationsProvider>
          </ModalsProvider>
        </SpotlightProvider>
      </MantineProvider>
    </>
  );
};

export default MyApp;
