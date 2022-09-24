import type { Sticky } from 'src/types';

import { axios } from '../axiosClient';
import { recordCommit } from '../pixela';

/* 新しいStickyの作成 */
export const createSticky = async (
  sticky: Omit<Sticky, 'id' | 'createdAt' | 'updatedAt'>
) => {
  const response = await axios.post<Sticky, Sticky>(
    '/api/v1/stickies/',
    sticky,
    {
      headers: {
        Authorization: `Bearer ${sticky.userId || ''}`,
      },
    }
  );
  await recordCommit(sticky.userId);

  return response;
};
