import type { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { signUpWithGoogle } from 'src/libs/frontend/signUp';

import { MenuItem } from './MenuItem';

export const Header: FC = () => {
  return (
    <header className="fixed top-0 flex w-screen items-center gap-6 px-4 shadow backdrop-blur">
      {/* Logo */}
      <Link href="/">
        <a className="flex cursor-pointer items-center justify-center gap-2 rounded py-3 hover:drop-shadow-md">
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
        </a>
      </Link>

      {/* Menu */}
      <nav>
        <ul className="flex gap-4 pt-1 font-baloo text-lg">
          <MenuItem label="About" href="/about" />
          <MenuItem label="Usage" href="/usage" />
          <MenuItem label="Lessons" href="/lessons" />
          <MenuItem label="Commit" href="/commit" />
          <MenuItem label="Setting" href="/setting" />
        </ul>
      </nav>

      {/* Sign up */}
      <div className="ml-auto">
        <button
          type="button"
          className="rounded-full py-2 px-3 font-baloo tracking-wider hover:shadow"
          onClick={signUpWithGoogle}
        >
          Sign up
        </button>
      </div>
    </header>
  );
};
