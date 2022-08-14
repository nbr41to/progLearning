import type { FC } from 'react';

import { useMemo } from 'react';

import { GrassCalendar } from '@/components/ui/GrassCalendar';

import { dateFormatted } from 'src/libs/dateFormatted';
import { getPastDays } from 'src/libs/getPastDays';
import { useStickies } from 'src/swr/hooks/useStickies';
import { useTasks } from 'src/swr/hooks/useTasks';

export const GrassCalendarBoard: FC = () => {
  const { stickies } = useStickies();
  const { tasks } = useTasks();

  const days = getPastDays();

  const commitments = useMemo(() => {
    const doneTasks = tasks.filter((task) => task.done);

    return days
      .map((day) => {
        const formattedDate = dateFormatted({
          date: day,
          format: 'YYYY-MM-DD',
        }); // 日付の形式を揃える

        /* 該当日の項目を探す */
        const dayTasks = doneTasks.filter((doneTask) => {
          const formattedDoneTaskDate = dateFormatted({
            date: doneTask.updatedAt,
            format: 'YYYY-MM-DD',
          }); // 日付の形式を揃える

          return formattedDoneTaskDate === formattedDate; // 照合
        });
        /* 該当日の項目を探す */
        const daySticky = stickies.filter((sticky) => {
          const formattedStickyDate = dateFormatted({
            date: sticky.updatedAt,
            format: 'YYYY-MM-DD',
          }); // 日付の形式を揃える

          return formattedStickyDate === formattedDate; // 照合
        });

        return {
          dayLabel: formattedDate,
          contents: [...dayTasks, ...daySticky],
        };
      })
      .reverse();
  }, [stickies, tasks, days]);

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold">過去の積み上げ</h2>
      <GrassCalendar commitments={commitments} />
    </div>
  );
};
