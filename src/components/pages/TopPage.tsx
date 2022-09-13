import type { FC } from 'react';

import { Badge, Button, Tooltip } from '@mantine/core';
import Link from 'next/link';
import { useState, useMemo } from 'react';

import { dateFormatted } from 'src/libs/dateFormatted';
import { attend } from 'src/libs/frontend/prisma/user';
import { useStickies } from 'src/swr/hooks/useStickies';
import { useUser } from 'src/swr/hooks/useUser';

import { GrassCalendarBoard } from '../templates/GrassCalendarBoard';
import { TasksBoard } from '../templates/TasksBoard';

export const TopPage: FC = () => {
  const { stickies } = useStickies();
  const { user, refetch: refetchUser } = useUser();
  const [attendIsLoading, setAttendIsLoading] = useState(false);

  const isTodayAttended = useMemo(
    () =>
      user?.lastAttendedAt &&
      dateFormatted({ date: user.lastAttendedAt, format: 'YYYY-MM-DD' }) ===
        dateFormatted({ date: new Date(), format: 'YYYY-MM-DD' }),
    [user?.lastAttendedAt]
  );

  return (
    <div>
      <div className="flex items-end gap-6">
        <div className="text-3xl">
          {dateFormatted({ date: new Date(), format: 'YYYY年MM月DD日' })}
        </div>
        {user && (
          <Button
            size="xs"
            disabled={!!isTodayAttended}
            loading={attendIsLoading}
            onClick={async () => {
              try {
                setAttendIsLoading(true);
                await attend(user);
                await refetchUser();
              } catch (error) {
                /* Error */
              } finally {
                setAttendIsLoading(false);
              }
            }}
          >
            出席{isTodayAttended ? '済み' : ''}
          </Button>
        )}
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
