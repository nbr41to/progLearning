import type { FC } from 'react';
import type { StickiesWithDisplayName, Task } from 'src/types';

import { Checkbox } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';

import { getStickies } from 'src/libs/frontend/prisma/sticky';
import { getTasksWhereUserId } from 'src/libs/frontend/prisma/task';

export const TopPage: FC = () => {
  const [stickies, setStickies] = useState<StickiesWithDisplayName[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getStickies();
      setStickies(response);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getTasksWhereUserId(
        'rz9aohJYgqXaIRnVBKzJnomtJol1'
      );
      setTasks(response);
    })();
  }, []);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          showNotification({
            title: 'Default notification',
            message: 'Hey there, your code is awesome! 🤥',
            autoClose: 3000,
          });
        }}
      >
        noti
      </button>
      <h2>草</h2>
      <div className="flex gap-1">
        {Array.from({ length: 40 }).map((_, i) => {
          const key = i;

          return (
            <div key={key} className="flex flex-col gap-1">
              <div className="h-4 w-4 rounded border bg-green-300" />
              <div className="h-4 w-4 rounded border" />
              <div className="h-4 w-4 rounded border" />
              <div className="h-4 w-4 rounded border bg-green-300" />
              <div className="h-4 w-4 rounded border bg-green-300" />
              <div className="h-4 w-4 rounded border" />
              <div className="h-4 w-4 rounded border" />
            </div>
          );
        })}
      </div>

      <div>
        {stickies.map((sticky) => (
          <div key={sticky.id}>
            <div>
              {sticky.title}[{sticky.user.displayName}]
            </div>
          </div>
        ))}
      </div>

      <div>
        {tasks.map((task) => (
          <Checkbox
            key={task.id}
            checked={task.done}
            label={task.content}
            disabled
          />
        ))}
      </div>
    </div>
  );
};
