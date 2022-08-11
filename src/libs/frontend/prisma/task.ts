import type { Task } from 'src/types';

import axios from 'axios';

/* 新しいTaskを複数作成 */
export const createTasks = async (
  tasks: Omit<Task, 'id' | 'done' | 'createdAt' | 'updatedAt'>[]
) => {
  const response = await axios.post<Task, Task>('/api/v1/tasks/', tasks);

  return response;
};

/* ログインユーザのTaskの一覧を取得 */
export const getTasksWhereUserId = async (uid: string) => {
  const response = await axios.get<Task[]>(`/api/v1/tasks/${uid}`);

  return response.data;
};
