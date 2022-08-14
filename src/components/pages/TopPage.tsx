import type { FC } from 'react';

import { Badge, HoverCard, Tooltip } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import clsx from 'clsx';
import { useMemo } from 'react';

import { dateFormatted } from 'src/libs/dateFormatted';
import { getPastDays } from 'src/libs/getPastDays';
import { useStickies } from 'src/swr/hooks/useStickies';
import { useTasks } from 'src/swr/hooks/useTasks';

import { TasksBoard } from '../templates/TasksBoard';

const commitColorClass = (commit: number) => {
  if (commit === 1) return 'bg-green-200';
  if (commit === 2) return 'bg-green-300';
  if (commit === 3) return 'bg-green-400';
  if (commit === 4) return 'bg-green-500';
  if (commit === 5) return 'bg-green-600';
  if (commit >= 6) return 'bg-green-700';

  return '';
};

export const TopPage: FC = () => {
  const { tasks } = useTasks();
  const { stickies } = useStickies();

  const days = getPastDays();
  const commitments = useMemo(() => {
    const doneTasks = tasks.filter((task) => task.done);

    return days
      .map((day) => {
        const formattedDay = dateFormatted({ date: day, format: 'YYYY-MM-DD' });
        const dayTasks = doneTasks.filter(
          (doneTask) =>
            dateFormatted({
              date: doneTask.updatedAt,
              format: 'YYYY-MM-DD',
            }) === formattedDay
        );
        const daySticky = stickies.filter(
          (sticky) =>
            dateFormatted({ date: sticky.updatedAt, format: 'YYYY-MM-DD' }) ===
            formattedDay
        );

        return {
          dayLabel: formattedDay,
          commit: dayTasks.length + daySticky.length,
          contents: [...dayTasks, ...daySticky],
        };
      })
      .reverse();
  }, [tasks]);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          showNotification({
            title: 'Default notification',
            message: 'Hey there, your code is awesome! 🤥',
            autoClose: 3000,
          });
        }}
      >
        noti
      </button>

      <h2>草</h2>
      <div className="row-end-7 grid w-fit grid-flow-col grid-rows-[repeat(7,minmax(0,1fr))] gap-1">
        {commitments.map((commit) => {
          return (
            <HoverCard
              key={commit.dayLabel}
              width={280}
              shadow="md"
              position="top"
              radius="md"
              offset={12}
            >
              <HoverCard.Target>
                <div
                  className={clsx(
                    'h-4 w-4 cursor-pointer rounded border',
                    commitColorClass(commit.commit)
                  )}
                />
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <div>
                  <div>{commit.dayLabel}</div>
                  {commit.contents.map((content) => {
                    if ('type' in content) {
                      return <div key={content.id}>{content.content}</div>;
                    }

                    return <div key={content.id}>{content.title}</div>;
                  })}
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-4 p-8">
        {stickies.map((sticky) => (
          <Tooltip key={sticky.id} label={sticky.user.displayName}>
            <Badge className="p-6 text-lg">{sticky.title}</Badge>
          </Tooltip>
        ))}
      </div>

      <TasksBoard />
    </div>
  );
};
