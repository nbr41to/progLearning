import type { FC } from 'react';

import { useMemo } from 'react';

import { GrassCalendar } from '@/components/ui/GrassCalendar';

import { dateFormatted } from 'src/libs/dateFormatted';
import { getPastDays } from 'src/libs/getPastDays';
import { useCommits } from 'src/swr/hooks/useCommits';

export const GrassCalendarBoard: FC = () => {
  const { pixels } = useCommits();

  const days = getPastDays();

  const commitments = useMemo(() => {
    return days
      .map((day) => {
        const formattedDate = dateFormatted({
          date: day,
          format: 'YYYYMMDD',
        }); // 日付の形式を揃える

        /* 該当日の項目を探す */
        const commitDay = pixels.find((pixel) => {
          return pixel.date === formattedDate; // 照合
        });

        return {
          date: dateFormatted({
            date: day,
            format: 'YYYY/MM/DD',
          }),
          quantity: commitDay?.quantity || '0',
        };
      })
      .reverse();
  }, [days]);

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold">過去の積み上げ</h2>
      <GrassCalendar commitments={commitments} />
    </div>
  );
};
