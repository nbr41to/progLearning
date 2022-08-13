import type { FC } from 'react';

import { Badge } from '@mantine/core';

import { useUser } from 'src/swr/hooks/useUser';

export const MyPage: FC = () => {
  const { user } = useUser();

  return (
    <div className="space-y-2">
      <Badge
        size="lg"
        variant="gradient"
        gradient={{ from: 'teal', to: 'blue', deg: 60 }}
      >
        お名前
      </Badge>
      <div>{user?.displayName}</div>
      <Badge
        size="lg"
        variant="gradient"
        gradient={{ from: 'teal', to: 'blue', deg: 60 }}
      >
        自己紹介文
      </Badge>
      <div>まだないよ</div>
      <Badge
        size="lg"
        variant="gradient"
        gradient={{ from: 'teal', to: 'blue', deg: 60 }}
      >
        ステータス
      </Badge>
      <div>
        <div>LIFE: 100</div>
        <div>ATTACK: 15</div>
      </div>
    </div>
  );
};
