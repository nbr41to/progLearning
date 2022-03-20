import { useState, VFC } from "react";
import { LargeButton } from "src/components/@atoms/LargeButton";
import { dateFormatted } from "src/lib/utils/dateFormatted";

import { Timer } from "./Timer";

export const TimeStamp: VFC = () => {
  const [starting, setStarting] = useState(false);
  // const currentStamp = useCurrentStackingTime();
  // const total = useTotalStackingTimes();

  // const toggleCommit = async () => {
  //   await createStackingTime();
  //   window.location.reload();
  // };

  return (
    <div className="space-y-4 text-center">
      <h1>Learning</h1>
      <h2>学習タイムスタンプ</h2>
      <p>始めたことをTweet</p>
      <p>会員はSlackに通知</p>
      <LargeButton
        className={starting ? "bg-gray-400" : "bg-secondary2"}
        onClick={() => setStarting(!starting)}
        label={starting ? "終わる\nor\n休憩" : "始める"}
      />
      {starting && (
        <div>
          <div className="my-4">
            <Timer start={new Date()} />
          </div>
          <div>開始時間：{dateFormatted({ date: new Date() })}</div>
        </div>
      )}
    </div>
  );
};
