import { VFC } from "react";

type ButtonProps = {
  label: string;
  onClick: () => void;
};

export const Button: VFC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
