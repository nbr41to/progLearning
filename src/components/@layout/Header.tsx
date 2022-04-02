import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { VFC } from "react";

import { Button } from "../@atoms/Button";

type HeaderProps = {};

export const Header: VFC<HeaderProps> = () => {
  const router = useRouter();

  return (
    <header className="fixed top-0 flex w-screen items-center gap-6 bg-primary1 px-4">
      {/* Logo */}
      <div
        className="h-20 w-60 cursor-pointer rounded p-2"
        onClick={() => router.push("/")}
      >
        <div className="relative h-full w-full">
          <Image
            className="rounded-md"
            src="/logo_bg_white.png"
            layout="fill"
            objectFit="cover"
            alt="logo"
          />
        </div>
        <h1 className="hidden">progLearning</h1>
      </div>

      {/* Menu */}
      <nav>
        <ul className="flex gap-4 text-lg font-bold text-white">
          <li>
            <Link href="/lessons">
              <a>Lessons</a>
            </Link>
          </li>
          <li>
            <Link href="/commit">
              <a>Commit</a>
            </Link>
          </li>
          <li>
            <Link href="/user">
              <a>My page</a>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Sign up */}
      <div className="ml-auto">
        <Button
          className="shadow"
          label="Sign up"
          onClick={() => router.push("/login")}
        />
      </div>
    </header>
  );
};
