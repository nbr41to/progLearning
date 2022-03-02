import Link from "next/link";
import { VFC } from "react";

type HeaderProps = {};

export const Header: VFC<HeaderProps> = () => {
  return (
    <header className="bg-teal-300">
      <div>
        <img src="" alt="" />
        <h1 className="text-4xl">progLearning</h1>
      </div>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/lessons">
              <a>Lessons</a>
            </Link>
          </li>
          <li>
            <Link href="/lessons/html-id">
              <a>html sections</a>
            </Link>
          </li>
          <li>
            <Link href="/lessons/html-id/section1-id">
              <a>html section1</a>
            </Link>
          </li>
          <li>
            <Link href="/lessons/css-id">
              <a>css sections</a>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <a>ログイン</a>
            </Link>
          </li>
          <li>
            <Link href="/user">
              <a>マイページ</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
