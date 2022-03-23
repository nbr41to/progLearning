import { useState, VFC } from "react";

import { DescriptionModal } from "../lessons/DescriptionModal";
import { LessonCard } from "../lessons/LessonCard";

type LessonsPageProps = {
  lessons: Lesson[];
};

export const LessonsPage: VFC<LessonsPageProps> = ({ lessons }) => {
  const [selected, setSelected] = useState<Lesson | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = (lesson: Lesson) => {
    setSelected(lesson);
    setIsOpen(true);
  };

  const closeHandler = () => {
    setSelected(null);
    setIsOpen(false);
  };

  return (
    <div>
      <h1>Lessons</h1>
      <div>教材一覧</div>
      <p>クリックすると詳しく</p>
      <h2>カテゴリ別</h2>
      <div className="flex flex-wrap gap-4">
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            onClick={() => clickHandler(lesson)}
          />
        ))}
      </div>
      {isOpen && !(selected === null) && (
        <DescriptionModal lesson={selected} closeHandler={closeHandler} />
      )}
    </div>
  );
};
