import type { FC } from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  label: string;
  href: string;
};

export const MenuItem: FC<Props> = ({ label, href }) => {
  const router = useRouter();
  const isActive = router.asPath.split('/')[1] === href.split('/')[1];

  return (
    <li
      className={clsx(
        'border-b-2 transition-all duration-300 hover:border-b-black hover:drop-shadow',
        isActive ? 'border-b-black' : 'border-b-white'
      )}
    >
      <Link href={href}>
        <a>{label}</a>
      </Link>
    </li>
  );
};
