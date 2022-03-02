import { VFC } from "react";

type ButtonProps = {
  label: string;
  onClick: () => void;
};

export const Button: VFC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
