import type { FC } from 'react';
import type { Task } from 'src/types';

import { ActionIcon, Loader, Tooltip } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import clsx from 'clsx';
import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { MdDragIndicator } from 'react-icons/md';

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
  const [isDraggable, setIsDraggable] = useState(false);
  const { refetch: refetchTasks } = useTasks();

  /* toggle done */
  const toggleTask = async (task: Task) => {
    setIsLoading(true);
    await updateTaskDone(task.userId, task.id);
    await refetchTasks();
    setIsLoading(false);
  };

  /* 削除 */
  const handleDelete = async (taskId: string) => {
    openConfirmModal({
      title: 'Please confirm delete',
      children: '本当に削除しますか？',
      labels: { confirm: 'はい', cancel: 'やめる' },
      onConfirm: async () => {
        await deleteHandler(taskId);
        await refetchTasks();
      },
    });
  };

  /* itemを持ったとき */
  const onDragStart = () => {
    setIsDraggable(true);
    setDraggingItem(item);
    setIsDragging(true);
  };

  /* itemを放したとき */
  const onDragEnd = () => {
    setDraggingItem(null);
    setIsDragging(false);
    setIsDraggable(false);
  };

  return (
    <Tooltip
      label={`作成日: ${dateFormatted({
        date: item.createdAt,
      })}, 期日: ${item.until ? dateFormatted({ date: item.until }) : 'なし'} `}
    >
      <div
        className={clsx(
          'flex min-h-[36px] w-full items-center justify-between rounded bg-slate-100 p-1',
          isDragging && 'opacity-50'
        )}
        draggable={isDraggable}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="flex items-center">
          <ActionIcon
            onMouseOver={() => setIsDraggable(true)}
            onMouseLeave={() => setIsDraggable(false)}
          >
            <MdDragIndicator
              className="cursor-pointer text-slate-500"
              size={18}
            />
          </ActionIcon>
          <input
            className="cursor-pointer"
            type="checkbox"
            checked={item.done}
            onChange={() => toggleTask(item)}
            disabled={isLoading}
          />
          <span className="ml-2 break-all">{item.content}</span>
        </div>
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
