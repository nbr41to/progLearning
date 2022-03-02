import { VFC } from "react";

type FooterProps = {};

export const Footer: VFC<FooterProps> = () => {
  return (
    <footer className="absolute bottom-0 w-full bg-teal-300">
      <div>サイトマップだよ</div>
      <div>Copyright progLearning</div>
    </footer>
  );
};
