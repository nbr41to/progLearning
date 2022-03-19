import { VFC } from "react";

type FooterProps = {};

export const Footer: VFC<FooterProps> = () => {
  return (
    <footer className="absolute bottom-0 w-full bg-primary1 py-2 text-center font-bold text-white">
      <small>© 2020 progLearning</small>
    </footer>
  );
};
