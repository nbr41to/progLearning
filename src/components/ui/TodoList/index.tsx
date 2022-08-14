import type { FC } from 'react';
import type { Task } from 'src/types';

import { useState } from 'react';

import { TodoItem } from './TodoItem';

type Props = {
  title: string;
  items: Task[];
  id: string;
  draggingItem: Task | null;
  setDraggingItem: (item: Task | null) => void;
  deleteHandler: (id: string) => Promise<void>;
  dropHandler: (item: Task) => Promise<void>;
};

export const TodoList: FC<Props> = ({
  id,
  title,
  items,
  draggingItem,
  setDraggingItem,
  deleteHandler,
  dropHandler,
}) => {
  const [isDroppable, setIsDroppable] = useState(false);

  /* Itemがdrag zoneに入ったとき */
  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.currentTarget.id === `drop-enter-zone-${id}`) {
      setIsDroppable(true);
    }
  };

  /* Itemがdrag zoneから出たとき */
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.currentTarget.id === 'drop-zone') {
      setIsDroppable(false);
    }
  };

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggingItem) return;
    await dropHandler(draggingItem);
    if (e.currentTarget.id === 'drop-zone') {
      setIsDroppable(false);
    }
  };

  return (
    <div className="relative w-80 rounded border p-4">
      <h2 className="font-bold">{title}</h2>
      <div
        className="mt-2 space-y-1"
        id={`drop-enter-zone-${id}`}
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
