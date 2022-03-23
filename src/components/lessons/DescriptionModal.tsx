import { useRouter } from "next/router";
import { VFC } from "react";

import { Board } from "@/components/@atoms/Board";
import { Button } from "@/components/@atoms/Button";

type DescriptionModalProps = {
  lesson: Lesson;
  closeHandler: () => void;
};

export const DescriptionModal: VFC<DescriptionModalProps> = ({
  lesson,
  closeHandler,
}) => {
  const { id, name, description } = lesson;
  const router = useRouter();
  return (
    <div className="fixed top-0 left-0 z-30 flex h-screen w-screen items-center justify-center bg-black/50">
      <Board className="relative z-50 w-[800px] space-y-4 p-8">
        <h3 className="text-2xl">{name}</h3>
        <p className="">{description}</p>
        <div className="text-right">
          <Button
            label="これを学ぶ"
            onClick={() => router.push(`/lessons/${id}`)}
          />
        </div>
      </Board>
      <div
        className="fixed left-0 top-0 z-20 h-screen w-screen"
        onClick={closeHandler}
      ></div>
    </div>
  );
};
