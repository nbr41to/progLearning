import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * TimeStamp
 */

/* 開始 */
export const prismaTimeStampCreate = async (userId: string) => {
  return await prisma.timeStamp.create({
    data: {
      userId,
      startedAt: new Date(),
    },
  });
};

/* 現在の状態を取得 */
export const prismaUserStatusTimeStampFind = async (userId: string) => {
  return await prisma.status.findUnique({
    where: {
      userId,
    },
    select: {
      currentTimeStamp: true,
    },
    // include: {
    //   currentTimeStamp: true,
    // },
  });
};

/* 終了 */
export const prismaTimeStampUpdate = async (timeStampId: string) => {
  const timeStamp = await prisma.timeStamp.findUnique({
    where: {
      id: timeStampId,
    },
  });
  if (!timeStamp || !!timeStamp.finishedAt) {
    return null;
  }
  return await prisma.timeStamp.update({
    where: {
      id: timeStamp.id,
    },
    data: {
      finishedAt: new Date(),
    },
  });
};
