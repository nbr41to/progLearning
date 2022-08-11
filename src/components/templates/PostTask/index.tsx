import type { FC } from 'react';
import type { TaskType } from 'src/types';

import {
  ActionIcon,
  Button,
  Input,
  Kbd,
  SegmentedControl,
} from '@mantine/core';
import { useInputState, getHotkeyHandler } from '@mantine/hooks';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaRegCheckCircle } from 'react-icons/fa';

import { createTasks } from 'src/libs/frontend/prisma/task';

type Props = {
  onClose: () => void;
};

export const PostTask: FC<Props> = ({ onClose }) => {
  const [taskContent, setTaskContent] = useInputState('');
  const [taskType, setTaskType] = useInputState('TEMPORARY');
  const [isTyping, setIsTyping] = useState(false); // 変換中かどうかを判定
  const [currentTasks, setCurrentTasks] = useState<
    { id: string; content: string; type: TaskType }[]
  >([]);

  const addTask = async () => {
    if (!taskContent) return;
    if (currentTasks.findIndex((task) => task.content === taskContent) !== -1)
      return;

    setCurrentTasks([
      ...currentTasks,
      {
        id: nanoid(6),
        content: taskContent,
        type: taskType as TaskType,
      },
    ]);
    setTaskContent('');
    setTaskType('TEMPORARY');
  };

  const deleteTask = (id: string) => {
    setCurrentTasks(currentTasks.filter((task) => task.id !== id));
  };

  const handleSubmit = async () => {
    if (currentTasks.length === 0) return;
    const tasks = currentTasks.map((task) => ({
      userId: 'rz9aohJYgqXaIRnVBKzJnomtJol1',
      content: task.content,
      type: task.type,
    }));
    await createTasks(tasks);

    setTaskContent('');
    setTaskType('TEMPORARY');
    onClose();
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="space-y-2">
        {currentTasks.map((task) => (
          <div key={task.id} className="flex justify-between">
            <div className="flex items-center">
              <FaRegCheckCircle className="text-slate-400" />
              <span className="ml-2 text-sm">{task.content}</span>
            </div>
            <ActionIcon
              className="text-slate-600"
              type="button"
              onClick={() => deleteTask(task.id)}
            >
              <AiOutlineCloseCircle size={20} />
            </ActionIcon>
          </div>
        ))}
      </div>

      <Input
        type="text"
        placeholder="What you will todo."
        data-autofocus
        value={taskContent}
        onChange={setTaskContent}
        onCompositionStart={() => setIsTyping(true)}
        onCompositionEnd={() => setIsTyping(false)}
        onKeyDown={getHotkeyHandler([
          [
            'Enter',
            () => {
              if (isTyping) return;
              addTask();
            },
          ],
          ['mod + Enter', handleSubmit],
        ])}
      />
      <SegmentedControl
        data={[
          {
            value: 'TEMPORARY',
            label: 'Temporary',
          },
          { value: 'HABIT', label: 'Habit' },
          { value: 'DAILY', label: 'Daily' },
        ]}
        value={taskType}
        onChange={setTaskType}
        onKeyDown={getHotkeyHandler([
          ['Enter', addTask],
          ['mod + Enter', handleSubmit],
        ])}
      />
      <p className="text-center text-sm">
        {taskType === 'TEMPORARY' && <span>一時的なタスク</span>}
        {taskType === 'HABIT' && <span>習慣化すべきタスク</span>}
        {taskType === 'DAILY' && <span>毎日のタスク</span>}
      </p>
      <Button fullWidth onClick={handleSubmit} className="h-12">
        Submit
        <div className="absolute right-3">
          <Kbd>⌘</Kbd> + <Kbd>Enter</Kbd>
        </div>
      </Button>
    </div>
  );
};
