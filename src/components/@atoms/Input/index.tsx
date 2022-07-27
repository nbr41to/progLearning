import clsx from 'clsx';
import type { FC, InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {};

export const Input: FC<Props> = ({ className, ...rest }) => {
  return (
    <input
      className={clsx(
        className,
        'w-full rounded border border-slate-600 py-1 px-3 tracking-wider outline-primary2'
      )}
      {...rest}
    />
  );
};
