import type { FC, ReactNode } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';

type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-background pt-20 pb-10">
      <Header />
      <main className="mx-auto max-w-[1440px] px-8 py-6">{children}</main>
      <Footer />
    </div>
  );
};
