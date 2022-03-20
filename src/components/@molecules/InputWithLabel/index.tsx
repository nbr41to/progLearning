import { ChangeEvent, VFC } from "react";
import { Input } from "src/components/@atoms/Input";
import { Label } from "src/components/@atoms/Label";

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const InputWithLabel: VFC<Props> = ({ id, label, value, onChange }) => {
  return (
    <div>
      <Label htmlFor={id} label={label} />
      <Input id={id} type="text" value={value} onChange={onChange} />
    </div>
  );
};
