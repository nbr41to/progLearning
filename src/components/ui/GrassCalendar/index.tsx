import type { FC } from 'react';
import type { Sticky, Task } from 'src/types';

import { clsx, HoverCard } from '@mantine/core';

type Props = {
  commitments: {
    dayLabel: string;
    contents: (Sticky | Task)[];
  }[];
};

const commitColorClass = (commit: number) => {
  if (commit === 1) return 'bg-green-200';
  if (commit === 2) return 'bg-green-300';
  if (commit === 3) return 'bg-green-400';
  if (commit === 4) return 'bg-green-500';
  if (commit === 5) return 'bg-green-600';
  if (commit >= 6) return 'bg-green-700';

  return '';
};

export const GrassCalendar: FC<Props> = ({ commitments }) => {
  return (
    <div className="row-end-7 grid w-fit grid-flow-col grid-rows-[repeat(7,minmax(0,1fr))] gap-1">
      {commitments.map((commitment) => {
        return (
          <HoverCard
            key={commitment.dayLabel}
            width={280}
            shadow="md"
            position="top"
            radius="md"
            offset={12}
          >
            <HoverCard.Target>
              <div
                className={clsx(
                  'h-4 w-4 cursor-pointer rounded border border-slate-300',
                  commitColorClass(commitment.contents.length)
                )}
              />
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <div>
                <div>{commitment.dayLabel}</div>
                {commitment.contents.map((content) => {
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
  );
};
