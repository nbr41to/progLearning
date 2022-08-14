import type { FC } from 'react';
import type { Task } from 'src/types';

import { ActionIcon, Checkbox, Loader, Tooltip } from '@mantine/core';
import clsx from 'clsx';
import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { dateFormatted } from 'src/libs/dateFormatted';
import { updateTaskDone } from 'src/libs/frontend/prisma/task';
import { useTasks } from 'src/swr/hooks/useTasks';

type Props = {
  item: Task;
  setDraggingItem: (item: Task | null) => void;
  deleteHandler: (id: string) => Promise<void>;
};

export const TodoItem: FC<Props> = ({
  item,
  setDraggingItem,
  deleteHandler,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { refetch: refetchTasks } = useTasks();

  const toggleTask = async (task: Task) => {
    setIsLoading(true);
    if (!task.done) {
      await updateTaskDone(task.id);
      await refetchTasks();
    }
    setIsLoading(false);
  };

  const handleDelete = async (taskId: string) => {
    await deleteHandler(taskId);
    await refetchTasks();
  };

  /* drag itemを持ったとき */
  const onDragStart = () => {
    setDraggingItem(item);
    setIsDragging(true);
  };

  /* drag itemを放したとき */
  const onDragEnd = () => {
    setDraggingItem(null);
    setIsDragging(false);
  };

  return (
    <Tooltip label={`作成日: ${dateFormatted({ date: item.createdAt })}`}>
      <div
        className={clsx(
          'min-h-7 flex w-full cursor-pointer items-center justify-between rounded bg-slate-100 p-1',
          isDragging && 'opacity-50'
        )}
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <Checkbox
          checked={item.done}
          label={item.content}
          onChange={() => toggleTask(item)}
          disabled={isLoading}
        />
        {isLoading ? (
          <Loader size={18} />
        ) : (
          <ActionIcon
            className="text-slate-600"
            type="button"
            onClick={() => handleDelete(item.id)}
            disabled={isLoading}
          >
            <AiOutlineCloseCircle size={20} />
          </ActionIcon>
        )}
      </div>
    </Tooltip>
  );
};
