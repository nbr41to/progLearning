import { useEffect, useState, VFC } from "react";
import { ConvertSecondsToTime } from "src/lib/utils/getTime";

type Props = {
  start: Date; // 開始時刻
};

/* 経過時間を表示してくれる */
export const Timer: VFC<Props> = ({ start = new Date() }) => {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date().getTime() - start.getTime();

      setTime(ConvertSecondsToTime(diff));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time, start]);

  return (
    <div className="inline-block rounded-md border py-8 px-12 font-mono text-6xl">
      {time}
    </div>
  );
};
