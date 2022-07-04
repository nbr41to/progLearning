import { FC } from 'react';

type FooterProps = {};

export const Footer: FC<FooterProps> = () => {
  return (
    <footer className="absolute bottom-0 w-full bg-primary1 py-2 text-center">
      <small className="font-baloo text-white">© 2020 progLearning</small>
    </footer>
  );
};
