import type { FC } from 'react';
import type { Task } from 'src/types';

import { RingProgress } from '@mantine/core';
import { useState } from 'react';

import { TodoItem } from './TodoItem';

type Props = {
  title: string;
  items: Task[];
  draggingItem: Task | null;
  setDraggingItem: (item: Task | null) => void;
  deleteHandler: (id: string) => Promise<void>;
  dropHandler?: (item: Task) => Promise<void>;
  percentage?: boolean;
};

export const TodoList: FC<Props> = ({
  title,
  items,
  draggingItem,
  setDraggingItem,
  deleteHandler,
  dropHandler,
  percentage = false,
}) => {
  const [isDroppable, setIsDroppable] = useState(false);
  const percentageValue =
    (items.filter((item) => item.done).length / items.length) * 100;

  /* Itemがdrop-enter-zoneに入ったとき */
  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    if (!dropHandler) return;
    if (e.currentTarget.id === 'drop-enter-zone') {
      setIsDroppable(true);
    }
  };

  /* Itemがdrag zoneから出たとき */
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.currentTarget.id === 'drop-zone') {
      setIsDroppable(false);
    }
  };

  /* Itemがdrag zoneで放されたとき */
  const onDrop = async () => {
    if (!dropHandler) return;
    if (!draggingItem) return;
    await dropHandler(draggingItem);
    setIsDroppable(false);
  };

  return (
    <div className="relative min-h-[260px] w-80 rounded border p-4">
      <h2 className="flex items-center gap-2 font-bold">
        <span>{title}</span>
        {items.length !== 0 && percentage && (
          <RingProgress
            size={40}
            thickness={4}
            sections={[{ value: percentageValue, color: 'blue' }]}
          />
        )}
      </h2>
      <div
        className="mt-2 min-h-[200px] space-y-1"
        id="drop-enter-zone"
        onDragEnter={onDragEnter}
      >
        {items.map((task) => (
          <TodoItem
            key={task.id}
            item={task}
            deleteHandler={deleteHandler}
            setDraggingItem={setDraggingItem}
          />
        ))}
      </div>
      {isDroppable && (
        <div
          id="drop-zone"
          className="absolute top-0 left-0 h-full w-full  bg-slate-600/70 p-4"
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={(e) => {
            e.preventDefault(); // これがないとdropイベントが発火しない
          }}
          onDrop={onDrop}
        >
          <div className="flex h-full items-center justify-center rounded-xl border-4 border-dotted border-white font-bold text-white">
            移動する
          </div>
        </div>
      )}
    </div>
  );
};
