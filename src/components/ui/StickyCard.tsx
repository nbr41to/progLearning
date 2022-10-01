import type { FC } from 'react';
import type { StickyWithDisplayName } from 'src/types';

import { ActionIcon, Badge, Popover } from '@mantine/core';
import { MdDelete } from 'react-icons/md';

import { dateFormatted } from 'src/libs/dateFormatted';
import { deleteSticky } from 'src/libs/frontend/prisma/sticky';
import { useStickies } from 'src/swr/hooks/useStickies';

type Props = {
  sticky: StickyWithDisplayName;
};

export const StickyCard: FC<Props> = ({ sticky }) => {
  const { refetch: refetchStickies } = useStickies();

  const deleteHandler = async (target: StickyWithDisplayName) => {
    await deleteSticky(target.id, target.userId);
    await refetchStickies();
  };

  return (
    <Popover key={sticky.id}>
      <Popover.Target>
        <Badge className="cursor-pointer p-6 text-base hover:brightness-95">
          {sticky.title}
        </Badge>
      </Popover.Target>
      <Popover.Dropdown>
        <div>
          <div className="text-sm">
            <div className="flex items-center justify-between">
              <h5 className="font-bold">[memo]</h5>
              <ActionIcon onClick={() => deleteHandler(sticky)}>
                <MdDelete size={20} />
              </ActionIcon>
            </div>
            <p className="mt-2">{sticky.memo || 'なし'}</p>
          </div>
          <div className="mt-4 flex justify-end text-xs">
            <div className="w-fit">
              <div>Created by {sticky.user.displayName}</div>
              <div>Created at {dateFormatted({ date: sticky.createdAt })}</div>
            </div>
          </div>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};
