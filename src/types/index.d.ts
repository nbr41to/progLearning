import type {
  User,
  Commitment,
  Sticky,
  Task,
  Plan,
  TaskType,
} from '@prisma/client';

/* User */
type User = User;

type Plan = Plan;

type Commitment = Commitment;
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
