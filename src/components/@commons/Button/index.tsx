import { HTMLAttributes, VFC } from "react";
import clsx from "clsx";

type Props = HTMLAttributes<HTMLButtonElement> & {
  className?: string;
  label: string;
  outline?: boolean;
  rounded?: boolean;
};

export const Button: VFC<Props> = ({
  className,
  label,
  outline,
  rounded,
  ...rest
}) => {
  const defaultClassName =
    "py-1 px-4 text-white bg-primary2 border-2 border-primary2 rounded font-bold";
  const outlineClassName =
    "py-1 px-4 text-primary2 border-2 border-primary2 rounded font-bold";

  return (
    <button
      className={clsx(
        className,
        outline ? outlineClassName : defaultClassName,
        rounded && "rounded-full"
      )}
      {...rest}
    >
      {label}
    </button>
  );
};
