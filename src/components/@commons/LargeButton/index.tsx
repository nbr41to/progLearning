import { VFC } from "react";
import clsx from "clsx";

type Props = JSX.IntrinsicElements["button"] & {
  className?: string;
  label: string;
};

export const LargeButton: VFC<Props> = ({ className, label, ...rest }) => {
  return (
    <button
      className={clsx(
        "button-active-effect1 h-40 w-40 rounded-full bg-primary1 py-1 px-4 text-2xl font-bold text-white shadow",
        className,
        rest.disabled ? "cursor-not-allowed grayscale" : "button-hover-effect1"
      )}
      {...rest}
    >
      {label}
    </button>
  );
};
