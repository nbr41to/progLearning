import type { Sticky } from 'src/types';

import axios from 'axios';

/* 新しいStickyの作成 */
export const createSticky = async (
  sticky: Omit<Sticky, 'id' | 'createdAt' | 'updatedAt'>
) => {
  const response = await axios.post<Sticky, Sticky>(
    '/api/v1/stickies/',
    sticky
  );

  return response;
};
