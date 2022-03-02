import { FC } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

type LayoutProps = {};

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-full">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
