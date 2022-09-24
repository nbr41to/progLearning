import type { BattleObject } from 'src/types';

import { axios } from '../axiosClient';
import { createHeader } from '../createHeader';

export const updateBossObject = (
  uid: string,
  object: Partial<BattleObject>
) => {
  return axios.put<BattleObject, BattleObject>('/api/v1/bossObject', object, {
    ...createHeader(uid),
  });
};
