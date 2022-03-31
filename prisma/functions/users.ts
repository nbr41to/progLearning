import { PrismaClient, Profile, User } from '@prisma/client';
import { where } from 'firebase/firestore';

const prisma = new PrismaClient();

/**
 * User API
 */
/* ユーザ情報を取得 */
export const getUser = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      profile: true,
    },
  });
};
/* ユーザ情報とプロフィールを取得 */
export const getUserWithProfile = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      profile: true,
    },
  });
};
/* ユーザ情報を作成 */
export const createUser = async (params: User) => {
  const existUser = await getUser(params.id);
  if (existUser) {
    /* すでにユーザがある場合 */
    return existUser;
  }
  return await prisma.user.create({
    data: params,
  });
};

/**
 * Profile API
 */

/* ユーザプロフィールを取得 */
export const getProfile = async (userId: string) => {
  return await prisma.profile.findUnique({
    where: {
      userId,
    },
  });
};
/* ユーザプロフィールを作成 */
export const prismaProfileUpsert = async (params: Profile) => {
  return await prisma.profile.upsert({
    where: {
      userId: params.userId,
    },
    update: params,
    create: params,
  });
};
