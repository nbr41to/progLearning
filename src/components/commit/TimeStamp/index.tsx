import type { FC } from 'react';
import { useState } from 'react';
import { LargeButton } from 'src/components/@atoms/LargeButton';
import { dateFormatted } from 'src/lib/utils/dateFormatted';

import { Timer } from './Timer';

export const TimeStamp: FC = () => {
  const [starting, setStarting] = useState(false);
  // const currentStamp = useCurrentStackingTime();
  // const total = useTotalStackingTimes();

  // const toggleCommit = async () => {
  //   await createStackingTime();
  //   window.location.reload();
  // };

  return (
    <div>
      <div className="flex items-center justify-center gap-12">
        <div>
          <h2>学習タイムスタンプ</h2>
          <p>始めたことをTweet</p>
          <p>会員はSlackに通知</p>
          <p>タイムスタンプの修正</p>
        </div>

        <div className="">
          <LargeButton
            className={starting ? 'bg-gray-400' : 'bg-secondary2'}
            onClick={() => setStarting(!starting)}
            label={starting ? '終わる\nor\n休憩' : '始める'}
          />
        </div>
      </div>

      {starting && (
        <div className="text-center">
          <div className="my-4">
            <Timer start={new Date()} />
          </div>
          <div>開始時間：{dateFormatted({ date: new Date() })}</div>
        </div>
      )}
    </div>
  );
};
