import type {
  User,
  Profile,
  Commitment,
  Sticky,
  Task,
  Plan,
  TaskType,
  BattleObject,
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
type BattleObject = BattleObject;
