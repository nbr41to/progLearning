import type { FC } from 'react';

import { Badge, Tooltip } from '@mantine/core';
import Link from 'next/link';

import { dateFormatted } from 'src/libs/dateFormatted';
import { useStickies } from 'src/swr/hooks/useStickies';

import { GrassCalendarBoard } from '../templates/GrassCalendarBoard';
import { TasksBoard } from '../templates/TasksBoard';

export const TopPage: FC = () => {
  const { stickies } = useStickies();

  return (
    <div>
      <div className="text-3xl">
        {dateFormatted({ date: new Date(), format: 'YYYY年MM月DD日' })}
      </div>

      <GrassCalendarBoard />

      <div className="flex flex-wrap gap-4 p-8">
        {stickies.map((sticky) => (
          <Tooltip key={sticky.id} label={sticky.user.displayName}>
            <Badge className="p-6 text-lg">{sticky.title}</Badge>
          </Tooltip>
        ))}
      </div>

      <TasksBoard />

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
