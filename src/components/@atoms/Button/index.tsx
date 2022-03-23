import clsx from "clsx";
import { VFC } from "react";

type Props = JSX.IntrinsicElements["button"] & {
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
  const defaultClassName = "text-white bg-primary2";
  const outlineClassName = "text-primary2";

  return (
    <button
      className={clsx(
        className,
        "cursor-pointer rounded border-2 border-primary2 py-1 px-4 font-bold",
        outline ? outlineClassName : defaultClassName,
        rounded && "rounded-full"
      )}
      {...rest}
    >
      {label}
    </button>
  );
};
