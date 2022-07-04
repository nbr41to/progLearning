import { FC, useState } from 'react';
import { useCategories } from 'src/swr/hooks/useCategories';
import { useSections } from 'src/swr/hooks/useSections';

import { DescriptionModal } from '../lessons/DescriptionModal';
import { LessonCard } from '../lessons/LessonCard';
import { SideMenu } from '../lessons/SideMenu';

type LessonsPageProps = {};

export const LessonsPage: FC<LessonsPageProps> = () => {
  const { categories } = useCategories();
  const [selected, setSelected] = useState<LessonCategory | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = (lesson: LessonCategory) => {
    setSelected(lesson);
    setIsOpen(true);
  };

  const closeHandler = () => {
    setSelected(null);
    setIsOpen(false);
  };

  return (
    <div className="flex gap-10">
      <div className="min-w-[200px]">
        <SideMenu />
      </div>
      <div>
        <h1>Lessons</h1>
        <div>教材一覧</div>
        <p>クリックすると詳しく</p>
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <LessonCard
              key={category.id}
              lesson={category}
              onClick={() => clickHandler(category)}
            />
          ))}
        </div>
      </div>
      {isOpen && !(selected === null) && (
        <DescriptionModal lesson={selected} closeHandler={closeHandler} />
      )}
    </div>
  );
};
