import { VFC } from "react";

type Props = JSX.IntrinsicElements["label"] & {
  label: string;
};

export const Label: VFC<Props> = ({ label, ...rest }) => {
  return (
    <label className="cursor-pointer font-bold" {...rest}>
      {label}
    </label>
  );
};
