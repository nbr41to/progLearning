import type { FC } from 'react';
import type { StickiesWithDisplayName, Task } from 'src/types';

import { Checkbox, HoverCard, Loader } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import clsx from 'clsx';
import { useMemo, useEffect, useState } from 'react';

import { dateFormatted } from 'src/libs/dateFormatted';
import { getStickies } from 'src/libs/frontend/prisma/sticky';
import { updateTaskDone } from 'src/libs/frontend/prisma/task';
import { getPastDays } from 'src/libs/getPastDays';
import { useTasks } from 'src/swr/hooks/useTasks';

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
  const [stickies, setStickies] = useState<StickiesWithDisplayName[]>([]);
  const { tasks, refetch: refetchTasks } = useTasks();

  const todayTasks = useMemo(
    () =>
      tasks.filter((task) =>
        task.current
          ? true
          : dateFormatted({ date: task.createdAt, format: 'YYYY-MM-DD' }) ===
            dateFormatted({ date: new Date(), format: 'YYYY-MM-DD' })
      ),
    [tasks]
  );

  const otherTasks = useMemo(
    () =>
      tasks.filter((task) =>
        task.current
          ? false
          : dateFormatted({ date: task.createdAt, format: 'YYYY-MM-DD' }) !==
            dateFormatted({ date: new Date(), format: 'YYYY-MM-DD' })
      ),
    [tasks]
  );

  const days = getPastDays();
  const commitments = useMemo(() => {
    const doneTasks = tasks.filter((task) => task.done);
    // const stickiesDays = stickies.map((sticky) => sticky.updatedAt);

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

  useEffect(() => {
    (async () => {
      const response = await getStickies();
      setStickies(response);
    })();
  }, []);

  const toggleTask = async (task: Task) => {
    if (!task.done) {
      await updateTaskDone(task.id);
      await refetchTasks();
    }
  };

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
      <div>
        {stickies.map((sticky) => (
          <div key={sticky.id}>
            <div>
              {sticky.title}[{sticky.user.displayName}]
            </div>
          </div>
        ))}
      </div>
      <Loader size={18} />
      <h2>今日のTasks</h2>
      <div>
        {todayTasks.map((task) => (
          <Checkbox
            key={task.id}
            checked={task.done}
            label={task.content}
            disabled
          />
        ))}
      </div>

      <h2>今までのTasks</h2>
      <div>
        {otherTasks.map((task) => (
          <Checkbox
            key={task.id}
            checked={task.done}
            label={task.content}
            onChange={() => toggleTask(task)}
          />
        ))}
      </div>
    </div>
  );
};
