import type { StickyWithDisplayName, Sticky } from 'src/types';

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

/* Stickyの一覧を取得 */
export const getStickies = async () => {
  const response = await axios.get<StickyWithDisplayName[]>(
    '/api/v1/stickies/'
  );

  return response.data;
};
