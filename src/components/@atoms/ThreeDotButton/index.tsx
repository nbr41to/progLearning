import clsx from 'clsx';
import { FC } from 'react';

type Props = JSX.IntrinsicElements['button'] & {
  className?: string;
};

export const ThreeDotButton: FC<Props> = ({ className, ...rest }) => {
  return (
    <button
      className={clsx(
        className,
        'flex h-6 w-10 cursor-pointer items-center justify-center gap-1 rounded-full transition-colors hover:bg-gray-200',
      )}
      {...rest}
    >
      <span className="block h-[3px] w-[3px] rounded-full bg-black"></span>
      <span className="block h-[3px] w-[3px] rounded-full bg-black"></span>
      <span className="block h-[3px] w-[3px] rounded-full bg-black"></span>
    </button>
  );
};
