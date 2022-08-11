import type { User, Sticky, Task, Plan, TaskType } from '@prisma/client';

/* User */
type User = User;

type Plan = Plan;

/* Sticky */
type Sticky = Sticky;

type StickiesWithDisplayName = Sticky & {
  user: {
    displayName: string;
  };
};

/* Task */
type Task = Task;

type TaskType = TaskType;
