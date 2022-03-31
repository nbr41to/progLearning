import { VFC } from "react";

import { TimeStamp } from "../Learning/TimeStamp";

type LearningPageProps = {};

export const LearningPage: VFC<LearningPageProps> = () => {
  return (
    <div>
      <TimeStamp />
    </div>
  );
};
