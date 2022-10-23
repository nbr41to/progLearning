import type { BattleObject } from 'src/types';

import { axios } from '../axiosClient';

export const updateBossObject = (object: Partial<BattleObject>) => {
  return axios.put<BattleObject, BattleObject>('/api/v1/bossObject', object);
};
