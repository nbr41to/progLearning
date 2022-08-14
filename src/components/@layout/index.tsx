import type { FC, ReactNode } from 'react';

import { Kbd } from '@mantine/core';

import { useAuth } from 'src/swr/hooks/useAuth';

import { Footer } from './Footer';
import { Header } from './Header';

type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const user = useAuth();

  return (
    <div className="relative min-h-screen bg-background pt-20 pb-10">
      <Header />
      {user && (
        <div className="mx-4 text-right">
          <span>search in menu: </span>
          <span>
            <Kbd>⌘</Kbd> + <Kbd>K</Kbd> or <Kbd>⌘</Kbd> + <Kbd>P</Kbd>
          </span>
        </div>
      )}
      <main className="mx-auto max-w-[1440px] px-8 py-6">{children}</main>
      <Footer />
    </div>
  );
};
