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

  /* 今日のタスク */
  const todayTasks = useMemo(
    () =>
      tasks.filter((task) =>
        task.current
          ? true
          : dateFormatted({ date: task.createdAt, format: 'YYYY-MM-DD' }) ===
            dateFormatted({ date: new Date(), format: 'YYYY-MM-DD' })
      ),
    [tasks]
  );

  /* 今日以前のタスク */
  const otherTasks = useMemo(
    () =>
      tasks.filter((task) =>
        task.current
          ? false
          : dateFormatted({ date: task.createdAt, format: 'YYYY-MM-DD' }) !==
            dateFormatted({ date: new Date(), format: 'YYYY-MM-DD' })
      ),
    [tasks]
  );

  /* タスクの削除 */
  const handleDeleteTack = async (taskId: string) => {
    await deleteTask(taskId);
  };

  /* タスクの変更 */
  const migrateTask = async (item: Task) => {
    const newTask = {
      ...item,
      current: !item.current,
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
          id="today"
          deleteHandler={handleDeleteTack}
          draggingItem={draggingItem}
          setDraggingItem={setDraggingItem}
          dropHandler={migrateTask}
        />
        <TodoList
          title="今までのTasks"
          items={otherTasks}
          id="other"
          deleteHandler={handleDeleteTack}
          draggingItem={draggingItem}
          setDraggingItem={setDraggingItem}
          dropHandler={migrateTask}
        />
      </div>
    </div>
  );
};
