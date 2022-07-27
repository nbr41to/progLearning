import clsx from 'clsx';
import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { characters, colors } from './const';
import { Panel } from './Panel';
import { SelectAnswer } from './SelectAnswer';

export type PanelContents = {
  character: typeof characters[number];
  color: typeof colors[number];
};

type Props = {
  isAnswering: boolean;
  finishHandler: () => void;
};

export const MemoryPanels: FC<Props> = ({ isAnswering, finishHandler }) => {
  const [viewPanels, setViewPanels] = useState<PanelContents[][]>([]);
  const [isMoving, setIsMoving] = useState(false);

  const answerPlace = useMemo(() => {
    return Math.floor(Math.random() * 3);
  }, [viewPanels, isAnswering]);

  const questionState = useMemo(() => {
    if (viewPanels.length !== 4) return;
    const types = ['character', 'color'] as const;
    const type = types[Math.floor(Math.random() * 2)];
    if (type === 'character') {
      return {
        type,
        correct: viewPanels[2][answerPlace].character,
      };
    }

    return {
      type,
      correct: viewPanels[2][answerPlace].color,
    };
  }, [viewPanels, isAnswering]);

  useEffect(() => {
    const panels: PanelContents[][] = [];
    for (let i = 0; i < 4; i++) {
      const row: PanelContents[] = [];
      for (let j = 0; j < 3; j++) {
        row.push({
          character: characters[Math.floor(Math.random() * characters.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      panels.push(row);
    }
    setViewPanels(panels);
  }, []);

  const nextHandler = () => {
    setIsMoving(true);
    setTimeout(() => {
      const newPanels = [...viewPanels];
      newPanels.pop();
      const row: PanelContents[] = [];
      for (let j = 0; j < 3; j++) {
        row.push({
          character: characters[Math.floor(Math.random() * characters.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      newPanels.unshift(row);
      setViewPanels(newPanels);
      setIsMoving(false);
    }, 1000);
    finishHandler();
  };

  return (
    <div className="relative">
      <div className="flex h-[360px] w-[360px] flex-col justify-end overflow-hidden">
        {viewPanels.map((row, i) => (
          <div className={clsx('flex', isMoving && 'panel-down')} key={i}>
            {row.map((panel, j) => (
              <Panel key={j} panel={panel} />
            ))}
          </div>
        ))}
      </div>
      <div className="absolute top-[120px] h-[240px] w-[360px] border bg-gray-800">
        <div className="flex">
          <div className="h-[120px] w-[120px] border" />
          <div className="h-[120px] w-[120px] border" />
          <div className="h-[120px] w-[120px] border" />
        </div>
        <div className="flex">
          <div className="h-[120px] w-[120px] border" />
          <div className="h-[120px] w-[120px] border" />
          <div className="h-[120px] w-[120px] border" />
        </div>
      </div>
      <div
        className={clsx(
          'absolute top-[120px] flex w-full',
          answerPlace === 0 && 'justify-start',
          answerPlace === 1 && 'justify-center',
          answerPlace === 2 && 'justify-end'
        )}
      >
        {isAnswering && (
          <div className="m-[15px] flex h-[90px] w-[90px] items-center justify-center rounded-full bg-teal-600 text-lg font-bold text-white">
            ここは？
          </div>
        )}
      </div>

      {isAnswering && questionState && (
        <SelectAnswer answer={questionState} finishHandler={nextHandler} />
      )}
    </div>
  );
};
