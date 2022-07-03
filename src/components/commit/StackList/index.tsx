import { FC } from "react";

import { ThreeDotButton } from "@/components/@atoms/ThreeDotButton";

type Props = {};

/**
 * 持ち越したTODOの表示と編集
 */
export const StackList: FC<Props> = () => {
  return (
    <div className="p-8">
      <h3 className="text-lg">やるはずだったものたち😱</h3>
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
