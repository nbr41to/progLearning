import type { NextPage } from 'next';

import { Button } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import { closeAllModals, openModal } from '@mantine/modals';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

import { PostTask } from '@/components/templates/PostTask';

import { useTasks } from 'src/swr/hooks/useTasks';

const MyCalendar: NextPage = () => {
  const [value, setValue] = useState<Date | null>(null);
  const { tasks } = useTasks();
  const thatDayTasks = useMemo(() => {
    return tasks.filter(
      (task) =>
        task.until &&
        dayjs(task.until).format('YYYY-MM-DD') ===
          dayjs(value).format('YYYY-MM-DD')
    );
  }, [tasks, value]);

  return (
    <div>
      <h1>Calendar</h1>
      <div className="flex gap-8">
        <div>
          <Calendar
            size="xs"
            value={value}
            onChange={setValue}
            locale="ja"
            dayStyle={(day) => {
              const tasksDays = tasks.map((task) => {
                if (task.until) {
                  return dayjs(task.until).format('YYYY-MM-DD');
                }

                return null;
              });
              if (tasksDays.includes(dayjs(day).format('YYYY-MM-DD'))) {
                return {
                  textDecoration: 'underline',
                };
              }

              return {};
            }}
          />
          <Button
            fullWidth
            disabled={!value}
            className="mt-2"
            onClick={() =>
              openModal({
                title: "Post Today's Task",
                children: <PostTask date={value} onClose={closeAllModals} />,
              })
            }
          >
            この日にタスクを追加する
          </Button>
        </div>

        <div>
          {/* ここにその日のスケジュール枠 */}
          <h2>
            {value ? dayjs(value).format('YYYY年MM月DD日') : 'Select a Date.'}
          </h2>
          <div>
            {thatDayTasks.map((task) => (
              <li key={task.id}>{task.content}</li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
