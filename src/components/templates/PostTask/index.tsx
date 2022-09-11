import type { FC } from 'react';
import type { TaskType } from 'src/types';

import {
  ActionIcon,
  Button,
  Checkbox,
  Input,
  Kbd,
  SegmentedControl,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useInputState, getHotkeyHandler } from '@mantine/hooks';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaRegCheckCircle } from 'react-icons/fa';

import { dateFormatted } from 'src/libs/dateFormatted';
import { createTasks } from 'src/libs/frontend/prisma/task';
import { useAuth } from 'src/swr/hooks/useAuth';
import { useTasks } from 'src/swr/hooks/useTasks';

type Props = {
  onClose: () => void;
  date?: Date | null;
};

const segmentedControlColors = (taskType: string) => {
  if (taskType === 'TEMPORARY') return 'blue';
  if (taskType === 'HABIT') return 'orange';
  if (taskType === 'DAILY') return 'teal';

  return 'gray';
};

export const PostTask: FC<Props> = ({ onClose, date = new Date() }) => {
  const [taskContent, setTaskContent] = useInputState('');
  const [until, setUntil] = useInputState<Date | null>(date);
  const [taskType, setTaskType] = useInputState('TEMPORARY');
  const [isTyping, setIsTyping] = useState(false); // 変換中かどうかを判定
  const [currentTasks, setCurrentTasks] = useState<
    {
      id: string;
      content: string;
      type: TaskType;
      until: Date | null;
    }[]
  >([]);
  const user = useAuth();
  const { refetch: refetchTasks } = useTasks();

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
        until,
      },
    ]);
    setTaskContent('');
    setTaskType('TEMPORARY');
  };

  const deleteTask = (id: string) => {
    setCurrentTasks(currentTasks.filter((task) => task.id !== id));
  };

  const handleSubmit = async () => {
    if (currentTasks.length === 0 || !user) return;
    const tasks = currentTasks.map((task) => ({
      userId: user.uid,
      content: task.content,
      type: task.type,
      until: task.until,
    }));
    await createTasks(tasks);
    await refetchTasks();

    setTaskContent('');
    setTaskType('TEMPORARY');
    onClose();
  };

  const toggleSometime = () => {
    if (until) {
      setUntil(null);
    } else {
      const today = new Date();
      setUntil(today);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="space-y-2">
        {currentTasks.map((task) => (
          <div
            key={task.id}
            className="flex justify-between rounded bg-slate-100 px-2 py-1"
          >
            <div className="flex items-center gap-2 overflow-x-scroll">
              <FaRegCheckCircle className="text-slate-400" />
              <span className="text-sm">{task.content}</span>
              <span className="ml-auto text-xs">
                {task.until
                  ? dateFormatted({ date: task.until, format: 'YYYY/MM/DD' })
                  : 'いつか'}
              </span>
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

      {/* Taskの日付 */}
      <DatePicker
        label="Will do at date"
        value={until}
        disabled={!until}
        onChange={setUntil}
        inputFormat="YYYY年MM月DD日"
      />
      <div className="flex justify-end gap-2 text-sm">
        <Checkbox checked={!until} onChange={toggleSometime} />
        <span>いつかやる（期限なし）</span>
      </div>
      {/* Taskの内容 */}
      <Input
        type="text"
        placeholder="What you will todo. (Add with enter.)"
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
      {/* Taskの種類 */}
      <SegmentedControl
        color={segmentedControlColors(taskType)}
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
      {/* タスクを登録リストに追加 */}
      <Button fullWidth onClick={handleSubmit} className="h-12" color="teal">
        Add
        <div className="absolute right-3">
          <Kbd>Enter</Kbd>
        </div>
      </Button>
      {/* 登録リストのタスクを登録 */}
      <Button fullWidth onClick={handleSubmit} className="h-12">
        Submit
        <div className="absolute right-3">
          <Kbd>⌘</Kbd> + <Kbd>Enter</Kbd>
        </div>
      </Button>
    </div>
  );
};
