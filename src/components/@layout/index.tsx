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
      <main className="mx-auto min-h-[calc(100vh-200px)] max-w-[1440px] px-8 py-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};
