import type { FC } from 'react';

import { clsx, HoverCard } from '@mantine/core';

type Props = {
  commitments: {
    date: string;
    quantity: string;
  }[];
};

const commitColorClass = (quantity: number) => {
  if (quantity === 1) return 'bg-green-200';
  if (quantity === 2) return 'bg-green-300';
  if (quantity === 3) return 'bg-green-400';
  if (quantity === 4) return 'bg-green-500';
  if (quantity === 5) return 'bg-green-600';
  if (quantity >= 6) return 'bg-green-700';

  return '';
};

export const GrassCalendar: FC<Props> = ({ commitments }) => {
  return (
    <div className="row-end-7 grid w-fit grid-flow-col grid-rows-[repeat(7,minmax(0,1fr))] gap-1">
      {commitments.map((commitment) => {
        return (
          <HoverCard
            key={commitment.date}
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
                  commitColorClass(Number(commitment.quantity))
                )}
              />
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <div>
                <div>{commitment.date}</div>
                <div>{commitment.quantity} commits</div>
              </div>
            </HoverCard.Dropdown>
          </HoverCard>
        );
      })}
    </div>
  );
};
