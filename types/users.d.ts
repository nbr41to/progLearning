import { Profile, User } from '@prisma/client';

type User = User;

type UserWithProfile = User & {
  profile: Profile;
};

type Profile = Profile;
