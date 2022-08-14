import type {
  User,
  Profile,
  Commitment,
  Sticky,
  Task,
  Plan,
  TaskType,
} from '@prisma/client';

/* User */
type User = User;
type Profile = Profile;

type Plan = Plan;

type Commitment = Commitment;
/* Sticky */
type Sticky = Sticky;

type StickyWithDisplayName = Sticky & {
  user: {
    displayName: string;
  };
};

/* Task */
type Task = Task;

type TaskType = TaskType;

/* Battle */
type BattleObject = {
  id: string;
  name: string;
  life: number;
  attack: number;
};
