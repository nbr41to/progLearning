import { FC } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

type LayoutProps = {};

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-[1440px] px-8 py-6">{children}</main>
      <Footer />
    </div>
  );
};
