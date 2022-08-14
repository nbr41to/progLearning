import type { Task } from 'src/types';

import axios from 'axios';

/* 新しいTaskを複数作成 */
export const createTasks = async (
  tasks: Omit<Task, 'id' | 'current' | 'done' | 'createdAt' | 'updatedAt'>[]
) => {
  const response = await axios.post<Task, Task>('/api/v1/tasks/', tasks, {
    headers: {
      Authorization: `Bearer ${tasks[0].userId || ''}`,
    },
  });

  return response;
};

/* ログインユーザのTaskの一覧を取得 */
export const getTasksWhereUserId = async (uid: string) => {
  const response = await axios.get<Task[]>(`/api/v1/tasks/${uid}`);

  return response.data;
};

/* 指定したIDのタスクを完了にする */
export const updateTaskDone = async (taskId: string) => {
  const response = await axios.patch<Task>(`/api/v1/tasks/done/${taskId}`);

  return response.data;
};

/* 指定したIDのタスクを削除する */
export const deleteTask = async (taskId: string) => {
  const response = await axios.delete<Task>(`/api/v1/tasks/${taskId}`);

  return response.data;
};

/* 指定したIDのタスクを編集する */
export const updateTask = async (params: Task) => {
  const response = await axios.put<Task>(`/api/v1/tasks/${params.id}`, params);

  return response.data;
};
