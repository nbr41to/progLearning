import { VFC } from "react";

type Props = JSX.IntrinsicElements["input"] & {};

export const Input: VFC<Props> = ({ ...rest }) => {
  return (
    <input
      className="w-full rounded border border-slate-600 py-1 px-3 tracking-wider outline-primary2"
      {...rest}
    />
  );
};
