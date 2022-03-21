import { VFC } from "react";

import { LessonCard } from "../lessons/LessonCard";

type LessonsPageProps = {};

export const LessonsPage: VFC<LessonsPageProps> = () => {
  return (
    <div>
      <h1>Lessons</h1>
      <div>教材一覧</div>
      <p>クリックすると詳しく</p>
      <div className="flex flex-wrap gap-4">
        <LessonCard />
        <LessonCard />
        <LessonCard />
        <LessonCard />
        <LessonCard />
        <LessonCard />
        <LessonCard />
        <LessonCard />
        <LessonCard />
        <LessonCard />
        <LessonCard />
        <LessonCard />
      </div>
    </div>
  );
};
