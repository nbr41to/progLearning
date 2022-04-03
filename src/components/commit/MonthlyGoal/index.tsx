import { useState, VFC } from "react";

import { Button } from "@/components/@atoms/Button";
import { Input } from "@/components/@atoms/Input";
import { ThreeDotButton } from "@/components/@atoms/ThreeDotButton";

type Props = {};

/**
 * 今月の目標の編集ができるボード
 */
export const MonthlyGoal: VFC<Props> = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("ポイントカードを整理する");

  return (
    <div className="w-[600px] py-10">
      <h3>今月の目標</h3>
      <div className="mt-2 flex items-center justify-between gap-2">
        {!isEditing ? (
          <p className="text-xl font-bold">ポイントカードを整理する</p>
        ) : (
          <Input value={inputValue} />
        )}
        <Button outline={!isEditing} onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "保存" : "編集"}
        </Button>
      </div>
    </div>
  );
};
