import clsx from "clsx";
import { InputHTMLAttributes, VFC } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {};

export const Input: VFC<Props> = ({ className, ...rest }) => {
  return (
    <input
      className={clsx(
        className,
        "w-full rounded border border-slate-600 py-1 px-3 tracking-wider outline-primary2"
      )}
      {...rest}
    />
  );
};
