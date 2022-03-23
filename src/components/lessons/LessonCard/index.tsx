import clsx from "clsx";
import { useState, VFC } from "react";
import { SiHtml5 } from "react-icons/si";

import { DescriptionModal } from "../DescriptionModal";

type Props = {
  lesson: Lesson;
  onClick: () => void;
};

const ConvertColorName = (color: string) => {
  if (color === "red") return "bg-red-400";
  if (color === "blue") return "bg-blue-500";
  if (color === "green") return "bg-green-500";
  if (color === "yellow") return "bg-yellow-400";
  if (color === "orange") return "bg-amber-500";
  if (color === "pink") return "bg-pink-400";
  if (color === "purple") return "bg-purple-500";
  if (color === "gray") return "bg-gray-600";
  if (color === "default") return "bg-gray-500";
  if (color === "brown") return "bg-orange-400";
  return "bg-slate-600";
};

export const LessonCard: VFC<Props> = ({ lesson, onClick }) => {
  return (
    <div
      className={clsx(
        ConvertColorName(lesson.color),
        "h-40 w-40 scale-105 cursor-pointer rounded transition-all duration-300"
        // 'flex flex-col items-center justify-center',
      )}
      onClick={onClick}
    >
      <h3 className="text-3xl font-bold text-white">{lesson.name}</h3>
      <SiHtml5 className="text-5xl text-white" />
    </div>
  );
};
