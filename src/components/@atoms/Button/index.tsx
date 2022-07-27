import clsx from 'clsx';
import type { FC } from 'react';

type Props = JSX.IntrinsicElements['button'] & {
  className?: string;
  outline?: boolean;
  rounded?: boolean;
};

export const Button: FC<Props> = ({
  className,
  children,
  outline,
  rounded,
  ...rest
}) => {
  const defaultClassName = 'text-white bg-primary1';
  const outlineClassName = 'text-primary2';

  return (
    <button
      className={clsx(
        className,
        'min-w-fit cursor-pointer rounded border-2 border-primary1 py-1 px-4 font-bold',
        outline ? outlineClassName : defaultClassName,
        rounded && 'rounded-full'
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
