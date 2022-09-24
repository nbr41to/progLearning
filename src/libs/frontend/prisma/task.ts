import type { Task } from 'src/types';

import { axios } from '../axiosClient';
import { incrementGraph } from '../pixela';

/* 新しいTaskを複数作成 */
export const createTasks = async (
  tasks: Omit<Task, 'id' | 'done' | 'doneAt' | 'createdAt' | 'updatedAt'>[]
) => {
  const response = await axios.post<Task, Task>('/api/v1/tasks/', tasks, {
    headers: {
      Authorization: `Bearer ${tasks[0].userId || ''}`,
    },
  });

  return response;
};

/* 指定したIDのタスクを編集する */
export const updateTask = async (params: Task) => {
  const response = await axios.put<Task>(`/api/v1/tasks/${params.id}`, params, {
    headers: {
      Authorization: `Bearer ${params.userId || ''}`,
    },
  });

  return response.data;
};

/* 指定したIDのタスクを完了にする */
export const updateTaskDone = async (uid: string, taskId: string) => {
  const response = await axios.patch<Task>(`/api/v1/tasks/done/${taskId}`);
  await incrementGraph(uid);

  return response.data;
};

/* 指定したIDのタスクを削除する */
export const deleteTask = async (taskId: string) => {
  const response = await axios.delete<Task>(`/api/v1/tasks/${taskId}`);

  return response.data;
};
