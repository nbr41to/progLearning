import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { Button } from '../@atoms/Button';
import { MenuItem } from './MenuItem';

type HeaderProps = {};

export const Header: FC<HeaderProps> = () => {
  const router = useRouter();
  const isLab = router.asPath.split('/')[1] === 'lab';

  return (
    <header className="fixed top-0 flex w-screen items-center gap-6 px-4 shadow backdrop-blur">
      {/* Logo */}
      {!isLab ? (
        <div
          className="flex cursor-pointer items-center justify-center gap-2 rounded py-3 hover:drop-shadow-md"
          onClick={() => router.push('/')}
        >
          <div className="relative h-10 w-10">
            <Image
              className="rounded-md"
              src="/logo_s.png"
              layout="fill"
              objectFit="cover"
              alt="logo"
            />
          </div>
          <h1 className="font-baloo text-2xl text-black">progLearning</h1>
        </div>
      ) : (
        <div
          className="flex cursor-pointer items-center justify-center gap-2 rounded py-3 hover:drop-shadow-md"
          onClick={() => router.push('/')}
        >
          <div className="relative h-10 w-10">
            <Image
              className="rounded-md"
              src="/logo_lab_s.png"
              layout="fill"
              objectFit="cover"
              alt="logo"
            />
          </div>
          <h1 className="font-baloo text-2xl text-black">progLab</h1>
        </div>
      )}

      {/* Menu */}
      <nav>
        <ul className="flex gap-4 pt-1 font-baloo text-lg text-black">
          <MenuItem label="Lab(coming soon)" href="/lab/entrance" />
          <MenuItem label="About" href="/about" />
          <MenuItem label="Usage" href="/usage" />
          <MenuItem label="Lessons" href="/lessons" />
          <MenuItem label="Commit" href="/commit" />
          <MenuItem label="Setting" href="/setting" />
        </ul>
      </nav>

      {/* Sign up */}
      <div className="ml-auto">
        <Button
          className="font-baloo tracking-wider shadow"
          onClick={() => router.push('/login')}
        >
          Sign up
        </Button>
      </div>
    </header>
  );
};
