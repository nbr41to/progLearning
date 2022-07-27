import clsx from 'clsx';
import type { FC, ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
};

export const Board: FC<Props> = ({ className, children }) => {
  return (
    <div
      className={clsx(
        className,
        'relative rounded-none border-0 bg-slate-100 shadow sm:rounded-lg sm:border'
      )}
    >
      {children}
      <div>
        <div className="absolute top-3 left-3 h-2 w-2 rounded-full bg-gray-500" />
        <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-gray-500" />
        <div className="absolute bottom-3 left-3 h-2 w-2 rounded-full bg-gray-500" />
        <div className="absolute right-3 bottom-3 h-2 w-2 rounded-full bg-gray-500" />
      </div>
    </div>
  );
};
