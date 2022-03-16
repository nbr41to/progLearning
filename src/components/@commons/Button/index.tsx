import { HTMLAttributes, VFC } from "react";

type Props = HTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export const Button: VFC<Props> = ({ label, ...rest }) => {
  return (
    <button
      className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      {...rest}
    >
      {label}
    </button>
  );
};
