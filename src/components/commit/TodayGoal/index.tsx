import { VFC } from "react";

import { Button } from "@/components/@atoms/Button";
import { Input } from "@/components/@atoms/Input";
import { ThreeDotButton } from "@/components/@atoms/ThreeDotButton";

type Props = {};

/**
 * 今日の目標TODOの追加と確認と編集ができるボード
 */
export const TodayGoal: VFC<Props> = () => {
  return (
    <div>
      <h3>今日の目標</h3>
      <div className="flex w-80 gap-2">
        <Input />
        <Button>追加</Button>
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <input type="checkbox" checked />
          <span>焼き肉を我慢する</span>
          <ThreeDotButton />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked />
          <span>焼き肉を我慢する</span>
          <ThreeDotButton />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked />
          <span>焼き肉を我慢する</span>
          <ThreeDotButton />
        </div>
      </div>
    </div>
  );
};
