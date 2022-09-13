import type { FC } from 'react';
import type { Task } from 'src/types';

import { useState, useMemo } from 'react';

import { TodoList } from '@/components/ui/TodoList';

import { dateFormatted } from 'src/libs/dateFormatted';
import { deleteTask, updateTask } from 'src/libs/frontend/prisma/task';
import { useTasks } from 'src/swr/hooks/useTasks';

export const TasksBoard: FC = () => {
  const [draggingItem, setDraggingItem] = useState<Task | null>(null);
  const { tasks, refetch: refetchTasks } = useTasks();

  /* 無期限タスク */
  const somedayTasks = useMemo(
    () => tasks.filter((task) => !task.until),
    [tasks]
  );
  /* 今日のタスク */
  const todayTasks = useMemo(
    () =>
      tasks.filter(
        (task) =>
          task.until &&
          dateFormatted({ date: task.until, format: 'YYYY-MM-DD' }) ===
            dateFormatted({ date: new Date(), format: 'YYYY-MM-DD' })
      ),
    [tasks]
  );

  /* 今日以前の未完了タスク */
  const beforeTodayTasks = useMemo(
    () =>
      tasks.filter(
        (task) =>
          task.until &&
          dateFormatted({ date: task.until, format: 'YYYY-MM-DD' }) <
            dateFormatted({ date: new Date(), format: 'YYYY-MM-DD' }) &&
          !task.done
      ),
    [tasks]
  );

  /* タスクの削除 */
  const handleDeleteTack = async (taskId: string) => {
    await deleteTask(taskId);
  };

  /* drop handler */
  const dropTodayTasks = async (item: Task) => {
    const newTask = {
      ...item,
      until: new Date(),
    };
    await updateTask(newTask);
    await refetchTasks();
  };

  const dropSomedayTasks = async (item: Task) => {
    if (!item.until) return;
    const newTask = {
      ...item,
      until: null,
    };
    await updateTask(newTask);
    await refetchTasks();
  };

  return (
    <div>
      <div className="flex gap-4">
        <TodoList
          title="今日のTasks"
          items={todayTasks}
          deleteHandler={handleDeleteTack}
          draggingItem={draggingItem}
          setDraggingItem={setDraggingItem}
          dropHandler={dropTodayTasks}
          percentage
        />
        <TodoList
          title="過去のTasks"
          items={beforeTodayTasks}
          deleteHandler={handleDeleteTack}
          draggingItem={draggingItem}
          setDraggingItem={setDraggingItem}
        />
        <TodoList
          title="いつかやる"
          items={somedayTasks}
          deleteHandler={handleDeleteTack}
          draggingItem={draggingItem}
          setDraggingItem={setDraggingItem}
          dropHandler={dropSomedayTasks}
        />
      </div>
    </div>
  );
};
