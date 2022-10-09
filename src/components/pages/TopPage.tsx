import type { FC } from 'react';

import Link from 'next/link';

import { dateFormatted } from 'src/libs/dateFormatted';
import { useStickies } from 'src/libs/hooks/apiHooks/useStickies';

import { GrassCalendarBoard } from '../templates/GrassCalendarBoard';
import { TasksBoard } from '../templates/TasksBoard';
import { StickyCard } from '../ui/StickyCard';

export const TopPage: FC = () => {
  const { stickies } = useStickies();

  return (
    <div className="space-y-8">
      <div className="text-3xl">
        {dateFormatted({ date: new Date(), format: 'YYYY年MM月DD日' })}
      </div>

      <GrassCalendarBoard />

      {/* Stickies */}
      <div>
        <h2 className="text-2xl font-bold">みんなのStickies</h2>
        <div className="flex flex-wrap gap-4">
          {stickies.map((sticky) => (
            <StickyCard key={sticky.id} sticky={sticky} />
          ))}
        </div>
      </div>

      {/* Tasks */}
      <div>
        <h2 className="text-2xl font-bold">あなたのTasks</h2>
        <TasksBoard />
      </div>

      <div className="m-16 text-center">
        <Link href="/battle">
          <a className="mx-auto flex h-44 w-44 items-center justify-center rounded-full bg-secondary2 text-xl font-bold text-white shadow hover:brightness-95">
            レイドバトルへ
          </a>
        </Link>
      </div>
    </div>
  );
};
