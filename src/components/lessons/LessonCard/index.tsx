import { VFC } from "react";

type Props = {};

export const LessonCard: VFC<Props> = () => {
  return (
    <div className="h-60 w-60 cursor-pointer rounded bg-slate-600 transition-all duration-300 hover:scale-105 hover:animate-pulse"></div>
  );
};
