import type { FC } from 'react';

import { Kbd } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';

import { signUpWithGoogle } from 'src/libs/frontend/signUp';
import { useAuth } from 'src/swr/hooks/useAuth';

import { MenuItem } from './MenuItem';

export const Header: FC = () => {
  const user = useAuth();

  return (
    <header className="fixed top-0 z-20 flex w-screen items-center gap-6 px-4 shadow backdrop-blur">
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
          <MenuItem label="Usage" href="/usage" />
          {/* Authorized */}
          {user && (
            <>
              <MenuItem label="Battle" href="/battle" />
              <MenuItem label="MyPage" href="/my-page" />
            </>
          )}
          {/* <MenuItem label="About" href="/about" />
          <MenuItem label="Lessons" href="/lessons" />
          <MenuItem label="Commit" href="/commit" />
          <MenuItem label="Setting" href="/setting" /> */}
        </ul>
      </nav>

      {/* Sign up */}
      {user ? (
        <div className="ml-auto text-black">
          <Link href="/my-page">
            <a className="cursor-pointer">
              <FaUserCircle size={28} />
            </a>
          </Link>
          {/* <Avatar radius="xl" /> */}
        </div>
      ) : (
        <div className="ml-auto">
          <button
            type="button"
            className="rounded-full py-2 px-3 font-baloo tracking-wider hover:shadow"
            onClick={signUpWithGoogle}
          >
            Sign up
          </button>
        </div>
      )}

      {user && (
        <div className="absolute right-4 -bottom-16 text-right">
          <div className="rounded-full border bg-primary1 px-4 py-3 font-bold text-white">
            <span>search in menu: </span>
            <span>
              <Kbd>⌘</Kbd> + <Kbd>K</Kbd> or <Kbd>⌘</Kbd> + <Kbd>P</Kbd>
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
