import type { FC } from 'react';

import { Board } from '../@atoms/Board';
import { MonthlyGoal } from '../commit/MonthlyGoal';
import { StackList } from '../commit/StackList';
import { TimeStamp } from '../commit/TimeStamp';
import { TodayGoal } from '../commit/TodayGoal';

type CommitPageProps = {};

export const CommitPage: FC<CommitPageProps> = () => {
  return (
    <div className="space-y-10">
      <div className="-mx-8 bg-white">
        <div className="mx-auto w-fit">
          <MonthlyGoal />
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Board className="w-fit p-10">
          <TodayGoal />
        </Board>
        <StackList />
      </div>

      <TimeStamp />
    </div>
  );
};
